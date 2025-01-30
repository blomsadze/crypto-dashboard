import { create } from "zustand";

export interface IConversionValidationError {
  [key: string]: string;
}

export interface IConversionResult {
  from: string | null;
  to: string | null;
  amount: number | null;
  total: number | null;
}

interface ConversionState {
  baseCrypto: string;
  targetCrypto: string;
  amount: number;
  conversionResult: IConversionResult;
  errors: IConversionValidationError;
  setBaseCrypto: (crypto: string) => void;
  setTargetCrypto: (crypto: string) => void;
  setAmount: (amount: number) => void;
  setConversionResult: (result: IConversionResult) => void;
  setErrors: (errors: IConversionValidationError) => void;
}

export const useConversionStore = create<ConversionState>((set) => ({
  baseCrypto: "",
  targetCrypto: "",
  amount: 0,
  conversionResult: {
    from: null,
    to: null,
    amount: null,
    total: null,
  },
  errors: {},
  setBaseCrypto: (crypto) => set({ baseCrypto: crypto }),
  setTargetCrypto: (crypto) => set({ targetCrypto: crypto }),
  setAmount: (amount) => set({ amount }),
  setConversionResult: (result: IConversionResult) =>
    set({ conversionResult: result }),
  setErrors: (errors: IConversionValidationError) => set({ errors }),
}));
