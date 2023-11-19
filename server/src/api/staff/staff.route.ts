import { createStaff, login, logout } from "./staff.controller";
import { limitUsers } from "../../middlewares/authorize";
import { Role } from "./staff.types";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";
import authenticate from "../../middlewares/authenticate";

const router = Router();

router.post('/login', asynchronousHandler(login));

router.use(authenticate);

router.post('/logout', asynchronousHandler(logout));

router.post('/register', limitUsers(Role.ADMIN), asynchronousHandler(createStaff));

export default router;