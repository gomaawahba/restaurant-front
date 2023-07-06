import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OrderItemsComponent } from './componenets/order-items/order-items.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { CategoryItemsComponent } from './componenets/category-items/category-items.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { SearchOrderComponent } from './componenets/search-order/search-order.component';
import { OrderDetailsComponent } from './componenets/order-details/order-details.component';
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import { CardStatusComponent } from './componenets/card-status/card-status.component';
import { PurchasesComponent } from './componenets/purchases/purchases.component';
import { CheckOutComponent } from './componenets/check-out/check-out.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './componenets/login/login.component';
import { SignupComponent } from './componenets/signup/signup.component';
import {HttpIntercepterBaseAuthService} from "./service/security/http-intercepter-base-auth.service";



// http://localhost:4200/

const routes:Routes=[
  // http://localhost:4200/
  // http://localhost:4200/login
  {path:'login',component:LoginComponent},
  // http://localhost:4200/signup
  {path:'signup',component:SignupComponent},
  // http://localhost:4200/checkout
  {path:'checkout',component:CheckOutComponent},
  //http://localhost:4200/purcheses
  {path:'purcheses',component:PurchasesComponent},
  //http://localhost:4200/order/id
  {path:'order/:id',component:OrderDetailsComponent},
//http://localhost:4200/category/id
  {path:'category/:id',component:OrderItemsComponent},
  //http://localhost:4200/orders
  {path:'orders',component:OrderItemsComponent},
  //http://localhost:4200/orders/key
  {path:'orders/:key',component:OrderItemsComponent},
  //http://localhost:4200/
  //if user does not anerted any things
  {path:'',redirectTo:'/orders',pathMatch:'full'},
//http://localhost:4200/sdss
  //if user enteered any things
  {path:'**',redirectTo:'/orders',pathMatch:'full'},
];
@NgModule({
  declarations: [
    AppComponent,
    OrderItemsComponent,
    CategoryItemsComponent,
    SearchOrderComponent,
    OrderDetailsComponent,
    CardStatusComponent,
    PurchasesComponent,
    CheckOutComponent,
    LoginComponent,
    SignupComponent,



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    NgbPagination,
       ReactiveFormsModule


  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:HttpIntercepterBaseAuthService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
