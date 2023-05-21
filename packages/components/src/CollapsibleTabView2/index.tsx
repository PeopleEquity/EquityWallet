import type { FC, ForwardRefRenderFunction, ReactNode } from 'react';
import {
  Children,
  Fragment,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import { useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import type { ForwardRefHandle } from '@onekeyhq/app/src/views/NestedTabView/NestedTabView';
import {HStack, IconButton, Spinner, useIsVerticalLayout, useThemeValue} from '@onekeyhq/components';

import Box from '../Box';
import FlatList from '../FlatList';
import ScrollView from '../ScrollView';
import SectionList from '../SectionList';

import type { CollapsibleContainerProps } from './types';
import {HomeRoutes, ModalRoutes, RootRoutes} from "@onekeyhq/kit/src/routes/routesEnum";
import {ManageTokenRoutes} from "@onekeyhq/kit/src/views/ManageTokens/types";
import {showHomeBalanceSettings} from "@onekeyhq/kit/src/views/Overlay/HomeBalanceSettings";
import {WALLET_TYPE_WATCHING} from "@onekeyhq/engine/src/types/wallet";
import backgroundApiProxy from "@onekeyhq/kit/src/background/instance/backgroundApiProxy";
import {useActiveWalletAccount, useNavigation} from "@onekeyhq/kit/src/hooks";
import {HomeRoutesParams, RootRoutesParams} from "@onekeyhq/kit/src/routes/types";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type TabProps = {
  name: string;
  label: string;
};

type NavigationProps = NativeStackNavigationProp<
    RootRoutesParams,
    RootRoutes.Root
    > &
    NativeStackNavigationProp<HomeRoutesParams, HomeRoutes.FullTokenListScreen>;

const tabbarHeight = 48;
const Container: ForwardRefRenderFunction<
  ForwardRefHandle,
  CollapsibleContainerProps
> = (
  {
    children,
    containerStyle,
    headerHeight,
    renderHeader,
    headerContainerStyle,
    onIndexChange,
    initialTabName,
    scrollEnabled = true,
  },
  ref,
) => {
  const layout = useWindowDimensions();
  const isVerticalLayout = useIsVerticalLayout();
  const { routes, renderScene, initialIndex } = useMemo(() => {
    const routesArray: { key: string; title: string }[] = [];
    const scene: Record<string, ReactNode> = {};
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let initialIndex = 0;
    Children.forEach(children, (element, index) => {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-unsafe-member-access
      const { name, children, label } = element.props as TabProps;
      if (initialTabName === name) {
        initialIndex = index;
      }
      routesArray.push({
        key: name,
        title: label,
      });
      scene[name] = children;
    });
    return {
      routes: routesArray,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      renderScene: ({ route }: any) => scene[route.key],
      initialIndex,
    };
  }, [children, initialTabName]);
  const [index, setIndex] = useState(initialIndex);

  const handleChange = useCallback(
    (newIndex: number) => {
      setIndex(newIndex);

      onIndexChange?.(newIndex);
    },
    [onIndexChange],
  );
  const [activeLabelColor, labelColor, indicatorColor, borderDefault, bgColor] =
    useThemeValue([
      'text-default',
      'text-subdued',
      'action-primary-default',
      'border-subdued',
      'background-default',
    ]);

  useImperativeHandle(ref, () => ({
    setPageIndex: (pageIndex: number) => {
      setIndex(pageIndex);
    },
  }));
  const renderTabBar = useCallback(
    (props: any) => {
      const styles = {
        tabbar: {
          backgroundColor: 'transparent',
          width: isVerticalLayout ?
              (index === 0 ? 'calc(100% - 100px)' : '100%') :
              (index === 0 ? 'calc(100% - 140px)' : '100%'),
          height: tabbarHeight,
          borderBottomWidth: 0,
          borderBottomColor: borderDefault,
          boxShadow: 'unset',
        },
        indicator: {
          backgroundColor: indicatorColor,
          height: 2,
        },
        indicatorContainer: {
          height: 2,
          top: tabbarHeight - 2,
          width: '100%',
        },
        tabStyle: {
          width: 'auto',
          minWidth: isVerticalLayout ? undefined : 90,
        },
        label: {
          fontWeight: '500',
          fontSize: 14,
          lineHeight: 20,
        },
      };
      return (
        <TabBar
          {...props}
          lazy
          scrollEnabled={scrollEnabled}
          indicatorStyle={styles.indicator}
          indicatorContainerStyle={styles.indicatorContainer}
          style={styles.tabbar}
          tabStyle={styles.tabStyle}
          activeColor={activeLabelColor}
          inactiveColor={labelColor}
          labelStyle={styles.label}
          getLabelText={({ route }) => route.title}
          getAccessibilityLabel={({ route }) => route.title}
        />
      );
    },
    [
      activeLabelColor,
      borderDefault,
      indicatorColor,
      isVerticalLayout,
      labelColor,
      layout.width,
      routes.length,
      scrollEnabled,
      index,
    ],
  );

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const { network, wallet } = useActiveWalletAccount();
  const { tokenEnabled: networkTokenEnabled, activateTokenRequired } =
  network?.settings ?? { tokenEnabled: false, activateTokenRequired: false };

  const tokenEnabled = useMemo(() => {
    if (wallet?.type === WALLET_TYPE_WATCHING && activateTokenRequired) {
      return false;
    }
    return networkTokenEnabled;
  }, [activateTokenRequired, networkTokenEnabled, wallet?.type]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    backgroundApiProxy.serviceOverview.refreshCurrentAccount().finally(() => {
      setTimeout(() => setRefreshing(false), 1000);
    });
  }, []);

  const refreshButton = useMemo(() => {
    if (isVerticalLayout) {
      return;
    }
    return (
        <Box alignItems="center" justifyContent="center" w="8" h="8" mr="3">
          {refreshing ? (
              <Spinner size="sm" />
          ) : (
              <IconButton
                  onPress={refresh}
                  size="sm"
                  name="ArrowPathMini"
                  type="plain"
                  ml="auto"
              />
          )}
        </Box>
    );
  }, [isVerticalLayout, refreshing, refresh]);

  return (
    <ScrollView style={[{ backgroundColor: bgColor }, containerStyle]}>
      <Box h={headerHeight || 'auto'} style={headerContainerStyle}>
        {renderHeader?.()}
      </Box>
      {
        index === 0 ?
            <Box
                style={{
                  position: "relative",
                  left: "100%",
                  top: 0,
                  height: 0,
                  zIndex: 1,
                }}
            >
              <Box
                  style={{
                    position: "absolute",
                    left: isVerticalLayout ? "-100px" : "-120px",
                    top: 0,
                    height: tabbarHeight,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100px",
                  }}
              >
                {tokenEnabled && (
                    <HStack alignItems="center" justifyContent="flex-end">
                      {refreshButton}
                      <IconButton
                          onPress={() =>
                              navigation.navigate(RootRoutes.Modal, {
                                screen: ModalRoutes.ManageToken,
                                params: { screen: ManageTokenRoutes.Listing },
                              })
                          }
                          size="sm"
                          name="PlusMini"
                          type="plain"
                          ml="auto"
                          mr={3}
                      />
                      <IconButton
                          onPress={showHomeBalanceSettings}
                          size="sm"
                          name="Cog8ToothMini"
                          type="plain"
                          mr={-2}
                      />
                    </HStack>
                )}
              </Box>
            </Box> : null
      }
      <TabView
        lazy
        animationEnabled={false}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleChange}
        initialLayout={layout}
        renderTabBar={renderTabBar}
        swipeEnabled={false}
      />
    </ScrollView>
  );
};

export const Tabs = {
  Container: forwardRef(Container),
  // @ts-ignore to stop the warning about Fragment under development
  Tab: (__DEV__ ? ({ children }) => <>{children}</> : Fragment) as FC<TabProps>,
  FlatList,
  ScrollView,
  SectionList,
};

export * from './types';
