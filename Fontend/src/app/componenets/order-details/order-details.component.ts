import {Component, OnInit} from '@angular/core';
import {OrderServiceService} from "../../service/order-service.service";
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../model/order";
import {CartServiceService} from "../../service/cart-service.service";
import {Cartorder} from "../../model/cartorder";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{

  // @ts-ignore
  order: Order=null;
  constructor(private orderService:OrderServiceService,private route:ActivatedRoute,private cartservice:CartServiceService) {

  }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(){
    let id=this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderById(id).subscribe(
      data=>{
        this.order=data;
      }
    )
  }

  addcart(order: Order) {
    const ordercart=new Cartorder(order)
    this.cartservice.addOrderToCart(ordercart)

  }
}
