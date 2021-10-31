import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  Text,
  View,
} from 'react-native';

import { COLORS, FONTS } from '../constants';

interface ITabIcon {
  focused: boolean;
  icon: ImageSourcePropType;
  label: string;
  iconStyle?: StyleProp<ImageStyle>;
  isTrade?: boolean;
}

const TabIcon = ({ focused, icon, label, iconStyle, isTrade }: ITabIcon) => {
  if (isTrade) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
          width: 60,
          borderRadius: 30,
          backgroundColor: COLORS.black,
        }}>
        <Image
          resizeMode="contain"
          source={icon}
          style={[
            {
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            },
            iconStyle,
          ]}
        />
        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Trade</Text>
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={[
            {
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.white : COLORS.secondary,
            },
            iconStyle,
          ]}
        />
        <Text
          style={{
            color: focused ? COLORS.white : COLORS.secondary,
            ...FONTS.h4,
          }}>
          {label}
        </Text>
      </View>
    );
  }
};

export default TabIcon;
