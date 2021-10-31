import React from 'react';
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { HeaderBar } from '../components';
import { COLORS, dummyData, FONTS, icons, SIZES } from '../constants';
import MainLayout from './MainLayout';

interface ISectionTitle {
  title: string;
}

const SectionTitle = ({ title }: ISectionTitle) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}>
      <Text style={{ color: COLORS.lightGray3, ...FONTS.h4 }}>{title}</Text>
    </View>
  );
};

interface ISetting {
  title: string;
  value: any;
  type: string;
  onPress: any;
}

const Setting = ({ title, value, type, onPress }: ISetting) => {
  if (type === 'button') {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 58,
          alignItems: 'center',
        }}
        onPress={onPress}>
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
          {title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginRight: SIZES.radius,
              color: COLORS.lightGray3,
              ...FONTS.h3,
            }}>
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
        }}>
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
          {title}
        </Text>

        <Switch value={value} onValueChange={val => onPress(val)} />
      </View>
    );
  }
};

const Profile = () => {
  const [faceId, setFaceId] = React.useState(true);

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black,
        }}>
        {/* Header */}
        <HeaderBar title="Profile" />

        {/* Details */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          indicatorStyle={'white'}>
          {/* Email & User Id */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
            }}>
            {/* Email and ID */}
            <View
              style={{
                flex: 1,
              }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {dummyData.profile.email}
              </Text>
              <Text style={{ color: COLORS.lightGray3, ...FONTS.body4 }}>
                ID: {dummyData.profile.id}
              </Text>
            </View>

            {/* Status */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={icons.verified}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  color: COLORS.lightGreen,
                  ...FONTS.body4,
                }}>
                Verified
              </Text>
            </View>
          </View>

          {/* APP */}
          <SectionTitle title="APP" />

          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log('Pressed Launch Screen')}
          />

          <Setting
            title="Appearance"
            value="Dark"
            type="button"
            onPress={() => console.log('Pressed Appearance')}
          />

          {/* ACCOUNT */}
          <SectionTitle title="ACCOUNT" />

          <Setting
            title="Payment Currency"
            value="USD"
            type="button"
            onPress={() => console.log('Pressed Payment Currency')}
          />

          <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log('Pressed Language')}
          />

          {/* SECURITY */}
          <SectionTitle title="SECURITY" />

          <Setting
            title="FaceID"
            value={faceId}
            type="switch"
            onPress={(value: boolean) => setFaceId(value)}
          />

          <Setting
            title="Password Settings"
            value=""
            type="button"
            onPress={() => console.log('Pressed Password')}
          />

          <Setting
            title="Change Settings"
            value=""
            type="button"
            onPress={() => console.log('Pressed Change Password')}
          />

          <Setting
            title="2-Factor Authentication"
            value=""
            type="button"
            onPress={() => console.log('Pressed 2FA')}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
