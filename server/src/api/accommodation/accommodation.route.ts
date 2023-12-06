import {
    addShift, 
    createAccommodation, 
    getAccommodations, 
    updateAccommodationDetails, 
    updateInclusions, 
    updateShiftFees 
} from './accommodation.controller';
import { limitUsers } from '../../middlewares/authorize';
import { Role } from '../staff/staff.types';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';
import authenticate from '../../middlewares/authenticate';

const router = Router();

/**
 * accommodationId: string (optional)
 * schedule: number (optional)
 * shift: string (optional)
 * all: boolean (optional)
 */
router.get('/', asynchronousHandler(getAccommodations));

router.use(authenticate, limitUsers(Role.ADMIN));

/**
 * description: string
 * pax: string
 * image: string
 * type: string
 * fees [
 *     shift: string
 *     rate: number
 *     adultFee: number
 *     kidsFee: number
 * ]
 */
router.post('/', asynchronousHandler(createAccommodation));

/**
 * accommodationId: string
 * description?: string
 * pax?: string
 * image?: string
 * type?: string
 * availability?: string
 */
router.patch('/', asynchronousHandler(updateAccommodationDetails));

/**
 * accommodationId
 * shift: string
 * rate: number
 * adultFee: number
 * kidsFee: number
 */
router.post('/shifts', asynchronousHandler(addShift));

/**
 * accommodationId
 * shift: string
 * rate?: number
 * adultFee?: number
 * kidsFee?: number
 */
router.patch('/shifts', asynchronousHandler(updateShiftFees));

router.patch('/inclusions', asynchronousHandler(updateInclusions));

export default router;
