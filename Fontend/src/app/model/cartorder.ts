import {Order} from "./order";

export class Cartorder {
  get price(): number {
    return <number>this._price;
  }

  set price(value: number) {
    this._price = value;
  }
  get quantity(): number {
    return <number>this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }
  id: number | undefined;
  name: string | undefined;
  img: string | undefined;
   private _price: number | undefined;
  private _quantity: number | undefined;
  constructor(order:Order) {
    this.id=order.id;
    this.name=order.name;
    this.img=order.img;
    this.price=order.price;
    this.quantity=1;
  }
}
