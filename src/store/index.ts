import { create } from "zustand";
import { UserLoginResponse } from "@/types/forms/loginAuthTypes";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

interface UserState {
  user: UserLoginResponse | null;
  expiresAt: number | null;
  setUser: (user: UserLoginResponse) => void;
  clearUser: () => void;
  checkExpiration: () => void;
}

type UserPersist = Pick<UserState, "user" | "expiresAt">;

const DAY_IN_MS = 60 * 60 * 1000;

const persistOptions: PersistOptions<UserState, UserPersist> = {
  name: "user-store",
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    user: state.user,
    expiresAt: state.expiresAt,
  }),
  onRehydrateStorage: (state) => {
    return (state, error) => {
      if (error) {
        console.log("an error happened during hydration", error);
      } else if (state) {
        state.checkExpiration();
      }
    };
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      expiresAt: null,
      setUser: (user) =>
        set({
          user,
          expiresAt: Date.now() + DAY_IN_MS,
        }),
      clearUser: () => set({ user: null, expiresAt: null }),
      checkExpiration: () => {
        const { expiresAt, clearUser } = get();
        if (expiresAt && Date.now() > expiresAt) {
          clearUser();
        }
      },
    }),
    persistOptions
  )
);
