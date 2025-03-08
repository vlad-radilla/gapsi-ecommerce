// types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  // Agrega más campos según la respuesta de la API
}

export interface ApiResponse {
  products: Product[];
  total: number;
  page: number;
  sortBy: string;
}