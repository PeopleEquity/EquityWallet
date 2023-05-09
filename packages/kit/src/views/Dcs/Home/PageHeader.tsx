import {
  Box,
  HStack,
  Text,
} from '@onekeyhq/components';
const PageHeader = () => {
  return (
    <HStack
      height={{ base: '56px', md: '64px' }}
      alignItems="center"
      pl={{ base: '16px', md: '32px' }}
      pr={{ base: '10px', md: '32px' }}
    >
      {/* Left */}
      <HStack flex={1} alignItems="center">
        <Text typography={{ sm: 'PageHeading', md: 'Heading' }}>DCS</Text>
      </HStack>
      {/* Right */}
      <Box />
    </HStack>
  );
};

export default PageHeader;
