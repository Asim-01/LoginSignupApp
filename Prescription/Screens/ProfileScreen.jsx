import { StyleSheet, Text, View,Button } from 'react-native';
import React from 'react';

const ProfileScreen = (props)=>{
    // console.log(props);
    return(
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}> This is Profile Screen</Text>
            {/* <Text style={styles.textStyle}> {props.route.params.name}</Text> */}
            {/* <Button title='User' onPress={()=>props.navigation.navigate('User',{msg:"poo poo"})}/>  */}
            <Button title='User' onPress={()=>props.navigation.navigate('User')}/> 
        </View>
    );
}
const styles = StyleSheet.create({
    viewStyle:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    textStyle:{
        fontSize:20,
        color:'black',
    },
    headingStyle:{
        fontSize:30,
        color:'black',
        textAlign:'center',
    }
})
export default ProfileScreen;


