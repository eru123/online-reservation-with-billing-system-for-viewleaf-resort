import { BodyRequest, RequestHandler } from 'express';
import {
    AddShift,
    // CombinedInvoiceAccommodation,
    CreateAccommodation,
    Fee,
    UpdateAccommodation,
    UpdateShiftFees
} from './accommodation.types';
import { CheckData } from '../../utilities/checkData';
import { Conflict, NotFound, UnprocessableEntity } from '../../utilities/errors';
import accommodationModel from './accommodation.model';
// import reservationModel from '../reservation/reservation.model';
// import { 
//   ReservationDocument, 
//   ReservationStatus 
// } from '../reservation/reservation.types';
// import invoiceModel from '../invoice/invoice.model';
// import { InvoiceDocument } from '../invoice/invoice.types';

export const getAccommodations: RequestHandler = async (_req, _res) => {
    // Get all reservations where status are: cancelled, declined, refunded, checked out
    // const reservations = await reservationModel
    //     .find({
    //         status: {
    //             $in: [
    //                 ReservationStatus.CANCELLED,
    //                 ReservationStatus.DECLINED,
    //                 ReservationStatus.REFUNDED,
    //                 ReservationStatus.CHECKED_OUT
    //             ]
    //         }
    //     })
    //     .exec();

    // Get only the _id from the reservations
    // const reservationIds: ReservationDocument['_id'] = reservations.map((reservation) => reservation._id);

    // Get all the accommodations from each of the reservations' invoices
    // const invoices: InvoiceDocument[] = await invoiceModel.find({ reservation: { $in: reservationIds } }).exec();

    // Get all the accmmodations from invoices
    // const invoiceAccommodations = invoices.map((invoice) => invoice.accommodation);

    // Filter similar accommodations

    // Merge all remaining accommodations

    // Check the availability of the shifts
    // If day or night is occupied, whole day is not available
    // If whole day is occupied, day nor night is not available

    // Return only the available shifts
};

export const createAccommodation: RequestHandler = async (req: BodyRequest<CreateAccommodation>, res) => {
    const { description, pax, image, type } = req.body;
    let { fees } = req.body;

    const checker = new CheckData();
    checker.checkType(description, 'string', 'description');
    checker.checkType(pax, 'string', 'pax');
    checker.checkType(image, 'string', 'image');
    checker.checkType(type, 'string', 'type');

    if (fees.length < 0) checker.addError('fees', 'fees cannot be empty');

    for (let i = 0; i < fees.length; i++) {
        const { shift, rate, adultFee, kidsFee } = fees[i];

        checker.checkType(shift, 'string', `fees[${i}].shift`);
        checker.checkType(rate, 'number', `fees[${i}].rate`);
        checker.checkType(adultFee, 'number', `fees[${i}].adultFee`);
        checker.checkType(kidsFee, 'number', `fees[${i}].kidsFee`);
    }

    if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

    // Get unique shifts in fees
    fees = fees.filter((fee, idx, originalFees) => {
        // Find any fee with similar shift
        const foundFee = originalFees.findIndex((f) => f.shift === fee.shift);

        // If index of found fee is less than the current index
        //     this means that the fee has already been added
        //     therefore, we should not include it
        if (foundFee < idx) return false;

        // Otherwise, the found fee is current fee
        return true;
    });

    // Format the fees in correct format
    const formattedFees: Fee[] = fees.map((fee) => ({
        shift: fee.shift,
        rate: fee.rate,
        guestFee: {
            adult: fee.adultFee,
            kids: fee.kidsFee
        }
    }));

    // Save accommodation
    await accommodationModel.create({
        description,
        pax,
        image,
        type,
        fees: formattedFees
    });

    res.sendStatus(201);
};

export const addShift: RequestHandler = async (req: BodyRequest<AddShift>, res) => {
    const { accommodationId, shift, rate, adultFee, kidsFee } = req.body;

    const checker = new CheckData();
    checker.checkType(accommodationId, 'string', 'accommodationId');
    checker.checkType(shift, 'string', 'shift');
    checker.checkType(rate, 'number', 'rate');
    checker.checkType(adultFee, 'number', 'adultFee');
    checker.checkType(kidsFee, 'number', 'kidsFee');

    if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

    const accommodation = await accommodationModel.findOne({ accommodationId }).exec();
    if (!accommodation) throw new NotFound('Accommodation');

    // Check if shift already exists
    const shiftExists = accommodation.fees.find((fee) => fee.shift === shift);
    if (shiftExists) throw new Conflict('Shift');

    // Add shift
    accommodation.fees.push({
        shift,
        rate,
        guestFee: {
            adult: adultFee,
            kids: kidsFee
        }
    });

    // Save changes
    await accommodation.save();

    res.sendStatus(201);
};

export const updateAccommodationDetails: RequestHandler = async (req: BodyRequest<UpdateAccommodation>, res) => {
    const { accommodationId, description, pax, image, type } = req.body;

    const checker = new CheckData();
    checker.checkType(accommodationId, 'string', 'accommodationId');

    if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

    const accommodation = await accommodationModel.findOne({ accommodationId }).exec();
    if (!accommodation) throw new NotFound('Accommodation');

    if (description) {
        checker.checkType(description, 'string', 'description');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        accommodation.description = description;
    }

    if (pax) {
        checker.checkType(pax, 'string', 'pax');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        accommodation.pax = pax;
    }

    if (image) {
        checker.checkType(image, 'string', 'image');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        accommodation.image = image;
    }

    if (type) {
        checker.checkType(type, 'string', 'type');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        accommodation.type = type;
    }

    // Save changes
    await accommodation.save();

    res.sendStatus(204);
};

export const updateShiftFees: RequestHandler = async (req: BodyRequest<UpdateShiftFees>, res) => {
    const { accommodationId, shift, rate, adultFee, kidsFee } = req.body;

    const checker = new CheckData();
    checker.checkType(accommodationId, 'string', 'accommodationId');
    checker.checkType(shift, 'string', 'shift');

    if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

    const accommodation = await accommodationModel.findOne({ accommodationId }).exec();
    if (!accommodation) throw new NotFound('Accommodation');

    // Check if shift already exists
    const shiftExists = accommodation.fees.find((fee) => fee.shift === shift);
    if (!shiftExists) throw new NotFound('Shift');

    // Edit shift
    if (rate) {
        checker.checkType(rate, 'number', 'rate');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        shiftExists.rate = rate;
    }

    if (adultFee) {
        checker.checkType(adultFee, 'number', 'adultFee');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        shiftExists.guestFee.adult = adultFee;
    }

    if (kidsFee) {
        checker.checkType(kidsFee, 'number', 'kidsFee');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        shiftExists.guestFee.kids = kidsFee;
    }

    // Save changes
    await accommodation.save();

    res.sendStatus(204);
};
