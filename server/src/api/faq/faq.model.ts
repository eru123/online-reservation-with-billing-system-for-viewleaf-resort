// models/FAQModel.ts
import { Schema, model } from 'mongoose';
import { id } from '../../utilities/ids';
import { FAQDocument } from './faq.types';

const FAQSchema = new Schema(
  {
    faqId: {
      type: String,
      unique: true,
      default: id
    },
    question: { 
      type: String, 
      minlength: 1,
      required: true 
    },
    answer: { 
      type: String, 
      minlength: 1,
      required: true 
    },
  },
  { timestamps: true }
);

export default model<FAQDocument>('FAQ', FAQSchema);