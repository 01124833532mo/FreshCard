export interface Review {
  _id: string;
  review?: string;
  rating?: number;
  title?: string;
  ratings?: number;
  user: {
    _id: string;
    name: string;
  };
  product: string;
  createdAt: string;
  updatedAt: string;
}
