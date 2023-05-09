import LayoutHeader from './index';

import {HStack, IconButton, useIsVerticalLayout} from '@onekeyhq/components';
import { NetworkAccountSelectorTriggerMobile } from '@onekeyhq/kit/src/components/NetworkAccountSelector';
import WalletSelectorTrigger from '@onekeyhq/kit/src/components/WalletSelector/WalletSelectorTrigger/WalletSelectorTrigger';
import HomeMoreMenu from '@onekeyhq/kit/src/views/Overlay/HomeMoreMenu';
import platformEnv from '@onekeyhq/shared/src/platformEnv';
import { Box } from '@onekeyhq/components';
import { AccountSelectorTrigger } from '@onekeyhq/kit/src/components/NetworkAccountSelector/triggers/AccountSelectorTrigger';
import { useActiveWalletAccount } from "@onekeyhq/kit/src/hooks";

const headerLeft = () => {
  const { wallet } = useActiveWalletAccount();
  const isVerticalLayout = useIsVerticalLayout();

  return (
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'left'}
      >
        <WalletSelectorTrigger />
        {
          !wallet ?
              null :
              <AccountSelectorTrigger
                  type={"plain"}
                  showAddress={!isVerticalLayout}
              />
        }
      </Box>
  )
};
const headerRight = () => (
  <HStack space={3} alignItems="center">
    <NetworkAccountSelectorTriggerMobile />
    <HomeMoreMenu offset={platformEnv.isNativeAndroid ? 25 : 0}>
      <IconButton
        name="EllipsisVerticalOutline"
        type="plain"
        size="lg"
        circle
        m={-2}
      />
    </HomeMoreMenu>
  </HStack>
);
export function LayoutHeaderMobile() {
  return (
    <LayoutHeader
      showOnDesktop={false}
      // headerLeft={() => <AccountSelector />}
      headerLeft={headerLeft}
      // headerRight={() => <ChainSelector />}
      headerRight={headerRight}
    />
  );
}
