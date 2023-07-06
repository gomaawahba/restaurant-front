import { Client } from "./client";
import {Address} from "./address";
import {RequestOrder} from "./request-order";
import {Item} from "./item";

export class PurchaseRequest {
  client: Client | undefined;
  fromAddress: Address | undefined;
  toAddress: Address | undefined;
  requestOrder: RequestOrder | undefined;
  items: Item[] | undefined;
}
