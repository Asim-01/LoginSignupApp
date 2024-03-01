import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerList = [
  { icon: 'home-outline', label: 'Home', navigateTo: 'Home' },
  { icon: 'account-multiple', label: 'Profile', navigateTo: 'Profile' },
  { icon: 'account-group', label: 'User', navigateTo: 'User' },
  { icon: 'help', label: 'contact-support', navigateTo: '' },
];

const DrawerLayout = ({ icon, label, navigateTo }) => {
  const navigation = useNavigation();
  return (<DrawerItem
    icon={({ color, size }) => <Icon name={icon} color={color} size={size} />}
    label={label}
    onPress={() => {
      navigation.navigate(navigateTo);
    }}
  />
  );
}

const DrawerItems = props => {
  return DrawerList.map((el, i) => {
    return (
      <DrawerLayout
        key={i}
        icon={el.icon}
        label={el.label}
        navigateTo={el.navigateTo}
      />
    );
  });
};

function DrawerContent(props) {
  const navigation = useNavigation();
  const [usersData, setUsersData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('usersData');
  //       const data = jsonValue != null ? JSON.parse(jsonValue) : null;
  //       setusersData(data);
  //       console.log(data);
  //     } catch (e) {
  //       // Error retrieving data
  //       console.error(e);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('usersData');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUsersData(data);
        console.log(data);
      } catch (e) {
        // Error retrieving data
        console.error(e);
      }
    };

    fetchData();
  }, []);
  function signOut(){
    AsyncStorage.setItem('isLoggedIn','')
    AsyncStorage.setItem('token','')
    navigation.navigate('Login')
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                  source={require('./images/download.png')}
                  size={50}
                  style={{ marginTop: 5 }}
                />
                <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                {usersData && (<Title style={styles.title}>{usersData.name}</Title>)}
                  {usersData && (
                    <Text style={[styles.caption, { color: 'black' }]} numberOfLines={1}>
                      {usersData.email}
                    </Text>
                  )}

                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.drawerSection}>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.drawerSection}>
        <DrawerItem
        onPress={()=>{signOut()}}
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
        />
      </View>

    </View>
  )
}

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    // color: '#6e6e6e',
    width: '100%',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    borderBottomWidth: 0,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#dedede',
    borderTopWidth: 1,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
// {uri:'C:/Users/Asim/Desktop/Project/Prescription/images/download.png'}