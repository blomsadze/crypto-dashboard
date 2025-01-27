import { useEffect, useReducer } from "react";

type TPriceState = Record<string, string>;

type TPriceAction = { type: "UPDATE_PRICE"; payload: TPriceState };

const priceReducer = (
  state: TPriceState,
  action: TPriceAction
): TPriceState => {
  switch (action.type) {
    case "UPDATE_PRICE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const useRealTimePrices = (assetIds: string[]) => {
  const [prices, dispatch] = useReducer(priceReducer, {});

  useEffect(() => {
    if (assetIds.length === 0) return;

    const ws = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${assetIds.join(",")}`
    );

    ws.onmessage = (event) => {
      const updatedPrices = JSON.parse(event.data);
      dispatch({ type: "UPDATE_PRICE", payload: updatedPrices });
    };

    return () => ws.close();
  }, [assetIds]);

  return prices;
};
