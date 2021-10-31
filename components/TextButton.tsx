import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { COLORS, FONTS } from '../constants';

interface ITextButton {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?(): void;
}

const TextButton = ({
  label,
  labelStyle,
  containerStyle,
  onPress,
}: ITextButton) => {
  return (
    <TouchableOpacity
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 3,
          paddingHorizontal: 18,
          borderRadius: 15,
          backgroundColor: COLORS.gray1,
        },
        containerStyle,
      ]}
      onPress={onPress}>
      <Text style={[{ color: COLORS.white, ...FONTS.h3 }, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
