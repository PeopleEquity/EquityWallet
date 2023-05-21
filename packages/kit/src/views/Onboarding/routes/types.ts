import type { MigrateData } from '@onekeyhq/engine/src/types/migrate';
import type { SearchDevice } from '@onekeyhq/kit/src/utils/hardware';
import type { IOneKeyDeviceFeatures } from '@onekeyhq/shared/types';

import type { IAddExistingWalletMode } from '../../../routes';
import type { KeyTagRoutes } from '../../KeyTag/Routes/enums';
import type { EOnboardingRoutes } from './enums';
import type { NavigatorScreenParams } from '@react-navigation/native';

export type IOnboardingRecoveryPhraseParams = {
  password: string;
  withEnableAuthentication?: boolean;
  mnemonic: string;
};
export type IOnboardingRecoverySerectParams = {
  password: string;
  withEnableAuthentication?: boolean;
  serect: string;
}
export type IOnboardingBehindTheSceneParams =
  IOnboardingRecoveryPhraseParams & {
    isHardwareCreating?: {
      device: SearchDevice;
      features: IOneKeyDeviceFeatures;
    };
    type: 'serect' | 'phrase'
    entry?: 'onboarding' | 'walletSelector';
  };
export type IOnboardingSetPasswordParams = {
  type: 'phrase' | 'secret'
  disableAnimation?: boolean;
  mnemonic?: string;
};
export type IOnboardingSetSecretPasswordParams = {
  password: string;
  withEnableAuthentication?: boolean;
  disableAnimation?: boolean;
}
export type IOnboardingConnectWalletParams = {
  disableAnimation?: boolean;
  disableOnboardingDone?: boolean;
  onSuccess?: () => void;
};
export type IOnboardingImportWalletParams = {
  disableAnimation?: boolean;
};

export type IOnboardingWelcomeParams = {
  disableAnimation?: boolean;
};

export type IOnboardingRoutesParams = {
  [EOnboardingRoutes.Welcome]: IOnboardingWelcomeParams | undefined;

  [EOnboardingRoutes.ConnectWallet]: IOnboardingConnectWalletParams | undefined;
  [EOnboardingRoutes.ConnectHardwareModal]: undefined;
  [EOnboardingRoutes.ThirdPartyWallet]:
    | IOnboardingConnectWalletParams
    | undefined;

  [EOnboardingRoutes.ImportWallet]: IOnboardingImportWalletParams | undefined;
  [EOnboardingRoutes.RecoveryWallet]: IOnboardingImportWalletParams & {
    mode: IAddExistingWalletMode;
  };

  [EOnboardingRoutes.SetPassword]: IOnboardingSetPasswordParams | undefined;
  [EOnboardingRoutes.SetSecretPassword]: IOnboardingSetSecretPasswordParams | undefined;
  [EOnboardingRoutes.RecoveryPhrase]: IOnboardingRecoveryPhraseParams;
  [EOnboardingRoutes.RecoverySerect]: IOnboardingRecoverySerectParams;
  [EOnboardingRoutes.ShowRecoveryPhrase]: IOnboardingRecoveryPhraseParams;
  [EOnboardingRoutes.ShowRecoverySerect]: IOnboardingRecoverySerectParams;
  [EOnboardingRoutes.BehindTheScene]: IOnboardingBehindTheSceneParams;

  [EOnboardingRoutes.RestoreFromCloud]: undefined;
  [EOnboardingRoutes.CloudBackupDetails]: {
    backupUUID: string;
    backupTime: number;
    numOfHDWallets: number;
    numOfImportedAccounts: number;
    numOfWatchingAccounts: number;
    numOfContacts: number;
  };
  [EOnboardingRoutes.KeyTag]:
    | NavigatorScreenParams<{ [KeyTagRoutes.ImportKeytag]: undefined }>
    | undefined;
  [EOnboardingRoutes.Migration]: {
    scanText?: string;
    disableAnimation?: boolean;
  };
  [EOnboardingRoutes.MigrationPreview]: {
    data: MigrateData;
  };
};
