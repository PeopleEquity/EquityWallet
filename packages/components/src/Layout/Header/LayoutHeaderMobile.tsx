import LayoutHeader from './index';

import { useNavigation, useRoute } from '@react-navigation/native';
import {HStack, IconButton, useIsVerticalLayout} from '@onekeyhq/components';
import { NetworkAccountSelectorTriggerMobile } from '@onekeyhq/kit/src/components/NetworkAccountSelector';
import WalletSelectorTrigger from '@onekeyhq/kit/src/components/WalletSelector/WalletSelectorTrigger/WalletSelectorTrigger';
import HomeMoreMenu from '@onekeyhq/kit/src/views/Overlay/HomeMoreMenu';
import platformEnv from '@onekeyhq/shared/src/platformEnv';
import { AccountSelectorTrigger } from '@onekeyhq/kit/src/components/NetworkAccountSelector/triggers/AccountSelectorTrigger';
import { useActiveWalletAccount } from "@onekeyhq/kit/src/hooks";
import { NetworkSelectorTrigger } from "@onekeyhq/kit/src/components/NetworkAccountSelector/triggers/NetworkSelectorTrigger";
import {SendRoutes, SendRoutesParams} from "@onekeyhq/kit/src/views/Send/types";
import {useNavigationState} from "@react-navigation/core";


const headerLeft = () => {
  const { wallet } = useActiveWalletAccount();
  const isVerticalLayout = useIsVerticalLayout();

  return (
      <HStack space={2} alignItems="center">
        <WalletSelectorTrigger />
        {
          !wallet ?
              null :
              <AccountSelectorTrigger
                  type={"basic"}
                  showAddress={!isVerticalLayout}
              />
        }
      </HStack>
  )
};

const headerRight = () => {
  const isVerticalLayout = useIsVerticalLayout();
  const navIndex = useNavigationState((state) => state?.index);

  return <HStack space={3} alignItems="center">
    <NetworkSelectorTrigger
        type={'basic'}
        showName={!isVerticalLayout}
    />
    { navIndex !== 1 ?
        <HomeMoreMenu offset={platformEnv.isNativeAndroid ? 25 : 0}>
          <IconButton
              name="EllipsisVerticalOutline"
              type="plain"
              size="lg"
              circle
              m={-2}
          />
        </HomeMoreMenu> : null
    }
  </HStack>
};
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
