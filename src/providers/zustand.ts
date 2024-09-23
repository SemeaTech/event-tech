import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  name: string;
}

interface IUserSate {
  user: IUser
  setUser: (user: IUser) => void;
}

export const useUserStore = create<IUserSate>()(
  persist(
    set => ({
      user: {
        name: ""
      },
      setUser: (user: IUser) => set({ user })
    }),
    {
      name: "user", 
    }
  )
)
