import { View, Text, StyleSheet, StatusBar, SafeAreaView, Platform, TouchableOpacity, TextInput, Touchable } from "react-native";
import { Image } from "react-native";
import { Theme } from "../Components/Theme";
export function SignIn({ navigation }) {
    return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
            {/* <Image source={require("../../assets/")}/> */}
            <Text style={{fontSize: 50, fontWeight: '900', fontFamily: Theme.fonts.text900}}>Sign In</Text>
            <Image source={require("../../assets/signinlogo.png")} style={{width: 400, height: 300, alignSelf: 'center'}}/>
            <View>
                <View style={styles.TextInput}>
                <TextInput placeholder="Email/Phone"/>
                </View>
                <View style={styles.TextInput}>
                <TextInput placeholder="Password"/>
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("HomePage")} >
                    <Text style={{color: 'white', fontFamily: Theme.fonts.text200}}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate("Reset password")}>
                <Text style={{paddingVertical: 10, fontFamily: Theme.fonts.text600}}>Forgotten password?</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontFamily: Theme.fonts.text200}}>Don't have an account? </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("SignUp")}>
                        <Text style={{color: Theme.colors.blueMedium, fontFamily: Theme.fonts.text600}}> Click here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
        padding: 20,
        justifyContent: 'space-between'
    },
    TextInput: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginBottom: 20
    },
    btn : {
        borderWidth: 1,
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        backgroundColor: Theme.colors.blueMedium,
        borderColor: Theme.colors.blueMedium,
    }
})