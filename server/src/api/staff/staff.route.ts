import { createStaff, getStaffs, login, logout, updateStaff } from "./staff.controller";
import { limitUsers } from "../../middlewares/authorize";
import { Role } from "./staff.types";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";
import authenticate from "../../middlewares/authenticate";

const router = Router();

router.post('/login', asynchronousHandler(login));

router.use(authenticate);

router.get('/', limitUsers(Role.ADMIN), asynchronousHandler(getStaffs));

/**
 * username: string
 * email: string
 * contact: string
 * password: string (optional)
 */
router.patch('/', asynchronousHandler(updateStaff));

router.post('/logout', asynchronousHandler(logout));

router.post('/register', limitUsers(Role.ADMIN), asynchronousHandler(createStaff));

export default router;