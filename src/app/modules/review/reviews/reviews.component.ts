import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/core/services/review.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Review } from 'src/app/core/interfaces/review';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @Input() productId!: string;

  constructor(
    private _ReviewService: ReviewService,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService
  ) {}

  reviews: Review[] = [];
  isLoading = true;
  isSubmitting = false;
  editingReviewId: string | null = null;

  currentUserId: string | null = null;

  reviewForm: FormGroup = new FormGroup({
    review: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rating: new FormControl(5, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
  });

  /** Stars array for rendering */
  stars = [1, 2, 3, 4, 5];
  hoveredStar = 0;

  ngOnInit(): void {
    this.currentUserId = this._AuthService.getCurrentUserId();
    this.loadReviews();
  }

  loadReviews(): void {
    this.isLoading = true;
    this._ReviewService.getProductReviews(this.productId).subscribe({
      next: (response) => {
        this.reviews = response.data ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  /** Check if the current user already submitted a review */
  get userReview(): Review | undefined {
    return this.reviews.find((r) => r.user?._id === this.currentUserId);
  }

  setRating(star: number): void {
    this.reviewForm.get('rating')?.setValue(star);
  }

  hoverStar(star: number): void {
    this.hoveredStar = star;
  }

  resetHover(): void {
    this.hoveredStar = 0;
  }

  submitReview(): void {
    if (this.reviewForm.invalid) return;
    this.isSubmitting = true;

    const { review, rating } = this.reviewForm.value;

    if (this.editingReviewId) {
      // Update existing review
      this._ReviewService.updateReview(this.editingReviewId, { review, rating }).subscribe({
        next: (response) => {
          this._ToastrService.success('Review updated successfully!');
          this.editingReviewId = null;
          this.reviewForm.reset({ review: '', rating: 5 });
          this.loadReviews();
          this.isSubmitting = false;
        },
        error: (err) => {
          this._ToastrService.error(err?.error?.message || 'Failed to update review.');
          this.isSubmitting = false;
        },
      });
    } else {
      // Add new review
      this._ReviewService.addReview(this.productId, { review, rating }).subscribe({
        next: (response) => {
          this._ToastrService.success('Review added successfully!');
          this.reviewForm.reset({ review: '', rating: 5 });
          this.loadReviews();
          this.isSubmitting = false;
        },
        error: (err) => {
          this._ToastrService.error(err?.error?.message || 'Failed to add review.');
          this.isSubmitting = false;
        },
      });
    }
  }

  editReview(review: Review): void {
    this.editingReviewId = review._id;
    this.reviewForm.patchValue({
      review: review.review ?? review.title ?? '',
      rating: review.rating ?? review.ratings ?? 5,
    });
    // Scroll to form
    document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.editingReviewId = null;
    this.reviewForm.reset({ review: '', rating: 5 });
  }

  deleteReview(reviewId: string): void {
    this._ReviewService.deleteReview(reviewId).subscribe({
      next: () => {
        this._ToastrService.success('Review deleted.');
        this.loadReviews();
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message || 'Failed to delete review.');
      },
    });
  }

  /** Returns star fill class */
  getStarClass(star: number, reviewRating: number): string {
    return star <= reviewRating ? 'fas fa-star' : 'far fa-star';
  }

  getFormStarClass(star: number): string {
    const current = this.hoveredStar || this.reviewForm.get('rating')?.value || 0;
    return star <= current ? 'fas fa-star active' : 'far fa-star';
  }

  isOwner(review: Review): boolean {
    return review.user?._id === this.currentUserId;
  }

  getReviewText(review: Review): string {
    return review.review ?? review.title ?? '';
  }

  getReviewRating(review: Review): number {
    return review.rating ?? review.ratings ?? 0;
  }
}
