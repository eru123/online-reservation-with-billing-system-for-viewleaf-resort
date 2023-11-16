export interface Duration {
  start: string;
  end: string; 
}

export interface Shift {
  day: Duration;
  night: Duration; 
  whole: Duration;
}

export interface ContentDocument extends Document {
  about: string;
  phone: number;
  email: string,
  address: string,
  policy: string,
  payment: string,
  promo: string,
  shift: Shift,
}