import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, Button, Alert } from 'react-native';
import styles from "./style";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from "@react-navigation/native";
import Error from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import * as ImagePicker from 'react-native-image-picker';
// import {ImagePicker,showImagePicker,launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

function Register(props) {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [nameVerify, setNameVerify] = useState(false);
    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneVerify, setPhoneVerify] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [speciality, setSpeciality] = useState('');
    const [specialityVerify, setSpecialityVerify] = useState(false);
    const [degree, setDegree] = useState('');
    const [degreeVerify, setDegreeVerify] = useState(false);
    const [experience, setExperience] = useState('');
    const [experienceVerify, setExperienceVerify] = useState(false);
    // const [image, setImage] = useState(null);

    function handleName(e) {
        const nameVar = e.nativeEvent.text;
        setName(nameVar);
        setNameVerify(false);
        if (nameVar.length > 1) {
            setNameVerify(true)
        }
    }

    function handleEmail(e) {
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        setEmailVerify(false)
        if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
            setEmail(emailVar)
            setEmailVerify(true)
        }
    }

    function handlePhone(e) {
        const phoneVar = e.nativeEvent.text;
        setPhone(phoneVar);
        setPhoneVerify(false);
        if (/[6-9]{1}[0-9]{9}/.test(phoneVar)) {
            setPhone(phoneVar);
            setPhoneVerify(true);
        }
    }

    function handleSpeciality(text) {
        setSpeciality(text);
        setSpecialityVerify(text.length > 1);
    }

    function handleDegree(text) {
        setDegree(text);
        setDegreeVerify(text.length > 1);
    }

    function handleExperience(text) {
        const numericValue = parseFloat(text);
        const isValidNumber = !isNaN(numericValue) && numericValue >= 0;

        setExperience(text);
        setExperienceVerify(isValidNumber);
    }
    // const selectImage = () => {
    //     ImagePicker.showImagePicker({}, response => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             const source = { uri: response.uri };
    //             setImage(source);
    //         }
    //     });
    // };

    function handlePassword(passwordVar) {
        setPassword(passwordVar);
        setPasswordVerify(false);
        if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
            setPasswordVerify(true);
        }
    }
    function handleSubmit() {
        const userData = {
            name,
            email,
            phone,
            speciality,
            degree,
            experience,
            password
        }
        if (nameVerify && emailVerify && phoneVerify && specialityVerify && degreeVerify && experienceVerify && passwordVerify) {
            axios.post('http://192.168.1.131:8000/register', userData)
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === 'ok') {
                        Alert.alert("Registration Successfull!!!")
                        navigation.navigate('Login')
                    }
                    else {
                        Alert.alert(JSON.stringify(res.data))
                    }
                })
                .catch(e => {
                    console.log(e);})
        }else{
            Alert.alert("Fill mandatory fields!!!")
        }


    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }} keyboardShouldPersistTaps="always">
            <View >

                <View style={styles.loginContainer}>
                    <Text style={styles.text_header}>Personal Details!!!</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder="Full Name" placeholderTextColor="#A9A9A9" style={styles.textInput} onChange={e => handleName(e)} />
                        {name.length < 1 ? null : nameVerify ? (
                            <Feather name="check-circle" color="green" size={20} />
                        ) : (<Error name="error" color="red" size={20} />)}
                    </View>
                    {name.length < 1 ? null : nameVerify ? null : (
                        <Text style={{ marginLeft: 20, color: "red" }}>
                            Name should be more than one character</Text>
                    )}
                    <View style={styles.action}>
                        <Fontisto name='email' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder="E-mail" placeholderTextColor="#A9A9A9" style={styles.textInput} onChange={e => handleEmail(e)} />
                        {email.length < 1 ? null : emailVerify ? (
                            <Feather name="check-circle" color="green" size={20} />
                        ) : (<Error name="error" color="red" size={20} />)}
                    </View>
                    {email.length < 1 ? null : emailVerify ? null : (
                        <Text style={{ marginLeft: 20, color: "red" }}>
                            Enter a valid email address</Text>
                    )}
                    <View style={styles.action}>
                        <FontAwesome name='mobile-phone' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder="Phone Number" placeholderTextColor="#A9A9A9" style={styles.textInput} onChange={e => { handlePhone(e) }} />
                        {phone.length < 1 ? null : phoneVerify ? (
                            <Feather name="check-circle" color="green" size={20} />
                        ) : (<Error name="error" color="red" size={20} />)}
                    </View>
                    {phone.length < 1 ? null : phoneVerify ? null : (
                        <Text
                            style={{
                                marginLeft: 20,
                                color: 'red',
                            }}>
                            Phone number with 6-9 and remaing 9 digit with 0-9
                        </Text>
                    )}
                    <View style={styles.action}>
                        <FontAwesome name='stethoscope' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder="Speciality" placeholderTextColor="#A9A9A9" style={styles.textInput} onChange={e => handleSpeciality(e.nativeEvent.text)} />
                        {speciality.length < 1 ? null : specialityVerify ? (
                            <Feather name="check-circle" color="green" size={20} />
                        ) : (
                            <Error name="error" color="red" size={20} />
                        )}

                    </View>
                    {speciality.length < 1 ? null : specialityVerify ? null : (
                        <Text style={{ marginLeft: 20, color: "red" }}>
                            Speciality should be more than one character
                        </Text>
                    )}
                    <View style={styles.action}>
                        <FontAwesome name='lock' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder="Degree" placeholderTextColor="#A9A9A9" style={styles.textInput} onChange={e => handleDegree(e.nativeEvent.text)} />
                        {degree.length < 1 ? null : degreeVerify ? (
                            <Feather name="check-circle" color="green" size={20} />
                        ) : (
                            <Error name="error" color="red" size={20} />
                        )}
                    </View>
                    {degree.length < 1 ? null : degreeVerify ? null : (
                        <Text style={{ marginLeft: 20, color: "red" }}>
                            Degree should be more than one character
                        </Text>
                    )}
                    <View style={styles.action}>
                        <FontAwesome name='history' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder="Experience in Years" placeholderTextColor="#A9A9A9" style={styles.textInput} onChange={e => handleExperience(e.nativeEvent.text)} />
                        {experience.length === 0 ? null : experienceVerify ? (
                            <Feather name="check-circle" color="green" size={20} />
                        ) : (
                            <Error name="error" color="red" size={20} />
                        )}
                    </View>
                    {experience.length === 0 ? null : experienceVerify ? null : (
                        <Text style={{ marginLeft: 20, color: "red" }}>
                            Please enter a valid positive number for experience.
                        </Text>
                    )}
                    <View style={styles.action}>
                        <FontAwesome name='image' color='#420475' style={styles.smallIcon} />
                        <TextInput placeholder="Any ID proof" placeholderTextColor="#A9A9A9" style={styles.textInput} />
                    </View>
                    {/* <View>
                        <Button title="Select Image" onPress={selectImage} />
                        {image && <Image source={image} style={{ width: 200, height: 200 }} />}
                    </View> */}
                    <View style={styles.action}>

                        <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#A9A9A9"
                            style={styles.textInput}
                            onChangeText={handlePassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {password.length < 1 ? null : !showPassword ? (
                                <Feather
                                    name="eye-off"
                                    style={{ marginRight: -10 }}
                                    color={passwordVerify ? 'green' : 'red'}
                                    size={23}
                                />
                            ) : (
                                <Feather
                                    name="eye"
                                    style={{ marginRight: -10 }}
                                    color={passwordVerify ? 'green' : 'red'}
                                    size={23}
                                />
                            )}
                        </TouchableOpacity>

                    </View>
                    {password.length < 1 ? null : passwordVerify ? null : (
                        <Text
                            style={{
                                marginLeft: 20,
                                color: 'red',
                            }}>
                            Uppercase, Lowercase, Number and 6 or more characters.
                        </Text>
                    )}
                </View>
                <View style={[styles.button, { marginTop: 30 }]}>
                    <TouchableOpacity style={styles.inBut} onPress={() => {
                        // navigation.navigate('ClinicDetails');
                        handleSubmit()
                    }}>
                        <View>
                            <Text style={styles.textSign}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Register;
// const [password, setPassword] = useState('');
// const [passwordVerify, setPasswordVerify] = useState(false);
// function handlePassword(e) {
//     const passwordVar = e.nativeEvent.text;
//     setPassword(passwordVar);
//     setPasswordVerify(false);
//     if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
//         setPassword(passwordVar);
//         setPasswordVerify(true);
//     }
// }

{/* <View style={styles.action}>
                        <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#A9A9A9"
                            style={styles.textInput}
                            onChangeText={handlePassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {password.length < 1 ? null : !showPassword ? (
                                <Feather
                                    name="eye-off"
                                    style={{ marginRight: -10 }}
                                    color={passwordVerify ? 'green' : 'red'}
                                    size={23}
                                />
                            ) : (
                                <Feather
                                    name="eye"
                                    style={{ marginRight: -10 }}
                                    color={passwordVerify ? 'green' : 'red'}
                                    size={23}
                                />
                            )}
                        </TouchableOpacity>

                    </View> */}