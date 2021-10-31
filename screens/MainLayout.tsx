import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

import { IconTextButton } from '../components';
import { COLORS, icons, SIZES } from '../constants';
import { useAppSelector } from '../stores/hooks';

interface IMainLayout {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayout) => {
  const { isTradeModalVisible } = useAppSelector(state => state.tabReducer);

  const modalAnimatedValue = useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280],
  });

  return (
    <View style={{ flex: 1 }}>
      {children}

      {/* Dim background */}
      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            opacity: modalAnimatedValue,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack,
          }}></Animated.View>
      )}

      {/* Modal */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: modalY,
          width: '100%',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}>
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log('Transfer')}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{ marginTop: SIZES.base }}
          onPress={() => console.log('Withdraw')}
        />
      </Animated.View>
    </View>
  );
};

export default MainLayout;
