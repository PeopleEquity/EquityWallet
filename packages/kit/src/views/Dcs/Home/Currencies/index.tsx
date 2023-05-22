import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useIntl } from 'react-intl';
import useSWR from 'swr';

import {
  Box,
  HStack,
  Icon,
  Pressable,
  Text,
  useIsVerticalLayout,
} from '@onekeyhq/components';
import type { Network } from '@onekeyhq/engine/src/types/network';

import backgroundApiProxy from '../../../../background/instance/backgroundApiProxy';
import { HomeRoutes } from '../../../../routes/types';
import ChainSelector from '../../../NFTMarket/ChainSelector';
import { useDefaultNetWork } from '../hook';

import Desktop from './Container/Desktop';
import Mobile from './Container/Mobile';
import { CurrenciesListContext, useCurrenciesContext } from './context';

import type { HomeRoutesParams } from '../../../../routes/types';
import type { CurrenciesListContextValue } from './context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<
  HomeRoutesParams,
  HomeRoutes.DCSCurrencies
>;

const ListHeader: FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const defaultNetwork = useDefaultNetWork();
  const [selectedNetwork, setSelectedNetwork] =
    useState<Network>(defaultNetwork);
  const setContext = useCurrenciesContext()?.setContext;
  const intl = useIntl();

  return (
    <Box flexDirection="row" justifyContent="space-between" mb="16px">
      <Text typography="Heading">Token</Text>
      <HStack alignItems="center" space="20px">
        <ChainSelector
          selectedNetwork={selectedNetwork}
          onChange={(n) => {
            setSelectedNetwork(n);
            if (setContext) {
              setContext((ctx) => ({
                ...ctx,
                selectedNetwork: n,
              }));
            }
          }}
        />
        <Box m="-8px" mr="-12px">
          <Pressable
            onPress={() => {
              navigation.navigate(HomeRoutes.DCSCurrencies, {
                network: selectedNetwork,
              });
            }}
            p="8px"
            rounded="xl"
            flexDirection="row"
            alignItems="center"
            _hover={{ bg: 'surface-hovered' }}
            _pressed={{ bg: 'surface-pressed' }}
          >
            <Text
              typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
              color="text-subdued"
              mr="4px"
            >
              {intl.formatMessage({
                id: 'action__see_all',
              })}
            </Text>
            <Icon name="ChevronRightMini" color="icon-subdued" size={20} />
          </Pressable>
        </Box>
      </HStack>
    </Box>
  );
};

export const CurrenciesList = () => {
  const isSmallScreen = useIsVerticalLayout();
  const context = useCurrenciesContext()?.context;
  const setContext = useCurrenciesContext()?.setContext;
  const { serviceDCS } = backgroundApiProxy;

  /*const isFocused = useIsFocused();

  const shouldDoRefresh = useMemo((): boolean => {
    if (!context?.selectedNetwork?.id) {
      return false;
    }
    if (!isFocused) {
      return false;
    }
    return true;
  }, [context?.selectedNetwork?.id, isFocused]);

  const fetchData = async () => {
    if (setContext) {
      setContext((ctx) => ({
        ...ctx,
        loading: true,
      }));
      const data = await serviceNFT.getLiveMinting({
        chain: context?.selectedNetwork?.id,
        limit: context?.isTab ? 5 : 20,
      });
      if (data) {
        setContext((ctx) => {
          const { isTab } = ctx;
          return {
            ...ctx,
            liveMintList: isTab ? data.slice(0, 5) : data,
            loading: false,
          };
        });
      } else {
        setContext((ctx) => ({
          ...ctx,
          liveMintList: [],
          loading: false,
        }));
      }
    }
    return [];
  };

  const swrKey = 'liveMinting';
  useSWR(swrKey, fetchData, {
    refreshInterval: 30 * 1000,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    isPaused() {
      return !shouldDoRefresh;
    },
  });*/

  useEffect(() => {
    (async () => {
      if (setContext) {
        setContext((ctx) => ({
          ...ctx,
          loading: true,
        }));
        console.log('context?.selectedNetwork?.id', context?.selectedNetwork?.id)
        const data = await serviceDCS.fetchRankingInfo({
          net: 97, // context?.selectedNetwork?.id
          page: 1,
          size: context?.isTab ? 5 : 100,
          sortName: '',
          sortOrder: '',
          timeType: '',
          typew: '',
        }, 'currencies');
        if (data) {
          setContext((ctx) => {
            const { isTab } = ctx;
            return {
              ...ctx,
              currenciesList: isTab ? data.slice(0, 5) : data,
              loading: false,
            };
          });
        } else {
          setContext((ctx) => ({
            ...ctx,
            currenciesList: [],
            loading: false,
          }));
        }
      }
    })();
  }, [context?.isTab, context?.selectedNetwork?.id, serviceDCS, setContext]);

  return isSmallScreen ? <Mobile /> : <Desktop />;
};

const CurrenciesModule = () => {
  const defaultNetwork = useDefaultNetWork();

  const [context, setContext] = useState<CurrenciesListContextValue>({
    isTab: true,
    selectedNetwork: defaultNetwork,
  });
  const contextValue = useMemo(() => ({ context, setContext }), [context]);
  return (
    <CurrenciesListContext.Provider value={contextValue}>
      <ListHeader />
      <CurrenciesList />
    </CurrenciesListContext.Provider>
  );
};

export default CurrenciesModule;
