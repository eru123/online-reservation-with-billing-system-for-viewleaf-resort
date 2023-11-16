// routes.ts
import express from 'express';
import {
  initializeContent,
  getContent,
  editContent,
  getShifts,
  editShifts
} from './content.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router = express.Router();

initializeContent();

router.get('/', asynchronousHandler(getContent));
router.patch('/', asynchronousHandler(editContent));

router.get('/shifts', asynchronousHandler(getShifts));
router.patch('/shifts', asynchronousHandler(editShifts));

export default router;
