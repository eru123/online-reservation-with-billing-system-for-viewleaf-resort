// types.ts
export interface FAQDocument extends Document {
  id: number;
  question: string;
  answer: string;
}

export interface CreateFAQInput {
  question: string;
  answer: string;
}

export interface UpdateFAQInput {
  faqId: number;
  question?: string;
  answer?: string;
}

export interface GetFAQs {
  id?: number;
}