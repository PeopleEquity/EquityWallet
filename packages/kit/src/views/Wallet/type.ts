export enum WalletHomeTabEnum {
  Tokens = 'Tokens',
  Collectibles = 'Collectibles',
  DCFi = 'DCFI',
  Dcs = 'DCS',
  History = 'History',
  Tools = 'Tools',
}

export const HomeTabOrder = [
  WalletHomeTabEnum.Tokens,
  WalletHomeTabEnum.Collectibles,
  WalletHomeTabEnum.DCFi,
  WalletHomeTabEnum.Dcs,
  WalletHomeTabEnum.History,
  WalletHomeTabEnum.Tools,
];

export const HomeTabIndex = {
  [WalletHomeTabEnum.Tokens]: 0,
  [WalletHomeTabEnum.Collectibles]: 1,
  [WalletHomeTabEnum.DCFi]: 2,
  [WalletHomeTabEnum.Dcs]: 3,
  [WalletHomeTabEnum.History]: 4,
  [WalletHomeTabEnum.Tools]: 5,
};
