import { useCallback } from 'react';

import { BigNumber } from 'bignumber.js';
import { MotiView } from 'moti';

import {Box, List, ListItem, Text} from '@onekeyhq/components';
import type { CurrenciesAsset } from '@onekeyhq/engine/src/types/dcs';

import useFormatDate from '../../../../../hooks/useFormatDate';
import CollectionLogo from '../../../CollectionLogo';
import { PriceString } from '../../../PriceText';
import EmptyView from '../../Wealth/EmptyView';
import { useCurrenciesContext } from '../context';

import type { ListRenderItem } from 'react-native';

const Mobile = () => {
  const context = useCurrenciesContext()?.context;
  const { formatDistanceToNow } = useFormatDate();

  const renderItem: ListRenderItem<CurrenciesAsset> = useCallback(
    ({ item, index }) => (
      <ListItem>
        <ListItem.Column>
          <CollectionLogo
            src={item.icon}
            width="56px"
            height="56px"
          />
        </ListItem.Column>
        <ListItem.Column
            text={{
              label: `${index + 1}`,
              labelProps: { pb: '24px', typography: 'Body1Mono' },
            }}
        />
        <ListItem.Column
          flex={1}
          text={{
            label: item.symbol,
            labelProps: { isTruncated: true },
            description: item.description ? `${item.description}` : '–',
            descriptionProps: { numberOfLines: 1 },
          }}
        />
        <ListItem.Column
          text={{
            label: PriceString({
              price: new BigNumber(item.price ?? '0')
                .decimalPlaces(6)
                .toString(),
              networkId: context?.selectedNetwork?.id,
            }),
            labelProps: { textAlign: 'right', numberOfLines: 1 },
            description: item.vol
              ? item.vol
              : '–',
            descriptionProps: {
              textAlign: 'right',
              numberOfLines: 1,
            },
          }}
        />
        <ListItem.Column
            alignItems="flex-end"
            text={{
              labelProps: { textAlign: 'center', numberOfLines: 1 },
              description: (
                  <Box
                      borderRadius="6px"
                      bgColor={'surface-success-subdued'}
                      paddingX="6px"
                      paddingY="2px"
                  >
                    <Text
                        typography="CaptionStrong"
                        color={'text-success'}
                        textAlign="center"
                        minWidth="40px"
                        numberOfLines={1}
                    >
                      {`${item.rate} %`}
                    </Text>
                  </Box>
              ),
            }}
        />
      </ListItem>
    ),
    [context?.selectedNetwork?.id, formatDistanceToNow],
  );

  const ItemSeparatorComponent = useCallback(() => <Box h="4px" />, []);
  const ListFooterComponent = useCallback(() => <Box height="20px" />, []);

  if (
    context?.currenciesList === undefined ||
    context?.currenciesList?.length === 0 ||
    context.loading
  ) {
    return (
      <EmptyView
        isTab={context?.isTab}
        numberOfData={context?.isTab ? 5 : 10}
      />
    );
  }

  return (
    <MotiView
      style={{ flex: 1 }}
      from={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
    >
      <List
        data={context?.currenciesList}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          `${item.symbol as string} ${index}`
        }
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </MotiView>
  );
};
export default Mobile;
