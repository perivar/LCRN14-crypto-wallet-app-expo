import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

interface IIconTextButton {
  label: string;
  icon: ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
  onPress(): void;
}

const IconTextButton = ({
  label,
  icon,
  containerStyle,
  onPress,
}: IIconTextButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        },
        containerStyle,
      ]}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ height: 20, width: 20 }}
      />
      <Text style={{ marginLeft: SIZES.base, ...FONTS.h3 }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default IconTextButton;
