import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";
import { getInvoices } from "./invoice.controller";

const router = Router();

router.get('/', asynchronousHandler(getInvoices));

export default router;