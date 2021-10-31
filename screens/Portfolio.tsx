import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BalanceInfo, Chart } from '../components';
import { COLORS, dummyData, FONTS, icons, SIZES } from '../constants';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { getHoldings } from '../stores/market/marketActions';
import MainLayout from './MainLayout';

const Portfolio = () => {
  const dispatch = useAppDispatch();
  const { marketReducer } = useAppSelector(state => state);
  const { myHoldings } = marketReducer;
  const [selectedCoin, setSelectedCoin] = useState(null);

  // PIN: using useFocusEffect instead of useEffect to force reload when the page get focus
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getHoldings(dummyData.holdings));
    }, [])
  );

  let totalWallet = myHoldings?.reduce((a, b) => a + (b.total || 0), 0);

  let valueChange = myHoldings?.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  const renderCurrentBalanceSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        <Text
          style={{ marginTop: 50, color: COLORS.white, ...FONTS.largeTitle }}>
          Portfolio
        </Text>

        <BalanceInfo
          title="Current Balance"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    );
  };

  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header */}

        {renderCurrentBalanceSection()}

        {/* Chart */}
        <Chart
          containerStyle={{ marginTop: SIZES.radius }}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.value
              : myHoldings && myHoldings[0]?.sparkline_in_7d?.value
          }
        />

        {/* Your assets */}
        <FlatList
          data={myHoldings}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View>
              {/* Section Title */}
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                Your Assets
              </Text>

              {/* Header Label */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.radius,
                }}>
                <Text style={{ flex: 1, color: COLORS.lightGray3 }}>Asset</Text>

                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Price
                </Text>

                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            const priceColor =
              item.price_change_percentage_7d_in_currency === 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <TouchableOpacity
                onPress={() => setSelectedCoin(item)}
                style={{
                  flexDirection: 'row',
                  height: 55,
                }}>
                {/* Asset */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />

                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    {item.name}
                  </Text>
                </View>

                {/* Price */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}>
                    $ {item.current_price.toLocaleString()}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    {item.price_change_percentage_7d_in_currency !== 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{ rotate: '45deg' }]
                              : [{ rotate: '140deg' }],
                        }}
                      />
                    )}
                    <Text
                      style={{
                        marginLeft: 4,
                        color: priceColor,
                        ...FONTS.h3,
                      }}>
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>

                {/* Holdings */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}>
                    $ {item.total.toLocaleString()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

export default Portfolio;
