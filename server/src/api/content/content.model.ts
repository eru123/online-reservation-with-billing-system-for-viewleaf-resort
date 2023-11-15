import { Schema, model } from 'mongoose';
import { ContentDocument } from './content.types';

const ContentSchema = new Schema<ContentDocument>(
  {
    about: {
      type: String,
      required: true,
      default: 'Default About Value', // Set your default value here
    },
    phone: {
      type: Number,
      required: true,
      default: 1234567890, // Set your default value here
    },
    email: {
      type: String,
      required: true,
      default: 'default@example.com', // Set your default value here
    },
    address: {
      type: String,
      required: true,
      default: 'Default Address Value', // Set your default value here
    },
    policy: {
      type: String,
      required: true,
      default: 'Default Policy Value', // Set your default value here
    },
    payment: {
      type: String,
      required: true,
      default: 'Default Payment Value', // Set your default value here
    },
    promo: {
      type: String,
      required: true,
      default: 'Default Promo Value', // Set your default value here
    },
  },
  { timestamps: true }
);

export default model<ContentDocument>('Content', ContentSchema);
