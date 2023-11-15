// types.ts
export interface FAQDocument extends Document {
  faqId: number;
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
  faqId?: number;
}


export interface DeleteFAQs {
  faqId: number;
}