import { View, StatusBar, SafeAreaView, Text, StyleSheet, Platform, TextInput, TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import { Theme } from "../Components/Theme";


export function ResetPassword({ navigation }) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View>
                <View>
                    <Feather name="lock" size={100} style={{borderWidth: 7, padding: 30, borderRadius: 85, alignSelf: 'center'}}/>
                </View>
                <View style={styles.Text}>
                <Text style={{fontFamily: Theme.fonts.text600, fontSize: 20, paddingVertical: 20}}>Trouble with logging in?</Text>
                <Text style={{fontFamily: Theme.fonts.text300, paddingBottom: 10}}>Enter your username or email address and we'll
                    send you a link to get back into your account.
                </Text>
                </View>
                <View style={styles.textInput}>
                <TextInput placeholder="Username or email"/>
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("HomePage")}>
                    <Text style={{fontFamily: Theme.fonts.text200, color: 'white'}}>Next</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate("SignIn")}>
                    <Text style={{textAlign: 'center', fontFamily: Theme.fonts.text900, color: Theme.colors.blueMedium, 
                fontSize: 17}}>Back to login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        padding: 20,
        justifyContent: 'space-between'
    },
    btn: {
        borderWidth: 1,
        padding: 17,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: Theme.colors.blueMedium,
        borderColor: Theme.colors.blueMedium
    },
    Text: {
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        padding: 17,
        borderRadius: 8,
        marginBottom: 20,
        
    }
})