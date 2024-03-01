import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView, Alert ,BackHandler} from 'react-native';
import styles from "./style";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";




function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    function handleSubmit() {
        // console.log(email, password);
        const userData = {
            email, password
        }
        axios.post("http://192.168.1.131:8000/login", userData)
            .then(res => {
                // console.log(res.data)
                if (res.data.status == 'ok') {
                    Alert.alert("login successfull!!!")
                    AsyncStorage.setItem("token", res.data.data)
                    AsyncStorage.setItem("isLoggedIn", JSON.stringify(true))
                    navigation.navigate('Home')
                }
            })
            .catch(error => console.error('Error:', error))
    }
    const handleBackPress = () => {
        Alert.alert('Exit App', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };
    
      useFocusEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    
        return ()=>{
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
        }
    
      })
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }} keyboardShouldPersistTaps="always">
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../images/appIcon.png')} style={styles.logo} />
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.text_header}>Login!!!</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder="Login ID" placeholderTextColor="#A9A9A9" style={styles.textInput} onChange={e => setEmail(e.nativeEvent.text)} />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name='lock' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder="Password" placeholderTextColor="#A9A9A9" style={styles.textInput} onChange={e => setPassword(e.nativeEvent.text)} />
                    </View>
                    <View style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop: 8,
                        marginRight: 10
                    }}>
                        <Text style={{ color: '#6495ed', fontWeight: '700' }}>
                            Forgot Password
                        </Text>
                    </View>

                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
                        <View>
                            <Text style={styles.textSign}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>
                            ----Or continue as----
                        </Text>
                    </View>
                    <View style={[styles.bottomButton, { marginBottom: 205 }]}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <TouchableOpacity style={styles.inBut2}>
                                <FontAwesome
                                    name="user-circle-o"
                                    color="white"
                                    style={styles.smallIcon2}
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Guest</Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                                style={styles.inBut2}
                                onPress={() => {
                                    navigation.navigate('Register');
                                }}>
                                <FontAwesome
                                    name="user-plus"
                                    color="white"
                                    style={[styles.smallIcon2, { fontSize: 30 }]}
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Sign Up</Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                                style={styles.inBut2}
                                onPress={() => alert('Coming Soon')}>
                                <FontAwesome
                                    name="google"
                                    color="white"
                                    style={[styles.smallIcon2, { fontSize: 30 }]}
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Google</Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                                style={styles.inBut2}
                                onPress={() => alert('Coming Soon')}>
                                <FontAwesome
                                    name="facebook-f"
                                    color="white"
                                    style={[styles.smallIcon2, { fontSize: 30 }]}
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Facebook</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Login;

