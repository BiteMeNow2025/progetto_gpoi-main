export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    short_description?: string;
    price: number;
    image: string;
    rating?: number;
    discount?: number;
    originalPrice?: number;
  }