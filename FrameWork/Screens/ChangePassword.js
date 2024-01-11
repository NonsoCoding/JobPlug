import { View, StyleSheet, SafeAreaView, Text, StatusBar, Platform, TextInput, TouchableOpacity } from "react-native";
import { Theme } from "../Components/Theme";

export function ChangePassword() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.ChangeP}>
                <Text style={{fontSize: 30, fontFamily: Theme.fonts.text900, paddingBottom: 20}}>Change Password</Text>
                <Text style={styles.Text}>You'll be logged out of all sessions except this 
                    one to protect your account if anyone is trying to gain access.
                </Text>
                <Text style={styles.Text}>Your password must be at least six characters and should
                    include a combination of numbers, letters and special characters
                    (!$@%).</Text>
                <View>
                    <TextInput placeholder="Current password" style={styles.TextInput}/>
                </View>
                <View>
                    <TextInput placeholder="New password" style={styles.TextInput}/>
                </View>
                <View>
                    <TextInput placeholder="Retype new password" style={styles.TextInput}/>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgottenPass}>Forgotten your passwoord?</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{color: 'white', fontFamily: Theme.fonts.text200}}>Change password</Text>
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
    TextInput: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 15,
        marginBottom: 9
    },
    ChangeP: {
        justifyContent: 'center'
    },
    Text: {
        paddingBottom: 20,
        fontSize: 15,
        fontFamily: Theme.fonts.text300
    },
    forgottenPass: {
        color: Theme.colors.blueMedium,
        fontFamily: Theme.fonts.text500
    },
    btn: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 17,
        alignItems: 'center',
        backgroundColor: Theme.colors.blueMedium,
        borderColor: Theme.colors.blueMedium
    }
})