import type { FC, ReactNode } from 'react';

import { Box, Pressable, Text } from '@onekeyhq/components';

const MnemonicCard: FC<{
  mnemonic: string;
}> = ({ mnemonic }) => {
  const words = mnemonic.split(' ').filter(Boolean);
  const halfIndex = words.length / 3;
  const leftCol: ReactNode[] = [];
  const centerCol: ReactNode[] = [];
  const rightCol: ReactNode[] = [];
  words.forEach((word, i) => {
    const wordComp = (
      <Box key={i} flexDirection="row" my={2}>
        <Text
          typography={{
            sm: 'Body1Strong',
            md: 'Body2Strong',
          }}
          color="text-subdued"
          w="8"
        >
          {i + 1}.
        </Text>
        <Text
          typography={{
            sm: 'Body1Strong',
            md: 'Body2Strong',
          }}
          color="text-default"
        >
          {word}
        </Text>
      </Box>
    );
    if (i < halfIndex) {
      leftCol.push(wordComp);
    } else if (i >= 2 * halfIndex) {
      rightCol.push(wordComp);
    } else {
      centerCol.push(wordComp);
    }
  });
  return (
    <Pressable
      px={4}
      py={{ base: 2, md: 2.5 }}
      bg="background-pressed"
      borderColor="background-border"
      borderRadius="12"
      borderWidth='1px'
      flexDirection="row"
    >
      <Box flex={1}>{leftCol}</Box>
      <Box flex={1}>{centerCol}</Box>
      <Box flex={1}>{rightCol}</Box>
    </Pressable>
  );
};

export default MnemonicCard;
