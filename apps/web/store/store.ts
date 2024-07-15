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
  contract: Keys | null;
  setContract: (keys: Keys) => void;
}
interface PropertyState {
  propertyName: string;
  description: string;
  image: File | null;
  fundAmount: string;
  tokens: string;
  numberOfInvestors: string;
  fundsInvested: string;
  tokenName: string;
}

interface StoreActions {
  updateFundsInvested: (propId: number, investAmount: string) => void;
  updateNoOfInvestors: (propId: number) => void;
}

interface Store extends States, StoreActions {}

export const useStore = create<Store>((set) => ({
  owner: { secretKey: "", publicKey: "" },
  setOwner: (keys: Keys) => set(() => ({ owner: keys })),
  investor: { secretKey: "", publicKey: "" },
  setInvestor: (keys: Keys) => set(() => ({ investor: keys })),
  isOwner: true,
  setIsOwner: (isOwner: boolean) => set({ isOwner }),
  propertyState: [],
  setPropertyState: (propertyState: PropertyState[]) => set({ propertyState }),
  contract: null,
  setContract: (keys: Keys) => set(() => ({ contract: keys })),
  updateFundsInvested: (propId: number, investAmount: string) =>
    set((state) => {
      // Assuming propId is the index of the property in the array
      const updatedPropertyStates = state.propertyState.map(
        (property, index) => {
          if (index === propId) {
            // Convert fundsInvested and investAmount to numbers to add them
            const updatedFundsInvested = (
              Number(property.fundsInvested) + Number(investAmount)
            ).toString();
            return { ...property, fundsInvested: updatedFundsInvested };
          }
          return property;
        },
      );

      return { propertyState: updatedPropertyStates };
    }),
  updateNoOfInvestors: (propId: number) =>
    set((state) => {
      // Assuming propId is the index of the property in the array
      const updatedPropertyStates = state.propertyState.map(
        (property, index) => {
          if (index === propId) {
            return {
              ...property,
              numberOfInvestors: String(Number(property.numberOfInvestors) + 1),
            };
          }
          return property;
        },
      );

      return { propertyState: updatedPropertyStates };
    }),
}));
