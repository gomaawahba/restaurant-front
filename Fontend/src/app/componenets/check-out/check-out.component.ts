import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StateCountryServiceService} from "../../service/state-country-service.service";
import {Country} from "../../model/country";
import {State} from "../../model/state";
import {SpaceValidator} from "../../model/space-validator";
import {CartServiceService} from "../../service/cart-service.service";
import {Client} from "../../model/client";
import {Address} from "../../model/address";
import {RequestOrder} from "../../model/request-order";
import {Cartorder} from "../../model/cartorder";
import {Item} from "../../model/item";
import {PurchaseRequest} from "../../model/purchase-request";
import {PurchaseServiceService} from "../../service/purchase-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{



  // @ts-ignore
  checkoutparentgroupe:FormGroup;
  countries:Country[]=[];
  statesfrompersone:State[]=[];
  statestopresone:State[]=[];

  states:State[]=[];
  totalSize: number = 0;
  totalPrice: number= 0;
  constructor(private fromechildgroup:FormBuilder,private statecountryservice:StateCountryServiceService
  , private card: CartServiceService, private ps: PurchaseServiceService,private router: Router) {
  }

  ngOnInit(): void {



    this.checkoutparentgroupe=this.fromechildgroup.group(
      {
        data:this.fromechildgroup.group(
          {
            fullName:new FormControl('',[
              Validators.required,
              SpaceValidator.onlyContainSpace,
              Validators.minLength(6)]),
            gmail:new FormControl('',[
              Validators.required,
              Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
            ]),
            phone: new FormControl('',[
              Validators.required,
              Validators.minLength(11),
              Validators.maxLength(11),
              Validators.pattern('^[0-9]*$')
    ])
  }),
        frompersone:this.fromechildgroup.group(
          {
            country:[''],
            state:[''],
            zipCode:['']

          }
        ),
        topersone:this.fromechildgroup.group(
          {
            country:[''],
            state:[''],
            zipCode:['']
          }
        ),
        creditCard:this.fromechildgroup.group(
          {
            cardType:[''],
            cardNumber:[''],
            code:['']
          }
        ),



      }
    )
    this.getallcountry();


   // this.getStatesByCode()
   this.getAllStates();
   this.getTotals()
  }
  get fullName(){
    return this.checkoutparentgroupe.get('data.fullName')
  }
  get email(){
    return this.checkoutparentgroupe.get('data.gmail')
  }
  get phone(){
    return this.checkoutparentgroupe.get('data.phone')
  }

  done() {
    if (this.checkoutparentgroupe.invalid) {
      this.checkoutparentgroupe.markAllAsTouched()
    }else {
      let client: Client = new Client();
      client.name = this.checkoutparentgroupe.controls['data'].value.fullName;
      client.email = this.checkoutparentgroupe.controls['data'].value.gmail;
      client.phoneNumber = this.checkoutparentgroupe.controls['data'].value.phone;
      ////##2###////////////
      let fromAddress: Address =  this.checkoutparentgroupe.controls['fromPerson'].value
      // @ts-ignore
      fromAddress.state = fromAddress.state['name']
      /* #3 */
      let toAddress: Address =  this.checkoutparentgroupe.controls['toPerson'].value;
      // @ts-ignore
      toAddress.state = toAddress.state['name']

      /* #4 */
      let requestOrder = new RequestOrder();
      requestOrder.totalPrice = this.totalPrice;
      requestOrder.totalQuantity = this.totalSize;
      /* #5 */
      let orders: Cartorder[] = this.card.orders;
      let items: Item[]  = orders.map(order => new Item(order));
      /* #6 */
      let purchaseRequest = new PurchaseRequest();
      purchaseRequest.client = client;
      purchaseRequest.fromAddress = fromAddress;
      purchaseRequest.toAddress = toAddress;
      purchaseRequest.requestOrder = requestOrder;
      purchaseRequest.items = items;

      this.ps.getOrders(purchaseRequest).subscribe(  {
        next: response=> {
          alert("Your Name : " + response.name)
          alert("Your Code : " + response.code)
          this.clean()
        },
        // @ts-ignore
        error: error =>{
          console.log("Error is : " + error.message)
        }
      })


    }


  }
  clean(){
    this.card.orders = [];
    this.card.totalorders.next(0);
    this.card.totalprice.next(0);
    this.checkoutparentgroupe.reset();
    this.router.navigateByUrl("/orders")

  }

  similerGroupe(event: Event) {
    if((<HTMLInputElement>event.target).checked) {

      // @ts-ignore
      // @ts-ignore

      this.checkoutparentgroupe.controls.topersone.setValue(
        // @ts-ignore
        this.checkoutparentgroupe.controls.frompersone.value
      )
      this.statestopresone=this.statesfrompersone




    }else{

      // @ts-ignore
      this.checkoutparentgroupe.contains().topersone.reset()
    }

  }
  getallcountry(){
    this.statecountryservice.getAllCountry().subscribe(
      data=>{
        this.countries=data;
      }
    )

  }
  getStatesByCode(typeForm: string){
    // @ts-ignore
    const code = this.checkoutparentgroupe.get(`${typeForm}.country`).value

    this.statecountryservice.getStatesByCode(code).subscribe(
      data =>{
        if(typeForm === 'fromPerson'){

          // @ts-ignore
          this.statesfrompersone = data
        } else {
          // @ts-ignore
          this.statestopresone= data
        }
        // @ts-ignore
        this.checkoutparentgroupe.get(`${typeForm}.state`).setValue(data[0])
      }
    )
  }
  /*
  *  getStatesByCode(typeForm){
    const code = this.checkoutParentGroup.get(`${typeForm}.country`).value

    this.stateCountry.getStatesByCode(code).subscribe(
      data =>{
        if(typeForm === 'fromPerson'){
          this.statesFromPerson = data
        } else {
          this.statesToPerson = data
        }
        this.checkoutParentGroup.get(`${typeForm}.state`).setValue(data[0])
      }
    )
  }*/

  /*
  getStatesByCode(typeform:string){
    // @ts-ignore
    const code=this.checkoutparentgroupe.get(`${typeform}.country`).value

    this.statecountryservice.getStatesByCode(code).subscribe(
      data=>{
        if(typeform==='frompersone'){
          // @ts-ignore
          this.statesfrompersone=data;
        }else{
          // @ts-ignore
          this.statestopresone=data
        }
        // @ts-ignore
        this.checkoutparentgroupe.get(`${typeform}.country`)?.setValue(data[0])
      }
    )
  }
*/
   getAllStates(){
    this.statecountryservice.getAllState().subscribe(
      data=>{
        this.states=data;
      }
    )
  }
  getTotals(){
    this.card.totalorders.subscribe(
      data => {
        this.totalSize = data
      }
    )
    this.card.totalprice.subscribe(
      data => {
        this.totalPrice = data
      }
    )
  }



}
