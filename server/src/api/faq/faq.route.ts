// routes.ts
import express from 'express';
import {
  createFAQs,
  getFAQs,
  // editFAQ,
  // deleteFAQ,
} from './faq.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router = express.Router();

router.post('/', asynchronousHandler(createFAQs));
router.get('/', asynchronousHandler(getFAQs));
// router.patch('/faqs', asynchronousHandler(editFAQ));
// router.delete('/faqs', asynchronousHandler(deleteFAQ));

export default router;
