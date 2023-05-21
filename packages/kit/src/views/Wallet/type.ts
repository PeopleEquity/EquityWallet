export enum WalletHomeTabEnum {
  Tokens = 'Tokens',
  Collectibles = 'Collectibles',
  DcFi = 'DCFI',
  Dcs = 'DCS',
  History = 'History',
  Tools = 'Tools',
}

export const HomeTabOrder = [
  WalletHomeTabEnum.Tokens,
  WalletHomeTabEnum.Collectibles,
  WalletHomeTabEnum.History,
  WalletHomeTabEnum.Tools,
];

export const HomeTabIndex = {
  [WalletHomeTabEnum.Tokens]: 0,
  [WalletHomeTabEnum.Collectibles]: 1,
  [WalletHomeTabEnum.History]: 2,
  [WalletHomeTabEnum.Tools]: 3,
};
