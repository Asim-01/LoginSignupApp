import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    smallIcon: {
        marginRight: 10,
        fontSize: 24,
    },

    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: 260,
        width: 260,
        marginTop: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        paddingBottom: 3,
        paddingTop: 14,
        marginTop: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#6495ed',
        borderRadius: 50,

    },
    textInput: {
        flex: 1,
        marginTop: -12,
        color: '#05375a'
    },
    loginContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    header: {
        justifyContent: 'flex-end',
        paddingHorizontal: 20,

    },
    text_header: {
        color: '#05375a',
        fontWeight: 'bold',
        fontSize: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: -20,
        alignItems: 'center',
        textAlign: 'center',
        margin: 20,
    },
    inBut: {
        width: '70%',
        backgroundColor: '#6495ed',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 50
    },
    inBut2: {
        height: 65,
        width: 65,
        backgroundColor: '#6495ed',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    bottomButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    smallIcon2: {
        fontSize: 40,
        // marginRight:10,
    },
    bottomText: {
        color: 'black',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 5,
    }

})

export default styles;