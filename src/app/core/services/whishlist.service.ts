import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhishlistService {
  constructor(private _HttpClient: HttpClient) {}

  wishlistCount = signal<number>(0);

  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;

  addToWhishList(prodId: string | undefined): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'wishlist', {
      productId: prodId,
    });
  }

  getWhishList(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'wishlist');
  }

  removeWhishList(prodId: string | undefined): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist/${prodId}`);
  }

  clearWishlist(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist`);
  }

  refreshWishlistCount(): void {
    this.getWhishList().subscribe({
      next: (response) => {
        this.wishlistCount.set(response?.data?.length ?? 0);
      },
    });
  }
}
