import { create } from "zustand";

interface ConversionState {
  baseCrypto: string;
  targetCrypto: string;
  amount: number;
  setBaseCrypto: (crypto: string) => void;
  setTargetCrypto: (crypto: string) => void;
  setAmount: (amount: number) => void;
}

export const useConversionStore = create<ConversionState>((set) => ({
  baseCrypto: "bitcoin",
  targetCrypto: "ethereum",
  amount: 1,
  setBaseCrypto: (crypto) => set({ baseCrypto: crypto }),
  setTargetCrypto: (crypto) => set({ targetCrypto: crypto }),
  setAmount: (amount) => set({ amount }),
}));
