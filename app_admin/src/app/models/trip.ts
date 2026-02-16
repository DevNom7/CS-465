export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: string;
  start: any;        // keep flexible (string/Date/ISO) since we convert on save/load
  resort: string;
  perPerson: string;
  image?: string;
  description: string;
}
