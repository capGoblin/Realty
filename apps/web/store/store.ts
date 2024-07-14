import { create } from "zustand";

// State types
interface Keys {
  publicKey: string;
  secretKey: string;
}

interface States {
  owner: Keys;
  setOwner: (keys: Keys) => void;
  investor: Keys;
  setInvestor: (keys: Keys) => void;
  isOwner: boolean | null;
  setIsOwner: (isOwner: boolean) => void;
  propertyState: PropertyState[];
  setPropertyState: (propertyState: PropertyState[]) => void;
}
interface PropertyState {
  propertyName: string;
  description: string;
  image: File | null;
  fundAmount: string;
  tokens: string;
  numberOfInvestors: string;
}
// useBearStore
export const useStore = create<States>((set) => ({
  owner: { secretKey: "", publicKey: "" },
  setOwner: (keys: Keys) => set(() => ({ owner: keys })),
  investor: { secretKey: "", publicKey: "" },
  setInvestor: (keys: Keys) => set(() => ({ investor: keys })),
  isOwner: true,
  setIsOwner: (isOwner: boolean) => set({ isOwner }),
  propertyState: [],
  setPropertyState: (propertyState: PropertyState[]) => set({ propertyState }),
}));
