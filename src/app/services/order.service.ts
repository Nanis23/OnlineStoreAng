import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderDTO {
  id: number;
  userId: number | null;
  email: string;
  totalCost: number;
  deliveryAddress: string;
  orderDate: Date;
  status: string;
  orderLines: any[]; // Adjust based on your OrderLineDTO structure
}


export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED'
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/user/orders';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(this.apiUrl);
  }

  createOrder(order: OrderDTO): Observable<OrderDTO> {
    return this.http.post<OrderDTO>(this.apiUrl, order);
  }

  updateOrder(id: number, order: OrderDTO): Observable<OrderDTO> {
    return this.http.put<OrderDTO>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
