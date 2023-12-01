import { QueryRequest, RequestHandler } from "express";
import { GetInvoices } from "./invoice.types";
import { UnprocessableEntity } from "../../utilities/errors";
import invoiceModel from "./invoice.model";
import { CheckData } from "../../utilities/checkData";

export const getInvoices: RequestHandler = async (req: QueryRequest<GetInvoices>, res) => {
    const { reservationId, status } = req.query;

    const checker = new CheckData();
    const invoiceQuery: Record<string, unknown> = {};

    if (reservationId) {
        checker.checkType(reservationId, 'string', 'reservationId');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        invoiceQuery.reservation = reservationId;
    }

    if (status) {
        checker.checkType(status, 'string', 'status');
        if (checker.size() > 0) throw new UnprocessableEntity(checker.errors);

        invoiceQuery.status = status;
    }

    const invoices = await invoiceModel.find(invoiceQuery).exec();

    res.json(invoices);
}