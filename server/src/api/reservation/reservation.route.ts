import { addExtras, addFeedback, createReservation, getReservations, payReservation, rescheduleReservation, updateStatus } from "./reservation.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";
// import { limitUsers } from "../../middlewares/authorize";
// import { Role } from "../staff/staff.types";

const router = Router();

/**
 * reservationId: string (optional)
 * status: string (optional)
 */
router.get('/', asynchronousHandler(getReservations));

/**
 * name: string
 * phone: string
 * email: string
 * schedule: number
 * accommodations: [{
 *     accommodationId: string
 *     shift: Shift
 *     guests: {
 *         adult: number
 *         kids: number
 *         senior: number
 *         pwd: number
 *     }
 *     inclusions: [{name: string, quantity: number }] (optional)
 * }]
 */
router.post('/', asynchronousHandler(createReservation));

/**
 * reservationId: string
 * rating: number
 * review: string (optional)
 */
router.post('/feedbacks', asynchronousHandler(addFeedback));

/**
 * reservationId: string
 * status: string
 * note: string
 */
router.patch('/', asynchronousHandler(updateStatus));

/**
 * reservationId: string
 * receipt: string
 */
router.patch('/pay', asynchronousHandler(payReservation));

/**
 * reservationId: string
 * accommodations: [{
 *     accommodationId: string
 *     shift: Shift
 *     guests: {
 *         adult: number
 *         kids: number
 *         senior: number
 *         pwd: number
 *     } (optional)
 *     inclusions: [{name: string, quantity: number }] (optional)
 * }]
 */
router.patch('/extras', asynchronousHandler(addExtras));

/**
 * reservationId: string
 * schedule: number
 */
router.patch('/reschedule', asynchronousHandler(rescheduleReservation));

export default router;