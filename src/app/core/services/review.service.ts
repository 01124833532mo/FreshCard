import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type ReviewPayload = {
  review: string;
  rating: number;
};

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private _HttpClient: HttpClient) {}

  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/';

  /** GET all reviews for a product */
  getProductReviews(productId: string): Observable<any> {
    return this._HttpClient.get(
      this.baseUrl + `products/${productId}/reviews`
    );
  }

  /** POST add a review to a product */
  addReview(productId: string, reviewData: ReviewPayload): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + `products/${productId}/reviews`,
      reviewData
    );
  }

  /** PUT update a review */
  updateReview(reviewId: string, reviewData: ReviewPayload): Observable<any> {
    return this._HttpClient.put(
      this.baseUrl + `reviews/${reviewId}`,
      reviewData
    );
  }

  /** DELETE a review */
  deleteReview(reviewId: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `reviews/${reviewId}`);
  }
}
