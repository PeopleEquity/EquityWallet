import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import type { Network } from '@onekeyhq/engine/src/types/network';
import type { TrendingAsset } from '@onekeyhq/engine/src/types/dcs';

export type TrendingListContextValue = {
  isTab: boolean;
  loading?: boolean;
  selectedNetwork?: Network;
  selectedIndex?: number;
  selectedTime: number; // 0:6h; 1:12h;  2:1d
  incomeList?: TrendingAsset[];
  peopleList?: TrendingAsset[];
};

export type ITrendingListContent = {
  context: TrendingListContextValue;
  setContext: Dispatch<SetStateAction<TrendingListContextValue>>;
};

export const TrendingListContext = createContext<ITrendingListContent | null>(null);

export function useTrendingListContext() {
  return useContext(TrendingListContext);
}
