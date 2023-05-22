import type { FC } from 'react';
import { useMemo, useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import { useIntl } from 'react-intl';

import {
  Box,
  HStack,
  Icon,
  Pressable,
  SegmentedControl,
  Text,
  ToggleButtonGroup,
  useIsVerticalLayout,
} from '@onekeyhq/components';
import type { Network } from '@onekeyhq/engine/src/types/network';

import { HomeRoutes } from '../../../../routes/types';
import ChainSelector from '../../../NFTMarket/ChainSelector';
import DateSelector from '../../DateSelector';
import { useDefaultNetWork } from '../hook';

import { WealthListContext, useWealthListContext } from './context';
import Recommend from './Recommend';
import Team from './Team';

import type { HomeRoutesParams } from '../../../../routes/types';
import type { WealthListContextValue } from './context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<
  HomeRoutesParams,
  HomeRoutes.DCSWealth
>;

const ListHeader: FC = () => {
  const defaultNetwork = useDefaultNetWork();
  const [selectedNetwork, setSelectedNetwork] =
    useState<Network>(defaultNetwork);
  const navigation = useNavigation<NavigationProps>();
  const setContext = useWealthListContext()?.setContext;
  const context = useWealthListContext()?.context;
  const intl = useIntl();

  return (
    <Box flexDirection="row" justifyContent="space-between" mb="12px">
      <Text typography="Heading">Earnings</Text>
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
              navigation.navigate(HomeRoutes.DCSWealth, {
                network: selectedNetwork,
                selectedIndex: context?.selectedIndex,
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

export const WealthList = () => {
  const context = useWealthListContext()?.context;
  const setContext = useWealthListContext()?.setContext;
  const [selectedTime, setSelectedTime] = useState(context?.selectedTime ?? 0);
  const [selectedIndex, setSelectedIndex] = useState(
    context?.selectedIndex ?? 0,
  );
  const isSmallScreen = useIsVerticalLayout();
  const intl = useIntl();

  const volumeTitle = useMemo(() => {
    switch (context?.selectedTime) {
      case 0:
        return '1M';
      case 1:
        return '3M';
      case 2:
        return '6M';
      case 3:
        return '1Y';
      case 4:
        return 'All';
      default:
        break;
    }
  }, [context?.selectedTime, intl]);

  return (
    <>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb="16px"
      >
        <ToggleButtonGroup
          buttons={[
            {
              text: 'Total',
            },
            {
              text: 'Community',
            },
          ]}
          size="lg"
          selectedIndex={selectedIndex}
          bg="transparent"
          onButtonPress={(index) => {
            setSelectedIndex(index);
            if (setContext) {
              setContext((ctx) => ({
                ...ctx,
                selectedIndex: index,
              }));
            }
          }}
          flex={1}
        />
        {context?.isTab && isSmallScreen && (
          <Text typography="Body2" color="text-subdued" textAlign="right">
            {volumeTitle}
          </Text>
        )}
        {!context?.isTab && isSmallScreen && (
          <DateSelector
            title={volumeTitle}
            onChange={(time) => {
              setSelectedTime(time);
              if (setContext) {
                setContext((ctx) => ({
                  ...ctx,
                  selectedTime: time,
                }));
              }
            }}
          />
        )}
        {!context?.isTab && !isSmallScreen && (
          <Box width="160px">
            <SegmentedControl
              values={['1M', '3M', '6M', '1Y', 'ALL']}
              selectedIndex={selectedTime}
              onChange={(index) => {
                setSelectedTime(index);
                if (setContext) {
                  setContext((ctx) => ({
                    ...ctx,
                    selectedTime: index,
                  }));
                }
              }}
            />
          </Box>
        )}
      </Box>
      {selectedIndex === 0 ? <Recommend /> : <Team />}
    </>
  );
};
const WealthModule = () => {
  const defaultNetwork = useDefaultNetWork();
  const [context, setContext] = useState<WealthListContextValue>({
    isTab: true,
    selectedNetwork: defaultNetwork,
    selectedIndex: 0,
    selectedTime: 0,
  });

  const contextValue = useMemo(() => ({ context, setContext }), [context]);

  return (
    <WealthListContext.Provider value={contextValue}>
      <ListHeader />
      <WealthList />
    </WealthListContext.Provider>
  );
};

export default WealthModule;
