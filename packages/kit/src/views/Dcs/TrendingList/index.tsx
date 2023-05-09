import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/core';

import { ScrollView, useSafeAreaInsets } from '@onekeyhq/components';
import type { Network } from '@onekeyhq/engine/src/types/network';

import ChainSelector from '../../NFTMarket/ChainSelector';
import { TrendingListContext } from '../Home/Trending/context';

import type { HomeRoutes } from '../../../routes/routesEnum';
import type { HomeRoutesParams } from '../../../routes/types';
import type { TrendingListContextValue } from '../Home/Trending/context';
import type { RouteProp } from '@react-navigation/core';
import { TrendingList } from "../Home/Trending";

const TrendingListScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<HomeRoutesParams, HomeRoutes.DCSTrending>>();
  const { network, selectedIndex } = route.params;
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(network);
  const [context, setContext] = useState<TrendingListContextValue>({
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
      title: 'Trending',
      headerRight,
    });
  }, [headerRight, navigation]);

  const contextValue = useMemo(() => ({ context, setContext }), [context]);
  return (
    <TrendingListContext.Provider value={contextValue}>
      <ScrollView
        p={{ base: '16px', md: '32px' }}
        contentContainerStyle={{
          width: '100%',
          maxWidth: 992,
          paddingBottom: bottom,
          alignSelf: 'center',
        }}
      >
        <TrendingList />
      </ScrollView>
    </TrendingListContext.Provider>
  );
};

export default TrendingListScreen;
