import {useCallback, useEffect, useMemo, useState} from 'react';

import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { useIntl } from 'react-intl';

import {
  Box, Button,
  Divider,
  Hidden,
  Icon,
  Image, Select,
  Text, Token, useIsVerticalLayout,
  useUserDevice,
} from '@onekeyhq/components';
import ContentHardwareImage from '@onekeyhq/kit/assets/onboarding/welcome_bg.png';
import {
  AppUIEventBusNames,
  appUIEventBus,
} from '@onekeyhq/shared/src/eventBus/appUIEventBus';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

import backgroundApiProxy from '../../../../background/instance/backgroundApiProxy';
import { useNavigationActions } from '../../../../hooks';
import {
  CreateWalletModalRoutes,
  ModalRoutes,
  RootRoutes,
} from '../../../../routes/routesEnum';
import { setOnBoardingLoadingBehindModal } from '../../../../store/reducers/runtime';
import Layout from '../../Layout';
import { useOnboardingContext } from '../../OnboardingContext';
import { EOnboardingRoutes } from '../../routes/enums';

import { ConnectThirdPartyWallet } from './ConnectThirdPartyWallet';
import PressableListItem from './PressableListItem';
import TermsOfService from './TermsOfService';

import type { IOnboardingRoutesParams } from '../../routes/types';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import {Row} from "native-base";

type NavigationProps = StackNavigationProp<
  IOnboardingRoutesParams,
  EOnboardingRoutes.Welcome
>;

type RouteProps = RouteProp<IOnboardingRoutesParams, EOnboardingRoutes.Welcome>;

const Welcome = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const navigation = useAppNavigation();
  const navigation = useNavigation<NavigationProps>();
  const navigationActions = useNavigationActions();
  if (process.env.NODE_ENV !== 'production') {
    global.$$navigationActions = navigationActions;
  }

  const route = useRoute<RouteProps>();
  const [disableAnimation, setDisableAnimation] = useState(
    !!route?.params?.disableAnimation,
  );
  const resetLayoutAnimation = useCallback(
    () => setDisableAnimation(!!route?.params?.disableAnimation),
    [route],
  );

  const context = useOnboardingContext();
  const forceVisibleUnfocused = context?.forceVisibleUnfocused;
  const isSmallScreen = useIsVerticalLayout();

  useEffect(() => {
    (async function () {
      if (
        platformEnv.isExtensionUiPopup ||
        platformEnv.isExtensionUiStandaloneWindow
      ) {
        if (await backgroundApiProxy.serviceApp.isResettingApp()) {
          return;
        }
        // open onBoarding by browser tab
        backgroundApiProxy.serviceApp.openExtensionExpandTab({
          routes: [RootRoutes.Onboarding, EOnboardingRoutes.Welcome],
          params: {},
        });
        setTimeout(() => {
          window.close();
        }, 200);
      }
    })();
  }, []);

  useEffect(() => {
    // Fix cardano webembed crash when onboarding page is closed on Android platform.
    if (platformEnv.isNative) {
      appUIEventBus.emit(AppUIEventBusNames.ChainWebEmbedDisabled);
    }
  }, []);

  const intl = useIntl();
  const isSmallHeight = useUserDevice().screenHeight <= 667;
  // const goBack = useNavigationBack();
  // const insets = useSafeAreaInsets();

  const onPressCreateWallet = useCallback((type: any) => {
    resetLayoutAnimation();
    backgroundApiProxy.dispatch(setOnBoardingLoadingBehindModal(false));
    navigation.navigate(EOnboardingRoutes.SetPassword, {
      type: type
    });
  }, [navigation, resetLayoutAnimation]);
  const onPressImportWallet = useCallback(() => {
    resetLayoutAnimation();
    backgroundApiProxy.dispatch(setOnBoardingLoadingBehindModal(false));
    navigation.navigate(EOnboardingRoutes.ImportWallet);
  }, [navigation, resetLayoutAnimation]);

  const onPressHardwareWallet = useCallback(() => {
    setDisableAnimation(true);
    forceVisibleUnfocused?.();
    backgroundApiProxy.dispatch(setOnBoardingLoadingBehindModal(false));
    if (disableAnimation) {
      navigation.navigate(
        RootRoutes.Modal as any,
        {
          screen: ModalRoutes.CreateWallet,
          params: {
            screen: CreateWalletModalRoutes.ConnectHardwareModal,
          },
        } as any,
      );
    } else {
      setTimeout(() => {
        navigation.navigate(
          RootRoutes.Modal as any,
          {
            screen: ModalRoutes.CreateWallet,
            params: {
              screen: CreateWalletModalRoutes.ConnectHardwareModal,
            },
          } as any,
        );
      }, 100);
    }
  }, [forceVisibleUnfocused, navigation, disableAnimation]);

  const onPressThirdPartyWallet = useCallback(() => {
    resetLayoutAnimation();
    backgroundApiProxy.dispatch(setOnBoardingLoadingBehindModal(false));
    setTimeout(() => navigation.navigate(EOnboardingRoutes.ThirdPartyWallet));
  }, [navigation, resetLayoutAnimation]);

  const options = useMemo(() => {
    return [{
      title: 'secret',
      label: 'secret',
      value: 'secret',
    }, {
      title: 'phrase',
      label: 'phrase',
      value: 'phrase',
    },]
  }, []);

  return (
    <>
      <Layout
        showCloseButton
        backButton={false}
        pt={{ base: isSmallHeight ? 8 : 20, sm: 0 }}
        scaleFade
        disableAnimation={disableAnimation}
      >
        <Box mx={'auto'}>
          <Icon name="BrandLogoIllus" size={52} />
        </Box>
        <Text fontSize={20} lineHeight={28} fontWeight={600} mt={1.5} mx={'auto'} letterSpace={'-0.3px'}>
          {'EquityWallet'}
        </Text>
        <Image
            mx={'auto'}
            source={ContentHardwareImage}
            w="320px"
            h="320px"
        />
        <Box
          flexDir={{ sm: 'row' }}
          flexWrap={{ sm: 'wrap' }}
          mt={{ base: isSmallHeight ? 8 : 66, sm: 20 }}
          mx={-2}
        >
          <Box flexDirection={{ sm: 'row' }} w={{ sm: '100%' }} gap={'16px'} justifyContent={'center'}>
            <Select
                containerProps={{
                  width: '100%',
                  maxWidth: '350px'
                }}
                title={intl.formatMessage({ id: 'action__create_wallet' })}
                dropdownPosition="top-right"
                dropdownProps={isSmallScreen ? {} : { minW: '240px' }}
                headerShown={false}
                options={options}
                isTriggerPlain
                activatable={false}
                footer={null}
                onChange={(type) => {
                  onPressCreateWallet(type)
                }}
                renderTrigger={({ onPress }) => (
                    <Button onPress={onPress} width={'100%'} maxWidth={'350px'} size="xl" type="primary" key="addWallet">
                      {intl.formatMessage({ id: 'action__create_wallet' })}
                    </Button>
                )}
            />
            <Button width={'100%'} maxWidth={'350px'} size="xl" type="basic2" onPress={onPressImportWallet} key="importWallet">
              {intl.formatMessage({ id: 'action__import_wallet' })}
            </Button>
            {/*<PressableListItem
              icon="PlusCircleOutline"
              label={intl.formatMessage({
                id: 'action__create_wallet',
              })}
              description={intl.formatMessage({
                id: 'content__create_wallet_desc',
              })}
              roundedBottom={{ base: 0, sm: 'xl' }}
              onPress={onPressCreateWallet}
            />
            <PressableListItem
              icon="ArrowDownCircleOutline"
              label={intl.formatMessage({
                id: 'action__import_wallet',
              })}
              description={intl.formatMessage({
                id: 'content__onboarding_import_wallet_desc',
              })}
              mt="-1px"
              mb={{ base: 6, sm: 0 }}
              roundedTop={{ base: 0, sm: 'xl' }}
              onPress={onPressImportWallet}
            />*/}
            {/* <PressableListItem
              icon="UsbCableOutline"
              label={intl.formatMessage({
                id: 'action__connect_hardware_wallet',
              })}
              description={intl.formatMessage({
                id: 'content__conenct_hardware_wallet_desc',
              })}
              onPress={onPressHardwareWallet}
              overflow="hidden"
            >
              <Hidden till="sm">
                <Box position="absolute" zIndex={-1} right="0" top="0">
                  <Image
                    source={ContentHardwareImage}
                    w="256px"
                    h="207px"
                    opacity={0.75}
                  />
                </Box>
              </Hidden>
            </PressableListItem> */}
          </Box>
        </Box>
        {/* <Hidden till="sm">
          <Box flexDirection="row" alignItems="center" mt="24px" mb="-12px">
            <Divider flex={1} />
            <Text mx="14px" typography="Subheading" color="text-disabled">
              {intl.formatMessage({ id: 'content__or_lowercase' })}
            </Text>
            <Divider flex={1} />
          </Box>
        </Hidden> */}
        {/* <ConnectThirdPartyWallet onPress={onPressThirdPartyWallet} /> */}
      </Layout>
      {/* <TermsOfService /> */}
    </>
  );
};

export default Welcome;
