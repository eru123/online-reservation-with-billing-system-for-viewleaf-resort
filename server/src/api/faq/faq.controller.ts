import { Request, Response } from 'express';
import FAQModel from './faq.model';

import { CreateFAQInput, UpdateFAQInput, DeleteFAQs, GetFAQs } from './faq.types';

export const createFAQs = async (req: Request<any, any, CreateFAQInput>, res: Response) => {
  try {
    const { question, answer } = req.body;

    const faq = await FAQModel.create({ 
      question, 
      answer 
    });

    res.json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getFAQs = async (_req: Request<any, any, GetFAQs>, res: Response) => {
  try {
    const faqs = await FAQModel.find();
    res.json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editFAQ = async (req: Request<any, any, UpdateFAQInput>, res: Response) => {
  try {
    const { faqId, question, answer } = req.body;

    // Validate that at least one field is being updated
    if (!question && !answer) {
      return res.status(400).json({ error: 'At least one field (question or answer) must be provided for update.' });
    }

    const faq = await FAQModel.findOneAndUpdate(
      { faqId }, // Search based on faqId
      { $set: { question, answer } },
      { new: true } // Return the updated document
    );

    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    res.json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteFAQ = async (req: Request<any, any, DeleteFAQs>, res: Response) => {
  try {
    const { faqId } = req.body;

    const deletedFAQ = await FAQModel.findOneAndDelete({ faqId });

    if (!deletedFAQ) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    res.json({ message: 'FAQ deleted successfully', deletedFAQ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
