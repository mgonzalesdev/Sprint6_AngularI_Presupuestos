import { IProduct } from "./iproduct";

export interface IBudget {
  clientName: string;
  phone: string;
  email: string;
  products: IProduct[];
  totalCost: number;
}