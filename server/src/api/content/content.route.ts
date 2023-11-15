// routes.ts
import express from 'express';
import {
  initializeContent,
  editContent
} from './content.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router = express.Router();

initializeContent();

router.patch('/', asynchronousHandler(editContent));

export default router;
