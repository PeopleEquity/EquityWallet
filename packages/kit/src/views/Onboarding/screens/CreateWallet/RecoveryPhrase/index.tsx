import { useCallback, useMemo } from 'react';

import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { useIntl } from 'react-intl';

import { Box, Icon, Text } from '@onekeyhq/components';

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

const getListItemLeadingColor = (type: string) => {
  if (type === 'critical')
    return {
      bgColor: 'surface-critical-default',
      iconColor: 'icon-critical',
    } as const;
  if (type === 'warning')
    return {
      bgColor: 'surface-warning-default',
      iconColor: 'icon-warning',
    } as const;

  return {
    bgColor: 'decorative-surface-one',
    iconColor: 'decorative-icon-one',
  } as const;
};

const RecoveryPhrase = () => {
  const intl = useIntl();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { mnemonic } = route.params;

  const onPressShowPhraseButton = useCallback(() => {
    navigation.replace(EOnboardingRoutes.ShowRecoveryPhrase, route.params);
  }, [navigation, route.params]);
  const onPressSavedPhrase = useCallback(() => {
    navigation.replace(EOnboardingRoutes.BehindTheScene, {
      ...route.params,
      type: 'phrase',
    });
  }, [navigation, route.params]);

  const lists = useMemo(
    () =>
      [
        {
          before: '⭕',
          type: 'decorative',
          icon: 'LockClosedOutline',
          para: intl.formatMessage({ id: 'modal__attention_phrase_1' }),
        },
        {
          before: '🔔',
          type: 'decorative',
          icon: 'DotsCircleHorizontalOutline',
          para: intl.formatMessage({ id: 'modal__attention_phrase_2' }),
        },
        {
          before: '🔴',
          type: 'warning',
          icon: 'ShieldCheckOutline',
          para: intl.formatMessage({
            id: 'modal__attention_phrase_3',
          }),
        },
        {
          before: '🚫️',
          type: 'critical',
          icon: 'EyeSlashOutline',
          para: intl.formatMessage({ id: 'modal__attention_phrase_4' }),
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
          mnemonic={mnemonic}
          onPressShowPhraseButton={onPressShowPhraseButton}
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
              /* bgColor={getListItemLeadingColor(item.type)?.bgColor} */
              alignSelf="flex-start"
            >
              {/* <Icon
                name={item.icon}
                color={getListItemLeadingColor(item.type)?.iconColor}
                size={20}
              /> */}
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

export default RecoveryPhrase;
