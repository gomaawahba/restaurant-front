import {Component, OnInit} from '@angular/core';
import {Order} from "../../model/order";
import {OrderServiceService} from "../../service/order-service.service";
import {ActivatedRoute} from "@angular/router";
import {Cartorder} from "../../model/cartorder";
import {CartServiceService} from "../../service/cart-service.service";

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit{

  constructor(private order: OrderServiceService,private route:ActivatedRoute,private cartservice:CartServiceService) {
  }

  page:number=1;
  pagelength:number=5;//....10   5
  ordersize:number=0;//.....78..0
  orders:Order[]=[];
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      ()=>{
        this.finishOrders();
      }
    )

  }
  finishOrders(){
    let result1=this.route.snapshot.paramMap.has('id');
    let result2=this.route.snapshot.paramMap.has('key');



    //alert(result)
    if(result1){
      this.getOrdersByCategoryId()
    }else if(result2){
      this.getAllOrdersContainingkey()
    }
    else{
      this.getOrders()
    }

  }

  getOrders(){
    this.order.getOdersLengthe().subscribe(
      data=>{
        //alert(data)
        this.ordersize=data
      }
    )
    this.order.getOrders(this.page-1,this.pagelength).subscribe(
      data=>{
        this.orders=data
      }
    )

  }
  getOrdersByCategoryId(){
    let idcategory=this.route.snapshot.paramMap.get('id');
    this.order.getOdersLengtheByCategoryid(idcategory).subscribe(
      data=>{
        //alert(data)
        this.ordersize=data
      }
    )
  //  alert(idcategory)

    this.order.getOrdersByCategoryid(idcategory,this.page-1,this.pagelength).subscribe(

        data=>{
          this.orders=data;


      }
    )
  }
  getAllOrdersContainingkey() {
    let keyword=this.route.snapshot.paramMap.get('key');
    this.order.getOdersLengthebykey(keyword).subscribe(
      data=>{
       // alert(data)
        this.ordersize=data;
      }

    )
    //alert(keyword);
    this.order.getOrdersBykey(keyword,this.page-1,this.pagelength).subscribe(
      data=>{
        this.orders=data;
      }
    )


  }

  doing() {
   // alert(this.page)
    //this.finishOrders()
    this.finishOrders()
  }

  pageSize(event: Event) {
    this.pagelength=+(<HTMLInputElement>event.target).value
    this.finishOrders()

  }


  addToCart(temp: Order) {
    const cartorder=new Cartorder(temp);
    this.cartservice.addOrderToCart(cartorder)
    //console.log(cartorder);

  }
}
