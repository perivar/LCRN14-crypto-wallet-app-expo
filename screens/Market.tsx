import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Animated, FlatList, Image, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { HeaderBar, TextButton } from '../components';
import { COLORS, constants, FONTS, icons, SIZES } from '../constants';
import { useAppSelector } from '../stores/hooks';
import { getCoinMarket } from '../stores/market/marketActions';
import MainLayout from './MainLayout';

const marketTabs = constants.marketTabs.map(marketTab => ({
  ...marketTab,
  ref: React.createRef<View>(),
}));

type Measure = {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface ITabIndicator {
  measureLayout: Measure[];
  scrollX: Animated.Value;
}

const TabIndicator = ({ measureLayout, scrollX }: ITabIndicator) => {
  const inputRange = marketTabs?.map((_, i) => i * SIZES.width);

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: -40, // PIN: why do I need to offset this?
        height: '100%',
        width: (SIZES.width - SIZES.radius * 2) / 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

interface ITabs {
  scrollX: Animated.Value;
  onMarketTabPress(marketTabIndex: number): void;
}

// https://stackoverflow.com/questions/67166655/react-native-ref-measurelayout
const Tabs = ({ scrollX, onMarketTabPress }: ITabs) => {
  const [measureLayout, setMeasureLayout] = React.useState<Measure[]>([]);
  const containerRef = React.useRef();

  React.useEffect(() => {
    let m: Measure[] = [];

    marketTabs.forEach(marketTab => {
      marketTab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === marketTabs.length) {
            setMeasureLayout(m);
          }
        },
        () => console.log('measureLayout failed')
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {/* Tabs */}
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${index}`}
            style={
              {
                // flex: 1,
              }
            }
            onPress={() => onMarketTabPress(index)}>
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Market = () => {
  const { marketReducer } = useAppSelector(state => state);
  const { coins } = marketReducer;

  const scrollX = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  const marketTabScrollViewRef = React.useRef<FlatList>();

  const onMarketTabPress = React.useCallback(
    (marketTabIndex: number) => {
      marketTabScrollViewRef?.current?.scrollToOffset({
        offset: marketTabIndex * SIZES.width,
      });
    },
    [marketTabScrollViewRef.current]
  );

  // PIN: using useFocusEffect instead of useEffect to force reload when the page get focus
  useFocusEffect(
    React.useCallback(() => {
      getCoinMarket();
    }, [])
  );

  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}>
        <Tabs scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}>
        <TextButton label="USD" onPress={() => console.log('Market USD')} />

        <TextButton
          label="% (7d)"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
          onPress={() => console.log('Market 7d')}
        />

        <TextButton
          label="Top"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
          onPress={() => console.log('Market Top')}
        />
      </View>
    );
  }

  function renderList() {
    return (
      <Animated.FlatList
        ref={marketTabScrollViewRef}
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        // we are not using the flat-list data for renderItem
        renderItem={() => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}>
              <FlatList
                data={coins}
                keyExtractor={itemKey => itemKey.id}
                renderItem={({ item, index }) => {
                  const priceColor =
                    item.price_change_percentage_7d_in_currency === 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;

                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
                      }}>
                      {/* Coins */}
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.h3,
                          }}>
                          {item.name}
                        </Text>
                      </View>

                      {/* Line Chart */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                        }}>
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            labels: [],
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>

                      {/* Figures */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.h4,
                          }}>
                          $ {item.current_price.toLocaleString()}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}>
                          {item.price_change_percentage_7d_in_currency !==
                            0 && (
                            <Image
                              source={icons.upArrow}
                              style={{
                                height: 10,
                                width: 10,
                                tintColor: priceColor,
                                transform:
                                  item.price_change_percentage_7d_in_currency >
                                  0
                                    ? [{ rotate: '45deg' }]
                                    : [{ rotate: '140deg' }],
                              }}
                            />
                          )}
                          <Text
                            style={{
                              marginLeft: 5,
                              color: priceColor,
                              ...FONTS.body5,
                            }}>
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  }

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        {/* Header */}
        <HeaderBar title="Market" />

        {/* Tab Bar */}
        {renderTabBar()}

        {/* Buttons */}
        {renderButtons()}

        {/* Market List */}
        {renderList()}
      </View>
    </MainLayout>
  );
};

export default Market;
