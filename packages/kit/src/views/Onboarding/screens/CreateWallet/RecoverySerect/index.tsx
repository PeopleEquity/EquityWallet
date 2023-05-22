import { useCallback, useMemo } from 'react';

import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { useIntl } from 'react-intl';

import { Box, Text } from '@onekeyhq/components';

import Layout from '../../../Layout';
import { EOnboardingRoutes } from '../../../routes/enums';

import SecondaryContent from './SecondaryContent';

import type { IOnboardingRoutesParams } from '../../../routes/types';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type NavigationProps = StackNavigationProp<
  IOnboardingRoutesParams,
  EOnboardingRoutes.RecoveryPhrase
>;
type RouteProps = RouteProp<
  IOnboardingRoutesParams,
  EOnboardingRoutes.RecoveryPhrase
>;

const RecoverySerect = () => {
  const intl = useIntl();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  const onPressSavedPhrase = useCallback(() => {
    navigation.replace(EOnboardingRoutes.SetSecretPassword, route.params);
  }, [navigation, route.params]);

  const lists = useMemo(
    () =>
      [
        {
          before: '⭕',
          type: 'decorative',
          icon: 'LockClosedOutline',
          para: intl.formatMessage({ id: 'modal__attention_unlock' }),
        },
        {
          before: '🔔',
          type: 'decorative',
          icon: 'DotsCircleHorizontalOutline',
          para: intl.formatMessage({ id: 'content__recovery_phrase_restore' }),
        },
        {
          before: '🔴',
          type: 'warning',
          icon: 'ShieldCheckOutline',
          para: intl.formatMessage({
            id: 'backup__manual_backup_warning_never_ask',
          }),
        },
        {
          before: '🚫️',
          type: 'critical',
          icon: 'EyeSlashOutline',
          para: intl.formatMessage({ id: 'modal__attention_shh' }),
        },
      ] as const,
    [intl],
  );

  return (
    <Layout
      title={intl.formatMessage({ id: 'title__recovery_phrase' })}
      description={intl.formatMessage({ id: 'title__recovery_phrase_desc' })}
      secondaryContent={
        <SecondaryContent
          onPressSavedPhrase={onPressSavedPhrase}
        />
      }
      fullHeight
    >
      <Box my={-3} mt={{ base: 4, sm: 0 }}>
        {lists.map((item, index) => (
          <Box key={index} flexDir="row" alignItems="center" py={3}>
            <Box
              mr={1.5}
              rounded="full"
              alignSelf="flex-start"
            >
              {item.before}
            </Box>
            <Text flex={1} typography="Body2">
              {item.para}
            </Text>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default RecoverySerect;
