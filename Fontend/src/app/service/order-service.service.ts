import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Order} from "../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  private baseUrl = 'http://localhost:8080/api/';
  // private baseUrl = 'http://localhost:8080/api/allOrders';......all orders
  // private Url = 'http://localhost:8080/api/category?id={value}';......get orders by category id

  /*handel api for page and size*/
  //(`${this.baseUrl}allOrders?page=${page}&size=${size}`)
  constructor(private http: HttpClient) { }
  //`${this.baseUrl}allOrders?page=${page}&size=${size}`....front
  //my cose..${this.baseUrl}allOrders?page=${page}&size=${size}`
  getOrders(page: number,size: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}allOrders?page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }

  //`${this.baseUrl}category?id=${id}&page=${page}&size=${size}`...my
  getOrdersByCategoryid(id: string | null,page: number,size: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}category?id=${id}&page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }
  //`${this.baseUrl}orderkey?word=${word}&page=${page}&size=${size}`...my
  getOrdersBykey(word: string | null,page: number,size: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}orderkey?word=${word}&page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }
  getOrderById(id: string | null):Observable<Order>{
    return this.http.get<Order>(`${this.baseUrl}order?id=${id}`).pipe(
      map(
        response => response
      )
    )
  }
  //orderSize
  getOdersLengthe():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}orderSize`).pipe(
      map(
        response => response
      )
    )
  }
  //categoryidsize?id={value}
  getOdersLengtheByCategoryid(id: string | null):Observable<number>{
    return this.http.get<number>(`${this.baseUrl}categoryidsize?id=${id}`).pipe(
      map(
        response => response
      )
    )
  }
  //orderbykey?key={value}
  getOdersLengthebykey(word:string | null):Observable<number>{
    return this.http.get<number>(`${this.baseUrl}orderbykey?key=${word}`).pipe(
      map(
        response => response
      )
    )
  }


  /* getOrderId(id: string | null):Observable<Order>{
    return this.http.get<Order>(`${this.baseUrl}order?id=${id}`).pipe(
      map(
        response => response
      )
    )
  }
  getOrderById(id: any):Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}order?id=${id}`).pipe(
      map(
        response => response
      )
    )
  }
*/

}
