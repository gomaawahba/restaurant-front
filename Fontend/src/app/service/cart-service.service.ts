import { Injectable } from '@angular/core';
import {Cartorder} from "../model/cartorder";
import {BehaviorSubject, Subject} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

    orders:Cartorder[]=[];
    totalorders:Subject<number>=new BehaviorSubject<number>(0);

    totalprice:Subject<number>=new BehaviorSubject<number>(0);

  constructor() { }
  // @ts-ignore
  existOrder:Cartorder=undefined;
  isexist:boolean=false;
  addOrderToCart(order:Cartorder){
    if(this.orders.length>0){
      /*
      for (let temp of this.orders){
        if (temp.id===order.id){
          this.existOrder=temp;
          break;
        }

      }
      */

      // @ts-ignore
      this.existOrder=this.orders.find(temp=>temp.id===order.id);
    }
    this.isexist=(this.existOrder!=undefined);
    if(this.isexist){
      this.existOrder.quantity++;
    }else{
      this.orders.push(order);
    }
    console.log(this.orders)

    this.calculatetotal()
  }
   calculatetotal() {
    let totalelementsizeorder:number=0;
    let totalpriceorder:number=0;
    for(let temp of this.orders){
      totalelementsizeorder+=temp.quantity;
      totalpriceorder+=temp.quantity*temp.price;
    }
    this.totalorders.next(totalelementsizeorder)
    this.totalprice.next(totalpriceorder)



  }
  removeOrder(order: Cartorder){
    order.quantity--;
    if(order.quantity === 0){
      this.remove(order)
    } else {
      this.calculatetotal()
    }
  }
  remove(order: Cartorder){
    const index = this.orders.findIndex(temp => temp.id === order.id) // index or -1
    if(index > -1){
      this.orders.splice(index,1)
      this.calculatetotal()
    }
  }
}
