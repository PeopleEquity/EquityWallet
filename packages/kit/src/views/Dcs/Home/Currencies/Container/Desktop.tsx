import { useCallback } from 'react';

import { BigNumber } from 'bignumber.js';
import { MotiView } from 'moti';
import { Row } from 'native-base';
import { useIntl } from 'react-intl';

import {Box, List, ListItem, Text} from '@onekeyhq/components';
import type { CurrenciesAsset } from '@onekeyhq/engine/src/types/dcs';

import useFormatDate from '../../../../../hooks/useFormatDate';
import CollectionLogo from '../../../CollectionLogo';
import { PriceString } from '../../../PriceText';
import EmptyView from '../../Wealth/EmptyView';
import { useCurrenciesContext } from '../context';

import type { ListRenderItem } from 'react-native';

const ListHeaderComponent = () => {
  const intl = useIntl();

  return (
    <>
      <ListItem>
        <ListItem.Column
            p={0}
            flex={1.9}
            text={{
              label: 'Token',
              labelProps: {
                typography: 'Subheading',
                color: 'text-subdued',
              },
            }}
        />
        <ListItem.Column
            flex={1}
            text={{
              label: '',
              labelProps: {
                typography: 'Subheading',
                color: 'text-subdued',
                textAlign: 'right',
              },
            }}
        />
        <ListItem.Column
            flex={1}
            text={{
              label: 'Price',
              labelProps: {
                typography: 'Subheading',
                color: 'text-subdued',
                textAlign: 'right',
              },
            }}
        />
        <ListItem.Column
            flex={1}
            text={{
              label: 'Rate',
              labelProps: {
                typography: 'Subheading',
                color: 'text-subdued',
                textAlign: 'right',
              },
            }}
        />
      </ListItem>
      <Box mx="8px" borderBottomWidth={1} borderColor="divider" />
    </>
  );
};

const Desktop = () => {
  const context = useCurrenciesContext()?.context;
  const { formatDistanceToNow } = useFormatDate();

  const renderItem: ListRenderItem<CurrenciesAsset> = useCallback(
    ({ item, index }) => (
      <ListItem>
        <Row flex={1.9} space="12px" alignItems="center">
          <CollectionLogo
            src={item.icon}
            width="40px"
            height="40px"
          />
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
        </Row>
        <ListItem.Column
            flex={2}
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
            flex={1}
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

  const Header = useCallback(() => <ListHeaderComponent />, []);
  if (
    context?.currenciesList === undefined ||
    context?.currenciesList?.length === 0 ||
    context.loading
  ) {
    return (
      <EmptyView
        ListHeaderComponent={Header}
        isTab={context?.isTab}
        numberOfData={context?.isTab ? 5 : 10}
      />
    );
  }

  return (
    <MotiView
      from={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      style={{ flex: 1 }}
    >
      <List
        ListHeaderComponent={Header}
        data={context?.currenciesList}
        renderItem={renderItem}
        showDivider
        keyExtractor={(item, index) =>
            `${item.symbol as string} ${index}`
        }
      />
    </MotiView>
  );
};
export default Desktop;
