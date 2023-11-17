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
  kid: FeeShift;
  adult: FeeShift; 
  senior: FeeShift;
}

export interface FeeShift {
  day: number;
  night: number; 
  whole: number;
}