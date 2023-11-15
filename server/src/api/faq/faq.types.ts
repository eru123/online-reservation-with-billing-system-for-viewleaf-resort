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
  question?: string;
  answer?: string;
}

export interface GetFAQs {
  id?: number;
}