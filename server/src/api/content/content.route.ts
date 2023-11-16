// routes.ts
import express from 'express';
import {
  initializeContent,
  getContent,
  editContent,
  getShifts,
  editShifts,
  getFees,
  editFees,
} from './content.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router = express.Router();

initializeContent();

router.get('/', asynchronousHandler(getContent));
router.patch('/', asynchronousHandler(editContent));

router.get('/shifts', asynchronousHandler(getShifts));
router.patch('/shifts', asynchronousHandler(editShifts));

router.get('/fees', asynchronousHandler(getFees));
router.patch('/fees', asynchronousHandler(editFees));

export default router;
