// safe import
import { OnekeyNetwork } from '@onekeyhq/shared/src/config/networkIds';

export const DCSChainMap: Record<string, string> = {
  [OnekeyNetwork.bsc]: 'bsc',
  [OnekeyNetwork.tbsc]: 'tbsc',
};

export type ERCType = 'erc721' | 'erc1155';

export type Traits = {
  traitType: string;
  value: string;
};

export type CollectionAttribute = {
  attributes_name: string;
  attributes_values: {
    attributes_value: string;
    total: number;
  }[];
};

export type Collection = {
  contractAddress?: string;
  contractName?: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  ownsTotal?: string;
  floorPrice?: number;
  priceSymbol?: string;
  assets: CurrenciesAsset[];
  totalPrice: number;
  collectionId?: string;
  chain?: string;
  ercType?: string;
  attributes?: CollectionAttribute[];
  name?: string;
  itemsTotal?: number;
  ownersTotal?: number;
  amountsTotal?: number;
  volume24h?: number;
  openseaVerified?: boolean;
  royalty?: number;
  blueChip?: {
    next_blue_chip_probability: string | null;
  } | null;
};

export type CurrenciesAsset = {
  description: string;
  icon: string;
  net: string;
  price: number;
  rate: number;
  symbol: string;
  trend: string;
  unit: string;
  vol: number
};

export type WealthAsset = {
  amt: number;
  icon: string;
  net: string;
  shortWallet: string;
  symbol: string;
  trend: string;
  unit: string;
  wallet: string;
}

export type TrendingAsset = {
  amt: number;
  icon: string;
  net: string;
  shortWallet: string;
  symbol: string;
  trend: string;
  unit: string;
  wallet: string;
}