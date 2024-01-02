import { View, Text, StyleSheet, StatusBar, SafeAreaView, Platform, TouchableOpacity, TextInput } from "react-native";
import { Image } from "react-native";
import { Theme } from "../Components/Theme";
export function SignUp({ navigation }) {
    return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
            {/* <Image source={require("../../assets/")}/> */}
            <Text style={{fontSize: 50, fontWeight: '900', fontFamily: Theme.fonts.text900}}>SignUp</Text>
            <Image source={require("../../assets/signuplogo2.png")} style={{width: 400, height: 300, alignSelf: 'center'}}/>
            <View>
                <View style={styles.TextInput}>
                    <TextInput placeholder="Username"/>
                </View>
                <View style={styles.TextInput}>
                <TextInput placeholder="Email/Phone"/>
                </View>
                <View style={styles.TextInput}>
                <TextInput placeholder="Password"/>
                </View>
                <View style={styles.TextInput}>
                    <TextInput placeholder="Comfirm Password"/>
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("HomePage")} >
                    <Text style={{color: 'white', fontFamily: Theme.fonts.text200}}>Continue</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text style={{fontFamily: Theme.fonts.text200}}>Already have an account? </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("SignIn")}>
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