// routes.ts
import express from 'express';
import {
  createFAQs,
  getFAQs,
  editFAQ,
  deleteFAQ,
} from './faq.controller';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router = express.Router();

router.post('/', asynchronousHandler(createFAQs));
router.get('/', asynchronousHandler(getFAQs));
router.patch('/', asynchronousHandler(editFAQ));
router.delete('/', asynchronousHandler(deleteFAQ));

export default router;
