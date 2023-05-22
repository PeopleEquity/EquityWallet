import type { FC } from 'react';

import { Row } from 'native-base';
import { useIntl } from 'react-intl';

import { Box, Icon, Select, Text } from '@onekeyhq/components';

type Props = {
  title?: string;
  onChange: (date: number) => void;
};
const DateSelector: FC<Props> = ({ title, onChange }) => {
  const intl = useIntl();

  const options = [
    {
      title: '1M',
      label: '1M',
      value: 0,
    },
    {
      title: '3M',
      label: '3M',
      value: 1,
    },
    {
      title: '6M',
      label: '6M',
      value: 2,
    },
    {
      title: '1Y',
      label: '1Y',
      value: 3,
    },
    {
      title: 'ALL',
      label: 'ALL',
      value: 4,
    },
  ];

  return (
    <Box m="-8px">
      <Select
        title={intl.formatMessage({ id: 'content__duration' })}
        dropdownPosition="left"
        headerShown={false}
        options={options}
        isTriggerPlain
        footer={null}
        activatable={false}
        onChange={onChange}
        renderTrigger={({ isHovered, isPressed }) => (
          <Row
            alignItems="center"
            p="8px"
            bgColor={
              // eslint-disable-next-line no-nested-ternary
              isPressed
                ? 'surface-pressed'
                : isHovered
                ? 'surface-hovered'
                : 'transparent'
            }
            borderRadius="xl"
          >
            <Text color="text-subdued" typography="Body2Strong">
              {title}
            </Text>
            <Box ml="4px">
              <Icon size={20} name="ChevronDownMini" color="icon-subdued" />
            </Box>
          </Row>
        )}
      />
    </Box>
  );
};

export default DateSelector;
