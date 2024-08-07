import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  userId: string;
  setUserId: (userId: string) => void;
  userName: string;
  setUserName: (userName: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<
  AuthState,
  [["zustand/persist", AuthState], ["zustand/devtools", never]]
>(
  persist(
    (set) => ({
      userId: "",
      setUserId: (userId) => set({ userId: userId }),
      userName: "",
      setUserName: (userName) => set({ userName: userName }),
      accessToken: "",
      setAccessToken: (accessToken) => set({ accessToken: accessToken }),
    }),
    { name: "authStore" },
  ),
);

export default useAuthStore;
