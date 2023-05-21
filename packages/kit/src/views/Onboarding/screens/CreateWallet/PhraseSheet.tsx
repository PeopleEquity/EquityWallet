import type { FC } from 'react';
import { useCallback } from 'react';

import { useIntl } from 'react-intl';

import {
  Box,
  Button,
  MnemonicCard, Pressable,
  Text, ToastManager,
  useIsVerticalLayout,
} from '@onekeyhq/components';

import { wait } from '../../../../utils/helper';

import type { IBoxProps } from 'native-base';
import {copyToClipboard} from "@onekeyhq/components/src/utils/ClipboardUtils";
import {formatMessage} from "@onekeyhq/components/src/Provider";
import Icon from "@onekeyhq/components/src/Icon";

type PhraseSheetProps = {
  onPressSavedPhrase?: () => void;
  mnemonic: string;
} & IBoxProps;

const copyMnemonicToClipboard = (text?: string) => {
  if (!text) return;
  copyToClipboard(text);
  ToastManager.show({ title: formatMessage({ id: 'msg__copied' }) });
};

const PhraseSheet: FC<PhraseSheetProps> = ({
  onPressSavedPhrase,
  mnemonic,
  ...rest
}) => {
  const intl = useIntl();
  const isVerticalLayout = useIsVerticalLayout();

  const onPressSavedPhrasePromise = useCallback(async () => {
    onPressSavedPhrase?.();
    await wait(3000);
  }, [onPressSavedPhrase]);

  return (
    <Box alignSelf="stretch" flex={1} {...rest}>
      <Text typography="Body2" color="text-default" textAlign="left" mb={4}>
        {intl.formatMessage({ id: 'content__save_phrase_securely' })}
      </Text>
      <Box flex={1} mb={8}>
        <MnemonicCard mnemonic={mnemonic} />
        <Box
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            mt={3}
        >
          <Box mr={1}>
            <Icon name="CopyMini"/>
          </Box>
          <Text
              typography="Body2"
              color="text-highlight"
              textAlign="center"
              fontSize={'14px'}
              onPress={() => {
                copyMnemonicToClipboard(mnemonic);
              }}
          >
            {intl.formatMessage({ id: 'action__copy' })}
          </Text>
        </Box>
      </Box>
      <Button
        type="primary"
        size={isVerticalLayout ? 'xl' : 'base'}
        onPromise={onPressSavedPhrasePromise}
      >
        {intl.formatMessage({ id: 'action__i_have_saved_the_phrase' })}
      </Button>
    </Box>
  );
};

export default PhraseSheet;
