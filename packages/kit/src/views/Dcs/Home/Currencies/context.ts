import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import type { Network } from '@onekeyhq/engine/src/types/network';

export type CurrenciesListContextValue = {
  isTab: boolean;
  loading?: boolean;
  selectedNetwork?: Network;
  currenciesList?: any[];
};

export type ICurrenciesContent = {
  context: CurrenciesListContextValue;
  setContext: Dispatch<SetStateAction<CurrenciesListContextValue>>;
};

export const CurrenciesListContext = createContext<ICurrenciesContent | null>(
  null,
);

export function useCurrenciesContext() {
  return useContext(CurrenciesListContext);
}
