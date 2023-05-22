import { memo, useEffect, useMemo } from 'react';

import { useNavigation } from '@react-navigation/core';
import { type RouteProp, useRoute } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';
import { useIntl } from 'react-intl';

import { Center, Spinner } from '@onekeyhq/components';

import backgroundApiProxy from '../../../../../background/instance/backgroundApiProxy';
import Protected, {
  ValidationFields,
} from '../../../../../components/Protected';
import { useData } from '../../../../../hooks/redux';
import { wait } from '../../../../../utils/helper';
import Layout from '../../../Layout';
import { EOnboardingRoutes } from '../../../routes/enums';
import { type IOnboardingRoutesParams } from '../../../routes/types';

import SecondaryContent from './SecondaryContent';

type NavigationProps = StackNavigationProp<
  IOnboardingRoutesParams,
  EOnboardingRoutes.SetSecretPassword
>;
type RouteProps = RouteProp<
  IOnboardingRoutesParams,
  EOnboardingRoutes.SetSecretPassword
>;

function RedirectToRecoverySerect({
  serectPassword
}: {
  serectPassword: string;
}) {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  console.log('route.params', route.params)
  useEffect(() => {
    (async function () {
      const serect = await backgroundApiProxy.engine.generateMnemonic();

      // return;
      await wait(600);
      navigation.replace(EOnboardingRoutes.ShowRecoverySerect, {
        ...route.params,
        serect,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center h="full" w="full">
      <Spinner size="lg" />
    </Center>
  );
}

const RedirectToRecoverySerectMemo = memo(RedirectToRecoverySerect);

const SetPassword = () => {
  const intl = useIntl();
  const { isPasswordSet } = useData();
  const route = useRoute<RouteProps>();
  const mnemonic = route.params?.mnemonic;
  const disableAnimation = route?.params?.disableAnimation;

  const title = useMemo(
    () =>
      isPasswordSet
        ? intl.formatMessage({
            id: 'Verify_Password',
          })
        : intl.formatMessage({ id: 'title__set_password' }),
    [intl, isPasswordSet],
  );
  const subTitle = useMemo(
    () =>
      isPasswordSet
        ? intl.formatMessage({
            id: 'Verify_password_to_continue',
          })
        : undefined,
    [intl, isPasswordSet],
  );

  return (
    <Layout
      // make sure Spinner display
      fullHeight
      disableAnimation={disableAnimation}
      title={title}
      subTitle={subTitle}
      secondaryContent={
        isPasswordSet ? <SecondaryContent /> : <SecondaryContent />
      }
    >
      <Protected
        isAutoHeight
        hideTitle
        walletId={null}
        skipSavePassword
        field={ValidationFields.Wallet}
      >
        {(password, { withEnableAuthentication }) => (
          <RedirectToRecoverySerectMemo
            serectPassword={password}
          />
        )}
      </Protected>
    </Layout>
  );
};

export default SetPassword;
