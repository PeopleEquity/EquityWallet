import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { StyleSheet } from 'react-native';
import {Box, Empty} from '@onekeyhq/components';

const DCFiPage: FC = () => {
  const intl = useIntl();
  return (
      <Box py={4} flexDirection="column" alignItems="center">
        <Empty
            title={'Comming Soon'}
        />
      </Box>
  );
};

export default DCFiPage;
