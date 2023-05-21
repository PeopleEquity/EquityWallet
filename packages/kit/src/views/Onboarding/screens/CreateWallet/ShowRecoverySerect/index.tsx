import { useCallback, useState, useRef, useEffect } from 'react';

import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { useIntl } from 'react-intl';
import { TextInput, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider';

import Layout from '../../../Layout';
import { EOnboardingRoutes } from '../../../routes/enums';

import type { IOnboardingRoutesParams } from '../../../routes/types';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import {Box, Button, Text, useIsVerticalLayout} from "@onekeyhq/components";
import {wait} from "../../../../../utils/helper";

const styles = StyleSheet.create({
  textInput: {
    height: 120,
    marginBottom: 24,
    wordBreak: 'break-all'
  }
});

type NavigationProps = StackNavigationProp<
  IOnboardingRoutesParams,
  EOnboardingRoutes.ShowRecoverySerect
>;
type RouteProps = RouteProp<
  IOnboardingRoutesParams,
  EOnboardingRoutes.ShowRecoverySerect
>;

const ShowRecoverySerect = () => {
  const intl = useIntl();
  const isVerticalLayout = useIsVerticalLayout();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const [step, setStep] = useState(0);
  const { serect } = route.params;

  const [value, setValue] = useState(serect);
  const [newValue, setNewValue] = useState(serect);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorPosition2, setCursorPosition2] = useState(0);
  const textRef = useRef(null);
  const text2Ref = useRef(null);

  const onPressSavedSerect = useCallback(async() => {
    navigation.replace(EOnboardingRoutes.BehindTheScene, {
      ...route.params,
      mnemonic: value,
      type: 'serect'
    });
    await wait(3000);
  }, [navigation, route.params, value, newValue]);

  return (
    <Layout
      title={
        step === 0 ?
            intl.formatMessage({ id: 'content__modify_your_ciphertext_password' }) :
            intl.formatMessage({ id: 'content__verify_your_ciphertext_password' })
      }
      description={
        step === 0 ?
            intl.formatMessage({
              id: 'content__modify_your_ciphertext_password_desc',
            }) :
            intl.formatMessage({
              id: 'content__verify_your_ciphertext_password_desc',
            })
      }
      fullHeight
      secondaryContent={
        step === 0 ?
            <Box alignSelf="stretch" flex={1}>
              <Box flex={1} mb={8}>
                <Box p={4} borderWidth={'1px'} borderColor={'#E7E8F3'} borderRadius={'16px'}>
                  <TextInput
                      ref={textRef}
                      style={styles.textInput}
                      multiline
                      maxLength={2048}
                      value={value}
                      onChangeText={(text) => setValue(text)}
                      onSelectionChange={(event) => {
                        setCursorPosition(event.nativeEvent.selection.start)
                      }}
                  />
                  <Box height={'1px'} bg={'#E7E8F3'} />
                  <Box
                      my={2}
                      style={{zoom: 0.83}}
                      textAlign={'right'}
                      justifyContent={'space-between'}
                      flexDirection={'row'}
                  >
                    <Text color={'#8E8E93'}>Cursor position: {cursorPosition}</Text>
                    <Text color={'#8E8E93'}>{`${value.length}/2048`}</Text>
                  </Box>
                  {
                    isVerticalLayout ?
                        <Slider
                            minimumValue={0}
                            maximumValue={value.length}
                            value={cursorPosition}
                            thumbTintColor={'#ffffff'}
                            thumbStyle={{
                              boxShadow: '0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12)'
                            }}
                            minimumTrackTintColor={'#1355FF'}
                            maximumTrackTintColor={'rgba(120, 120, 128, 0.2)'}
                            onValueChange={(value) => {
                              setCursorPosition(parseInt(value.toString()))
                              textRef?.current?.blur()
                              textRef?.current?.focus()
                              textRef?.current?.setSelectionRange(parseInt(value.toString()), parseInt(value.toString()))
                            }}
                        /> : null
                  }
                </Box>
              </Box>
              <Button
                  type="primary"
                  size={isVerticalLayout ? 'xl' : 'base'}
                  onPress={() => {
                    if (value.length >= 64) {
                      setStep(step + 1)
                    }
                  }}
              >
                {intl.formatMessage({ id: 'action__next' })}
              </Button>
            </Box> :
            <Box alignSelf="stretch" flex={1}>
              <Box flex={1} mb={8}>
                <Box p={4} borderWidth={'1px'} borderColor={'#E7E8F3'} borderRadius={'16px'}>
                  <TextInput
                      ref={text2Ref}
                      style={styles.textInput}
                      multiline
                      maxLength={2048}
                      value={newValue}
                      onChangeText={(text) => setNewValue(text)}
                      onSelectionChange={(event) => setCursorPosition2(event.nativeEvent.selection.start)}
                  />
                  <Box height={'1px'} bg={'#E7E8F3'} />
                  <Box
                      my={2}
                      style={{zoom: 0.83}}
                      textAlign={'right'}
                      justifyContent={'space-between'}
                      flexDirection={'row'}
                  >
                    <Text color={'#8E8E93'}>Cursor position: {cursorPosition2}</Text>
                    <Text color={'#8E8E93'}>{`${newValue.length}/2048`}</Text>
                  </Box>
                  {
                    isVerticalLayout ?
                        <Slider
                            minimumValue={0}
                            maximumValue={newValue.length}
                            value={cursorPosition2}
                            thumbTintColor={'#ffffff'}
                            thumbStyle={{
                              boxShadow: '0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12)'
                            }}
                            minimumTrackTintColor={'#1355FF'}
                            maximumTrackTintColor={'rgba(120, 120, 128, 0.2)'}
                            onValueChange={(value) => {
                              setCursorPosition2(parseInt(value.toString()))
                              text2Ref?.current?.blur()
                              text2Ref?.current?.focus()
                              text2Ref?.current?.setSelectionRange(parseInt(value.toString()), parseInt(value.toString()))
                            }}
                        /> : null
                  }
                </Box>
              </Box>
              <Button
                  type="primary"
                  size={isVerticalLayout ? 'xl' : 'base'}
                  onPromise={async() => {
                    if (value === newValue) {
                      await onPressSavedSerect()
                    }
                  }}
              >
                {intl.formatMessage({ id: 'action__generate_your_wallet' })}
              </Button>
            </Box>
      }
    />
  );
};

export default ShowRecoverySerect;
