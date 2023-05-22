import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import type { Network } from '@onekeyhq/engine/src/types/network';
import type {
  WealthAsset,
} from '@onekeyhq/engine/src/types/dcs';

export type WealthListContextValue = {
  isTab: boolean;
  loading?: boolean;
  selectedNetwork?: Network;
  selectedIndex?: number;
  selectedTime: number; // 0:1M; 1:3M;  3:6M;  4:1Y;  5:ALL
  recommendList?: WealthAsset[];
  teamList?: WealthAsset[];
};

export type IWealthListContext = {
  context: WealthListContextValue;
  setContext: Dispatch<SetStateAction<WealthListContextValue>>;
};

export const WealthListContext = createContext<IWealthListContext | null>(null);

export function useWealthListContext() {
  return useContext(WealthListContext);
}
