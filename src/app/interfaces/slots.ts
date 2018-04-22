export class Slot {
  id: number;
  name = '';
  price: number;
  hour: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
