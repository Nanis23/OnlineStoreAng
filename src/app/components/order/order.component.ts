import { Component, OnInit } from '@angular/core';
import { OrderService, OrderDTO, OrderStatus } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})


export class OrderComponent implements OnInit {

  orderStatuses = Object.values(OrderStatus);

  updateEditingOrderTotalCost(event: any) {
    if (this.editingOrder) {
      this.editingOrder.totalCost = event; 
    }
  }

  updateEditingOrderDeliveryAddress(event: any) {
    if (this.editingOrder) {
      this.editingOrder.deliveryAddress = event; 
    }
  }

  orders: OrderDTO[] = [];
  newOrder: OrderDTO = {
    id: 0,
    userId: null,
    email: '',
    totalCost: 0,
    deliveryAddress: '',
    orderDate: new Date(),
    status: 'PENDING',
    orderLines: []
  };
  editingOrder: OrderDTO | null = null;

  constructor(private orderService: OrderService) {}

  




  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
    });
  }

  addOrder(): void {
    this.orderService.createOrder(this.newOrder).subscribe(order => {
      this.orders.push(order);
      this.resetNewOrder();
    });
  }

  editOrder(order: OrderDTO): void {
    this.editingOrder = { ...order };
  }

  updateOrder(): void {
    if (this.editingOrder) {
      this.orderService.updateOrder(this.editingOrder.id, this.editingOrder).subscribe(updatedOrder => {
        const index = this.orders.findIndex(o => o.id === updatedOrder.id);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
        this.cancelEditing();
      });
    }
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id);
    });
  }

  cancelEditing(): void {
    this.editingOrder = null;
  }

  resetNewOrder(): void {
    this.newOrder = {
      id: 0,
      userId: null,
      email:'',
      totalCost: 0,
      deliveryAddress: '',
      orderDate: new Date(),
      status: 'PENDING',
      orderLines: []
    };
  }
}