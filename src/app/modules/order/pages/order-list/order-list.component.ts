import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';

interface OrderProduct {
  title?: string;
  imageCover?: string;
}

interface OrderCartItem {
  product?: OrderProduct;
  count: number;
}

interface ShippingAddress {
  details: string;
  city?: string;
  phone?: string;
}

interface Order {
  id: string;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: OrderCartItem[];
  shippingAddress?: ShippingAddress;
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _OrderService: OrderService
  ) {}

  orders: Order[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    const userId = this._AuthService.getCurrentUserId();

    if (!userId) {
      this.errorMessage = 'Could not find logged in user.';
      this.isLoading = false;
      return;
    }

    this._OrderService.getUserOrders(userId).subscribe({
      next: (response) => {
        this.orders = Array.isArray(response) ? (response as Order[]) : [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load orders right now.';
        this.isLoading = false;
      },
    });
  }

  orderItemsCount(order: Order): number {
    return order.cartItems.length;
  }

  visibleCartItems(order: Order): OrderCartItem[] {
    return order.cartItems.slice(0, 5);
  }
}
