import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/core';

import { ScrollView, useSafeAreaInsets } from '@onekeyhq/components';
import type { Network } from '@onekeyhq/engine/src/types/network';

import ChainSelector from '../../NFTMarket/ChainSelector';
import { WealthListContext } from '../Home/Wealth/context';

import type { HomeRoutes } from '../../../routes/routesEnum';
import type { HomeRoutesParams } from '../../../routes/types';
import type { WealthListContextValue } from '../Home/Wealth/context';
import type { RouteProp } from '@react-navigation/core';
import {WealthList} from "../Home/Wealth";

const WealthListScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<HomeRoutesParams, HomeRoutes.DCSWealth>>();
  const { network, selectedIndex } = route.params;
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(network);
  const [context, setContext] = useState<WealthListContextValue>({
    isTab: false,
    selectedIndex,
    selectedTime: 0,
    selectedNetwork,
  });

  const headerRight = useCallback(
    () => (
      <ChainSelector
        triggerSize="lg"
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
        tiggerProps={{ paddingRight: '16px' }}
      />
    ),
    [selectedNetwork],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Earnings',
      headerRight,
    });
  }, [headerRight, navigation]);

  const contextValue = useMemo(() => ({ context, setContext }), [context]);
  return (
    <WealthListContext.Provider value={contextValue}>
      <ScrollView
        p={{ base: '16px', md: '32px' }}
        contentContainerStyle={{
          width: '100%',
          maxWidth: 992,
          paddingBottom: bottom,
          alignSelf: 'center',
        }}
      >
        <WealthList />
      </ScrollView>
    </WealthListContext.Provider>
  );
};

export default WealthListScreen;
