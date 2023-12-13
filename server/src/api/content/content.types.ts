export interface ContentDocument extends Document {
  about: string;
  phone: number;
  email: string,
  address: string,
  policy: string,
  terms: string,
  privacy: string,
  payment: string,
  promo: Number,
  shift: Shift,
}

export interface Shift {
  day: Duration;
  night: Duration; 
  whole: Duration;
}

export interface Duration {
  start: string;
  end: string; 
}
