import { AccommodationAvailbility, AccommodationDocument, AccommodationType, Inclusion, Shift } from './accommodation.types';
import { id } from '../../utilities/ids';
import { Schema, model } from 'mongoose';

const accommodationSchema = new Schema(
    {
        accommodationId: {
            type: String,
            unique: true,
            default: id
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        pax: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        fees: [
            {
                shift: {
                    type: String,
                    enum: {
                        values: Object.values(Shift),
                        message: '{VALUE} is not supported'
                    },
                    required: true
                },
                rate: {
                    type: String,
                    required: true
                },
                guestFee: {
                    type: {
                        adult: {
                            type: Number,
                            required: true
                        },
                        kids: {
                            type: Number,
                            required: true
                        }
                    },
                    required: true
                }
            }
        ],
        type: {
            type: String,
            enum: {
                values: Object.values(AccommodationType),
                message: '{VALUE} is not supported'
            },
            required: true
        },
        availability: {
            type: String,
            enum: {
                values: Object.values(AccommodationAvailbility),
                message: '{VALUE} is not supported'
            },
            default: AccommodationAvailbility.AVAILABLE,    
        },
        inclusions: [
            {
                accommodationId: {
                    type: String,
                    // required: true
                },
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(_doc, ret) {
                const { _id, ...rest } = ret;
                return rest;
            }
        }
    }
);

// Add a pre hook to set the accommodationId for inclusions
accommodationSchema.pre('save', async function (next) {
  const accommodationId = this.get('accommodationId'); // Get the accommodationId

  if (accommodationId) {
      // If accommodationId is set, update the inclusions
      this.set('inclusions', this.inclusions.map((inclusion: Inclusion) => ({
          ...inclusion,
          accommodationId
      })));
  }

  next();
});

export default model<AccommodationDocument>('Accommodation', accommodationSchema);
