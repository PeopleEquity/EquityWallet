import type { FC } from 'react';
import { useState } from 'react';

import { useIntl } from 'react-intl';

import {
  Button,
  Center,
  Hidden,
  PresenceTransition,
  Text,
  useIsVerticalLayout,
} from '@onekeyhq/components';

import PhraseSheet from '../PhraseSheet';

type SecondaryContentProps = {
  onPressSavedPhrase?: () => void;
};

const defaultProps = {} as const;

const SecondaryContent: FC<SecondaryContentProps> = ({
  onPressSavedPhrase,
}) => {
  const intl = useIntl();
  const isVerticalLayout = useIsVerticalLayout();

  return (
    <Center flex={{ sm: 1 }} mt="auto">
      <Hidden from="base" till="sm">
        <Text typography="Body2" mb={4} textAlign="center">
          {intl.formatMessage({
            id: 'content__read_information_on_the_left',
          })}
        </Text>
      </Hidden>
      <Button
          type="primary"
          size={isVerticalLayout ? 'xl' : 'base'}
          alignSelf={isVerticalLayout ? 'stretch' : 'auto'}
          onPress={onPressSavedPhrase}
      >
        {intl.formatMessage({
          id: 'action__show_set_serect_password',
        })}
      </Button>
    </Center>
  );
};

SecondaryContent.defaultProps = defaultProps;

export default SecondaryContent;
