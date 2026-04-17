import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;

  cartNumber = signal<number>(0);

  refreshCartCount(): void {
    this.getCartUser().subscribe({
      next: (response) => {
        this.cartNumber.set(response?.numOfCartItems ?? 0);
      },
    });
  }

  addToCart(prodId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `cart`, {
      productId: prodId,
    });
  }

  getCartUser(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'cart');
  }

  removeCartItem(prodId: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart/${prodId}`);
  }

  updateCartCount(prodId: string, countNum: number): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `cart/${prodId}`, {
      count: countNum,
    });
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart`);
  }

  checkOut(cartId: string | null, orderInfo: object): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl +
        `orders/checkout-session/${cartId}?url=${window.location.origin}/orders`,

      {
        shippingAddress: orderInfo,
      }
    );
  }
}
