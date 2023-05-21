import type { FC } from 'react';

import { useIntl } from 'react-intl';

import { Box, Hidden, Icon, Text } from '@onekeyhq/components';

const defaultProps = {} as const;

const SecondaryContent: FC = () => {
  const intl = useIntl();

  return (
    <>
      <Text typography="Body2" mt={{ base: 16, sm: 8 }}>
        {intl.formatMessage({ id: 'content__password_usage' })}
      </Text>
      <Text typography="Body2" mt={4}>
        {intl.formatMessage({
          id: 'content__password_security',
        })}
      </Text>
    </>
  );
};

SecondaryContent.defaultProps = defaultProps;

export default SecondaryContent;
