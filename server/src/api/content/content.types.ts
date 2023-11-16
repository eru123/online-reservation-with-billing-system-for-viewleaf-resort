export interface ContentDocument extends Document {
  about: string;
  phone: number;
  email: string,
  address: string,
  policy: string,
  payment: string,
  promo: string,
  shift: Shift,
  fee: Fee
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

export interface Fee {
  kid: number;
  adult: number; 
  senior: number;
}