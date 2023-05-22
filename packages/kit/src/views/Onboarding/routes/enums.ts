export enum EOnboardingRoutes {
  Welcome = 'welcome',

  // ConnectWallet
  ConnectWallet = 'ConnectWallet',
  ConnectHardwareModal = 'ConnectHardwareModal',

  // ImportWallet
  ImportWallet = 'ImportWallet',
  RecoveryWallet = 'RecoveryWallet',

  // CreateWallet
  SetPassword = 'SetPassword',

  // CreatePhraseWallet
  RecoveryPhrase = 'RecoveryPhrase', // RecoveryPhrase tips
  ShowRecoveryPhrase = 'ShowRecoveryPhrase', // RecoveryPhrase 12/24 words
  BehindTheScene = 'BehindTheScene', // Auto-typing
  ThirdPartyWallet = 'ThirdPartyWallet',

  // CreateSecretPassword
  RecoverySerect = 'RecoverySerect', // RecoverySelect tips
  SetSecretPassword = 'SetSecretPassword',
  ShowRecoverySerect = 'ShowRecoverySerect', // User set new serect

  // Restore from cloud backup
  RestoreFromCloud = 'RestoreFromCloud',
  CloudBackupDetails = 'CloudBackupDetails',

  // KeyTag
  KeyTag = 'KeyTag',

  // Migration
  Migration = 'Migration',
  MigrationPreview = 'MigrationPreview',
}
