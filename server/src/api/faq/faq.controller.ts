import { Request, Response } from 'express';
import FAQModel from './faq.model';

import { CreateFAQInput, FAQDocument } from './faq.types';

export const createFAQs = async (req: Request<any, any, CreateFAQInput>, res: Response) => {
  try {
    console.log(req.body);
    const { question, answer } = req.body;

    const faq = await FAQModel.create({ 
      question, 
      answer 
    });
    console.log(faq);

    res.json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getFAQs = async (req: Request<any, any, CreateFAQInput>, res: Response) => {
  try {
    const faqs = await FAQModel.find();
    res.json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
