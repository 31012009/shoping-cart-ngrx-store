export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  selectedIds: string[];
}

export const initialCartState: CartState = {
  items: [],
  selectedIds: []
};