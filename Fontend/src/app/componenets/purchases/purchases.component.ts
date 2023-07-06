import {Component, OnInit} from '@angular/core';
import {Cartorder} from "../../model/cartorder";
import {CartServiceService} from "../../service/cart-service.service";

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit{

  orders:Cartorder[]=[];
  totalorder:number=0;
  totalprice:number=0;
  constructor(private cartservice:CartServiceService) {

  }

  ngOnInit(): void {
    this.getallorders();
    this.gettotals()
    this.cartservice.calculatetotal()
  }
  gettotals(){
    this.cartservice.totalorders.subscribe(
      data=>{
        this.totalorder=data;
      }
    )
    this.cartservice.totalprice.subscribe(
      data=>{
        this.totalprice=data;
      }
    )
  }

  getallorders(){
    this.orders
      =this.cartservice.orders;
  }

  addOrder(temp: Cartorder) {
    this.cartservice.addOrderToCart(temp)
  }

  removeOrder(temp: Cartorder) {
    this.cartservice.removeOrder(temp)
  }

  remove(temp: Cartorder) {
    this.cartservice.remove(temp)
  }
}
