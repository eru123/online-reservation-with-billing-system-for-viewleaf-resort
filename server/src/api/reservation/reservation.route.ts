import { 
  // addExtras, 
  createReservation, 
  getReservations,
  payReservation,
  updateStatus
} from "./reservation.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";

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
// router.patch('/', asynchronousHandler(addExtras));

router.post('/pay', asynchronousHandler(payReservation));
router.patch('/update', asynchronousHandler(updateStatus))

export default router;