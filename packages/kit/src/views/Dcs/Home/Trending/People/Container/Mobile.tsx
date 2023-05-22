import type { ComponentProps, FC } from 'react';
import { useCallback } from 'react';

import { BigNumber } from 'bignumber.js';
import { MotiView } from 'moti';
import { useIntl } from 'react-intl';

import { Box, Icon, List, ListItem, Pressable, Text, Tooltip } from '@onekeyhq/components';
import type { Network } from '@onekeyhq/engine/src/types/network';
import type { TrendingAsset } from '@onekeyhq/engine/src/types/dcs';

import CollectionLogo from '../../../../CollectionLogo';
import { useTrendingListContext } from '../../context';
import EmptyView from '../../../Wealth/EmptyView';

import type { ListRenderItem } from 'react-native';
import { shortenAddress } from "@onekeyhq/components/src/utils";
import { useCopyAddress } from "../../../../../../hooks/useCopyAddress";

type Props = {
  listData: TrendingAsset[];
  selectNetwork?: Network;
} & Pick<
    ComponentProps<typeof List>,
    'ListHeaderComponent' | 'ListFooterComponent' | 'headerProps'
    >;

const Mobile: FC<Props> = ({
                             selectNetwork,
                             listData,
                             ...listProps
                           }) => {
  const context = useTrendingListContext()?.context;
  const intl = useIntl();
  const network = context?.selectedNetwork ?? selectNetwork;
  const { copyAddress } = useCopyAddress({wallet: null});

  const renderItem: ListRenderItem<TrendingAsset> = useCallback(
      ({ item, index }) => {

        return (
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
                    description: (
                        <Tooltip
                            hasArrow
                            placement="top"
                            label={intl.formatMessage({ id: 'action__copy_address' })}
                        >
                          <Pressable
                              flexDirection="row"
                              alignItems="center"
                              rounded="12px"
                              _hover={{ bg: 'surface-hovered' }}
                              _pressed={{ bg: 'surface-pressed' }}
                              onPress={() => {
                                copyAddress(item.wallet);
                              }}
                          >
                            <Text
                                typography={{ sm: 'Body2', md: 'CaptionStrong' }}
                                mr={2}
                                color="text-subdued"
                            >
                              {shortenAddress(item.shortWallet, 4)}
                            </Text>
                            <Box minWeight={'16px'}>
                              <Icon name="Square2StackOutline" color="icon-subdued" size={16} />
                            </Box>
                          </Pressable>
                        </Tooltip>
                    ),
                    descriptionProps: { numberOfLines: 1 },
                  }}
              />
              <ListItem.Column
                  alignItems="flex-end"
                  text={{
                    label: new BigNumber(item.amt ?? '0').decimalPlaces(2).toString(),
                    labelProps: { textAlign: 'right', numberOfLines: 1 },
                  }}
              />
            </ListItem>
        );
      },
      [
        intl,
        copyAddress,
        network?.id,
        context?.selectedNetwork?.id,
      ],
  );

  const ItemSeparatorComponent = useCallback(() => <Box h="4px" />, []);
  const ListFooterComponent = useCallback(() => <Box height="20px" />, []);

  if (listData === undefined || listData?.length === 0 || context?.loading) {
    return (
        <EmptyView
            isTab={context?.isTab}
            numberOfData={context?.isTab ? 5 : 10}
            ListHeaderComponent={listProps.ListHeaderComponent}
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
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
                `${item.wallet as string}${index}`
            }
            ItemSeparatorComponent={ItemSeparatorComponent}
            ListFooterComponent={ListFooterComponent}
            {...listProps}
        />
      </MotiView>
  );
};
export default Mobile;
