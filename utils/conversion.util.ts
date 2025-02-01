import {
  IConversionResult,
  IConversionValidationError,
} from "@/store/coversion.store";

export const validateConversion = (
  amount: number | null,
  baseCrypto: string | null,
  targetCrypto: string | null
): IConversionValidationError => {
  const errors: IConversionValidationError = {};

  if (!amount) {
    errors["amount"] = "Amount is required";
  }
  if (!baseCrypto) {
    errors["baseCrypto"] = "Base crypto is required";
  }
  if (!targetCrypto) {
    errors["targetCrypto"] = "Target crypto is required";
  }

  return errors;
};

export const convertCrypto = (
  amount: number,
  baseCrypto: string,
  targetCrypto: string,
  priceMap: Record<string, number>
): number => {
  if (!priceMap || !priceMap[baseCrypto] || !priceMap[targetCrypto]) {
    return 0;
  }
  return (amount * priceMap[baseCrypto]) / priceMap[targetCrypto];
};

export const handleConversionSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  amount: number | null,
  baseCrypto: string | null,
  targetCrypto: string | null,
  priceMap: Record<string, number>,
  setErrors: (errors: IConversionValidationError) => void,
  setConversionResult: (result: IConversionResult) => void
) => {
  e.preventDefault();
  // 1) clear past errors
  setErrors({});

  // 2) validate
  const validationErrors = validateConversion(amount, baseCrypto, targetCrypto);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  // 3) convert
  const result = convertCrypto(
    amount as number,
    baseCrypto as string,
    targetCrypto as string,
    priceMap
  );
  setConversionResult({
    from: baseCrypto,
    to: targetCrypto,
    amount: amount,
    total: result,
  });
};
