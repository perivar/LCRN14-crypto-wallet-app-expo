import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import moment from 'moment';
import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

interface IChart {
  chartPrices: any;
  containerStyle: StyleProp<ViewStyle>;
}

const Chart = ({ chartPrices, containerStyle }: IChart) => {
  // Points
  let startUnixTimestamp = moment().subtract(7, 'day').unix();

  let data = chartPrices
    ? chartPrices?.map((item: any, index: number) => {
        return {
          x: startUnixTimestamp + (index + 1) * 3600,
          y: item,
        };
      })
    : [];

  // Smooth curve
  let points = monotoneCubicInterpolation({ data, range: 50 });

  const formatUSD = (value: string) => {
    'worklet';

    if (value === '') {
      return '';
    }

    return `$${Number(value).toFixed(2)}`;
  };

  const formatDateTime = (value: string | number) => {
    'worklet';

    if (value === '') {
      return '';
    }
    let selectedDate = new Date((value as number) * 1000);

    let date = `0${selectedDate.getDate()}`.slice(-2);
    let month = `0${selectedDate.getMonth() + 1}`.slice(-2);
    return `${date} / ${month}`;
  };

  const formatNumber = (value: number, roundingPoint: number) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1000) {
      return `${(value / 1000).toFixed(roundingPoint)}K`;
    } else {
      return value.toFixed(roundingPoint);
    }
  };

  const getYAxisLabelValues = () => {
    if (chartPrices) {
      let minValue = Math.min(...chartPrices);
      let maxValue = Math.max(...chartPrices);

      let midValue = (minValue + maxValue) / 2;

      let higherMidValue = (maxValue + midValue) / 2;
      let lowerMidValue = (midValue + minValue) / 2;

      let roundingPoint = 2;

      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
      ];
    } else {
      return [];
    }
  };

  return (
    <View style={containerStyle}>
      {/* Y Axis Label */}
      <View
        style={{
          position: 'absolute',
          left: SIZES.padding,
          top: 0,
          bottom: 0,
          justifyContent: 'space-between',
        }}>
        {getYAxisLabelValues().map((item, index) => {
          return (
            <Text key={index} style={{ color: COLORS.white, ...FONTS.body4 }}>
              {item}
            </Text>
          );
        })}
      </View>

      {/* Chart */}
      {data.length > 0 && (
        <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
          <ChartPath
            height={150}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />

          <ChartDot>
            <View
              style={{
                position: 'absolute',
                left: -35,
                width: 80,
                backgroundColor: COLORS.transparentWhite,
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.white,
                }}>
                <View
                  style={{
                    height: 5,
                    width: 5,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGray3,
                  }}
                />
              </View>

              {/* Y-Label */}
              <ChartYLabel
                format={formatUSD}
                style={{ color: COLORS.white, ...FONTS.body5 }}
              />

              {/* X_Label */}
              <ChartXLabel
                format={formatDateTime}
                style={{
                  color: COLORS.white,
                  ...FONTS.body5,
                  marginVertical: 0,
                }}
              />
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Chart;
