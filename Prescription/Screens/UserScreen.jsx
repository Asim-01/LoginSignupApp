import { StyleSheet, Text, View,Button } from 'react-native';
import React from 'react';

const UserScreen = (props)=>{
    return(
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>This is User Screen</Text>
            {/* <Text style={styles.textStyle}>{props.route.params.msg}</Text> */}
            <Button title='Home' onPress={()=>props.navigation.navigate('Home')}/> 

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
export default UserScreen;