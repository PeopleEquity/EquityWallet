import { useCallback } from 'react';

import { BigNumber } from 'bignumber.js';
import { MotiView } from 'moti';
import { useIntl } from 'react-intl';

import { Box, List, ListItem, Text, Tooltip, Pressable, Icon } from '@onekeyhq/components';
import type { WealthAsset } from '@onekeyhq/engine/src/types/dcs';

import CollectionLogo from '../../../../CollectionLogo';
import { useWealthListContext } from '../../context';
import EmptyView from '../../EmptyView';

import type { ListRenderItem } from 'react-native';
import { useCopyAddress } from "../../../../../../hooks/useCopyAddress";
import { shortenAddress } from "@onekeyhq/components/src/utils";

const renderSeparator = () => <Box h="4px" />;
const renderFooter = () => <Box height="20px" />;
const Mobile = ({ listData }: { listData: WealthAsset[] }) => {
  const context = useWealthListContext()?.context;
  const intl = useIntl();

  const { copyAddress } = useCopyAddress({wallet: null});

  const renderItem: ListRenderItem<WealthAsset> = useCallback(
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
    ),
    [context?.selectedNetwork?.id, intl, copyAddress],
  );

  if (listData === undefined || listData?.length === 0 || context?.loading) {
    return (
      <EmptyView
        isTab={context?.isTab}
        numberOfData={context?.isTab ? 5 : 10}
      />
    );
  }

  return (
    <MotiView from={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
      <List
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          `${item.wallet as string}${index}`
        }
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderFooter}
      />
    </MotiView>
  );
};
export default Mobile;
