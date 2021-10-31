import React from 'react';
import { Text, View } from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

interface IHeaderBar {
  title: string;
}

const HeaderBar = ({ title }: IHeaderBar) => {
  return (
    <View
      style={{
        height: 100,
        paddingHorizontal: SIZES.radius,
        justifyContent: 'flex-end',
      }}>
      <Text style={{ color: COLORS.white, ...FONTS.largeTitle }}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
