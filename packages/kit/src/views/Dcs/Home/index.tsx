import {useCallback, useEffect} from 'react';
import { useNavigation } from '@react-navigation/core';
import { Box, useSafeAreaInsets, FlatList } from '@onekeyhq/components';
import { ListRenderItem } from "react-native";

import PageHeader from "./PageHeader";
import WealthModule from "./Wealth";
import TrendingModule from "./Trending";
import CurrenciesModule from "./Currencies";

export enum DCSModule {
  Wealth = 'Wealth',
  Trending = 'Trending',
  Currencies = 'Currencies',
}

type ModuleData = {
  id: string;
};

const Content = () => {
  const { bottom } = useSafeAreaInsets();
  const data: ModuleData[] = [
    { id: DCSModule.Wealth },
    { id: DCSModule.Trending },
    { id: DCSModule.Currencies },
  ];

  const renderItem: ListRenderItem<ModuleData> = useCallback(({ item }) => {
    const { id } = item;

    if (id === DCSModule.Wealth) {
      return <WealthModule />;
    }
    if (id === DCSModule.Trending) {
      return <TrendingModule />;
    }
    if (id === DCSModule.Currencies) {
      return <CurrenciesModule />;
    }
    return <Box />;
  }, []);

  const ItemSeparatorComponent = useCallback(
      () => <Box h={{ base: '32px', md: '48px' }} />,
      [],
  );

  return (
      <FlatList
          data={data}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          p={{ base: '16px', md: '16px' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: '100%',
            maxWidth: 992,
            paddingBottom: bottom,
            alignSelf: 'center',
          }}
      />
  );
};

const DCS = () => {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <Box flex={1} mt={`${top}px`}>
      <PageHeader />
      <Content />
    </Box>
  );
};

export default DCS;
