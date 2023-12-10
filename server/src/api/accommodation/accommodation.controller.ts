import {
    AccommodationAvailbility,
    AccommodationDocument,
    AccommodationShift,
    AddShift,
    CreateAccommodation,
    Fee,
    GetAccommodations,
    Shift,
    UpdateAccommodation,
    UpdateInclusions,
    UpdateShiftFees
} from './accommodation.types';
import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { Conflict, NotFound, UnprocessableEntity } from '../../utilities/errors';
import { InvoiceDocument } from '../invoice/invoice.types';
import { ReservationDocument, ReservationStatus } from '../reservation/reservation.types';
import AccommodationModel from './accommodation.model';
import InvoiceModel from '../invoice/invoice.model';
import ReservationModel from '../reservation/reservation.model';

const getAvailableAccommodations = async (checker: CheckData, schedule: unknown): Promise<AccommodationDocument[]> => {
    const reservationQuery: Record<string, unknown> = {
        status: {
            $nin: [
                ReservationStatus.CANCELLED,
                ReservationStatus.DECLINED,
                ReservationStatus.REFUNDED,
                ReservationStatus.CHECKED_OUT
            ]
        }
    };

    if (schedule) {
        checker.checkType(schedule, 'string', 'schedule');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        // Get all reservations the given schedule's 00:00:00 to 23:59:59 time includes the reservation's schedule
        reservationQuery.schedule = {
            $gte: new Date(Number(schedule)).setHours(0, 0, 0, 0),
            $lte: new Date(Number(schedule)).setHours(23, 59, 59, 999)
        };
    }

    // Get all reservations where status are not: cancelled, declined, refunded, checked out
    const reservations = await ReservationModel.find(reservationQuery).exec();

    // Get only the _id from the reservations
    const reservationIds: ReservationDocument['_id'] = reservations.map((reservation) => reservation._id);

    // Get all the accommodations from each of the reservations' invoices
    const invoices: InvoiceDocument[] = await InvoiceModel.find({ reservation: { $in: reservationIds } }).exec();

    // Get all the accmmodations from invoices
    const invoiceAccommodations: AccommodationShift[] = invoices
        .map(({ accommodationId, shift }) => {
            const shifts = [{ accommodationId, shift }];

            // if (shift == Shift.WHOLE)
            //     shifts.push({ accommodationId, shift: Shift.DAY }, { accommodationId, shift: Shift.NIGHT });
            // else shifts.push({ accommodationId, shift: Shift.WHOLE });

            return shifts;
        })
        .flat();

    // Get all available accommodations
    let accommodations: AccommodationDocument[] = await AccommodationModel.find({
        availability: AccommodationAvailbility.AVAILABLE
    }).exec();

    accommodations = accommodations
        // Filter out accommodations where shift is in invoiceAccommodations
        .map((accommodation) => {
            accommodation.fees = accommodation.fees.filter(
                (fee) =>
                    !invoiceAccommodations.some(
                        ({ accommodationId, shift }) =>
                            accommodationId === accommodation.accommodationId && shift === fee.shift
                    )
            );

            return accommodation;
        })
        // Filter out all accommodations where fees are empty
        .filter(({ fees }) => fees.length > 0);

    return accommodations;
}

export const getAccommodations: RequestHandler = async (req: QueryRequest<GetAccommodations>, res) => {
    const { accommodationId, schedule, shift, all } = req.query;
    const checker = new CheckData();
 
    let accommodations: AccommodationDocument[];

    if (Boolean(all) === true) {
        accommodations = await AccommodationModel.find().exec();
    }
    else {
        accommodations = await getAvailableAccommodations(checker, schedule); 
    }

    if (shift) {
        checker.checkType(shift, 'string', 'shift');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        // Filter out all accommodations where shift is not equal to shift
        // accommodations = accommodations.filter((accommodation) =>
        //     accommodation.fees.some((fee) => fee.shift === shift)
        // );
    }

    if (accommodationId) {
        checker.checkType(accommodationId, 'string', 'accommodationId');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        // Get the accommodation with the given accommodationId
        accommodations = accommodations.filter((accommodation) => accommodation.accommodationId === accommodationId);
    }

    res.json(accommodations);
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
    await AccommodationModel.create({
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

    const accommodation = await AccommodationModel.findOne({ accommodationId }).exec();
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
    const { accommodationId, description, pax, image, type, availability } = req.body;

    const checker = new CheckData();
    checker.checkType(accommodationId, 'string', 'accommodationId');

    if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

    const accommodation = await AccommodationModel.findOne({ accommodationId }).exec();
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

    if (availability) {
        checker.checkType(availability, 'string', 'availability');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        accommodation.availability = availability;
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

    const accommodation = await AccommodationModel.findOne({ accommodationId }).exec();
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

export const updateInclusions: RequestHandler = async (req: BodyRequest<UpdateInclusions>, res) => {
    const { accommodationId, inclusions } = req.body;

    const checker = new CheckData();
    checker.checkType(accommodationId, 'string', 'accommodationId');
    checker.checkArray(inclusions, 0, 'inclusions');

    if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

    for (let i = 0; i < inclusions.length; i++) {
        const { name, price } = inclusions[i];

        checker.checkType(name, 'string', `inclusions.${i}.name`);
        checker.checkType(price, 'number', `inclusions.${i}.price`);

        if (checker.size() > 0) continue;
    }

    if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

    const accommodation = await AccommodationModel.findOne({ accommodationId }).exec();
    if (!accommodation) throw new NotFound('Accommodation');

    const uniqueInclusions = inclusions.filter(
        (inclusion, idx, originalInclusions) => 
            originalInclusions.findIndex((i) => i.name === inclusion.name) === idx
    );

    accommodation.inclusions = uniqueInclusions.map((inclusion) => ({ ...inclusion, accommodationId }));

    // Save changes
    await accommodation.save();

    res.sendStatus(204);
};
