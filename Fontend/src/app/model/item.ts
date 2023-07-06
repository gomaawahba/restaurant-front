import {Cartorder} from "./cartorder";

export class Item {
  img: string | undefined;
  quantity: number | undefined;
  price: number | undefined;

  constructor(order: Cartorder) {
    this.img = order.img
    this.quantity = order.quantity
    this.price = order.price
  }
}
