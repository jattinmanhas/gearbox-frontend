import { addItemToCart, deleteItemFromUserCart, updateQuantityFromCart } from "@/lib/shop";
import { CartItemsType, ProductType } from "@/types/shop/shopTypes";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: CartItemsType[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: ProductType) => void;
  removeItem: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: async (product: ProductType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product_id === product.product_id
        );

        if (existingItem) {
          const updateItems = currentItems.map((item) =>
            item.product_id === product.product_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );

          set((state) => ({
            items: updateItems,
            totalItems: state.totalItems + 1,
            totalPrice: Number(state.totalPrice) + Number(product.price),
          }));

          const increaseQuantity = await updateQuantityFromCart(
            product.product_id,
            existingItem.quantity + 1
          );
          console.log(increaseQuantity);
        } else {
          const newItem = { ...product, quantity: 1 };
          set((state) => ({
            items: [...state.items, newItem],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + Number(product.price),
          }));

          const addNewItem = await addItemToCart(product.product_id);
          console.log(addNewItem);
        }
      },
      removeItem: async (itemId: string) => {
        const currentItems = get().items;
        const itemToRemove = currentItems.find(
          (item) => item.product_id === itemId
        );

        if (itemToRemove) {
          set((state) => ({
            items: state.items.filter((item) => item.product_id !== itemId),
            totalItems: state.totalItems - itemToRemove.quantity,
            totalPrice:
              state.totalPrice -
              Number(itemToRemove.price) * itemToRemove.quantity,
          }));

          console.log(await deleteItemFromUserCart(itemId));
        }
      },
      updateQuantity: (itemId: string, quantity: number) => {
        const currentItems = get().items;
        const itemToUpdate = currentItems.find(
          (item) => item.product_id === itemId
        );

        if (itemToUpdate) {
          const quantityDiff = quantity - itemToUpdate.quantity;
          const updatedItems = currentItems.map((item) =>
            item.product_id === itemId ? { ...item, quantity } : item
          );

          set((state) => ({
            items: updatedItems,
            totalItems: state.totalItems + quantityDiff,
            totalPrice:
              state.totalPrice + Number(itemToUpdate.price) * quantityDiff,
          }));
        }
      },
      decreaseQuantity: async (itemId: string) => {
        const currentItems = get().items;
        const itemToUpdate = currentItems.find(
          (item) => item.product_id === itemId
        );

        if (itemToUpdate && itemToUpdate.quantity > 1) {
          const updatedItems = currentItems.map((item) =>
            item.product_id === itemId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );

          set((state) => ({
            items: updatedItems,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - Number(itemToUpdate.price),
          }));

          const decreaseQuantity = await updateQuantityFromCart(
            itemId,
            itemToUpdate.quantity - 1
          );
          console.log(decreaseQuantity);
        }
      },
      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: "shopping-cart-storage",
    }
  )
);
