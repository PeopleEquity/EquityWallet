import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/core';

import { ScrollView, useSafeAreaInsets } from '@onekeyhq/components';

import ChainSelector from '../../NFTMarket/ChainSelector';
import { useDefaultNetWork } from '../Home/hook';
import { CurrenciesList } from '../Home/Currencies';
import {
  CurrenciesListContext,
  useCurrenciesContext,
} from '../Home/Currencies/context';

import type { HomeRoutes } from '../../../routes/routesEnum';
import type { HomeRoutesParams } from '../../../routes/types';
import type { CurrenciesListContextValue } from '../Home/Currencies/context';
import type { RouteProp } from '@react-navigation/core';

const List = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const setContext = useCurrenciesContext()?.setContext;
  const context = useCurrenciesContext()?.context;
  const defaultNetwork = useDefaultNetWork();

  const headerRight = useCallback(
    () => (
      <ChainSelector
        selectedNetwork={context?.selectedNetwork ?? defaultNetwork}
        onChange={(n) => {
          if (setContext) {
            setContext((ctx) => ({
              ...ctx,
              selectedNetwork: n,
            }));
          }
        }}
        tiggerProps={{ paddingRight: '16px' }}
      />
    ),
    [context?.selectedNetwork, defaultNetwork, setContext],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Token',
      headerRight,
    });
  }, [headerRight, navigation]);

  return (
    <ScrollView
      p={{ base: '16px', md: '32px' }}
      contentContainerStyle={{
        width: '100%',
        maxWidth: 992,
        marginHorizontal: 'auto',
        paddingBottom: bottom,
      }}
    >
      <CurrenciesList />
    </ScrollView>
  );
};

const CurrenciesScreen = () => {
  const route =
    useRoute<
      RouteProp<HomeRoutesParams, HomeRoutes.DCSCurrencies>
    >();
  const { network } = route.params;

  const [context, setContext] = useState<CurrenciesListContextValue>({
    isTab: false,
    selectedNetwork: network,
  });

  const contextValue = useMemo(() => ({ context, setContext }), [context]);
  return (
    <CurrenciesListContext.Provider value={contextValue}>
      <List />
    </CurrenciesListContext.Provider>
  );
};

export default CurrenciesScreen;
