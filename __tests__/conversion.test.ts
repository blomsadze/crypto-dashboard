/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  validateConversion,
  convertCrypto,
  handleConversionSubmit,
} from "@/utils/conversion.util";

describe("validateConversion", () => {
  it("should return errors for missing fields", () => {
    expect(validateConversion(null, null, null)).toEqual({
      amount: "Amount is required",
      baseCrypto: "Base crypto is required",
      targetCrypto: "Target crypto is required",
    });
  });

  it("should return an empty object when all fields are valid", () => {
    expect(validateConversion(1, "BTC", "ETH")).toEqual({});
  });
});

describe("convertCrypto", () => {
  const priceMap = { BTC: 50000, ETH: 2500 };

  it("should return 0 if priceMap is missing data", () => {
    expect(convertCrypto(1, "BTC", "DOGE", priceMap)).toBe(0);
  });

  it("should correctly convert crypto", () => {
    expect(convertCrypto(2, "BTC", "ETH", priceMap)).toBe(40);
  });
});

describe("handleConversionSubmit", () => {
  let setErrorsMock: jest.Mock;
  let setConversionResultMock: jest.Mock;
  let eventMock: any;

  beforeEach(() => {
    setErrorsMock = jest.fn();
    setConversionResultMock = jest.fn();
    eventMock = { preventDefault: jest.fn() };
  });

  it("should validate inputs and set errors", () => {
    handleConversionSubmit(
      eventMock,
      null,
      null,
      null,
      {},
      setErrorsMock,
      setConversionResultMock
    );

    expect(setErrorsMock).toHaveBeenCalledWith({
      amount: "Amount is required",
      baseCrypto: "Base crypto is required",
      targetCrypto: "Target crypto is required",
    });
    expect(setConversionResultMock).not.toHaveBeenCalled();
  });

  it("should convert crypto if inputs are valid", () => {
    const priceMap = { BTC: 50000, ETH: 2500 };

    handleConversionSubmit(
      eventMock,
      2,
      "BTC",
      "ETH",
      priceMap,
      setErrorsMock,
      setConversionResultMock
    );

    expect(setErrorsMock).toHaveBeenCalledWith({});
    expect(setConversionResultMock).toHaveBeenCalledWith({
      from: "BTC",
      to: "ETH",
      amount: 2,
      total: 40,
    });
  });
});
