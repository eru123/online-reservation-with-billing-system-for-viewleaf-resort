import {
    addShift, 
    createAccommodation, 
    updateAccommodationDetails, 
    updateShiftFees 
} from './accommodation.controller';
import { limitUsers } from '../../middlewares/authorize';
import { Role } from '../staff/staff.types';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';
import authenticate from '../../middlewares/authenticate';

const router = Router();

router.use(authenticate, limitUsers(Role.ADMIN));

/**
 * description
 * pax
 * image
 * type
 * fees [
 *     shift
 *     rate
 *     adultFee
 *     kidsFee
 * ]  
 */
router.post('/', asynchronousHandler(createAccommodation));

/**
 * accommodationId
 * description (optional)
 * pax (optional)
 * image (optional)
 * type (optional)
 */
router.patch('/', asynchronousHandler(updateAccommodationDetails));

/**
 * accommodationId
 * shift
 * rate
 * adultFee
 * kidsFee
 */
router.post('/shifts', asynchronousHandler(addShift));

/**
 * accommodationId
 * shift
 * rate (optional)
 * adultFee (optional)
 * kidsFee (optional)
 */
router.patch('/shifts', asynchronousHandler(updateShiftFees));

export default router;
