import { View, SafeAreaView, Text, StatusBar, StyleSheet, Platform, TouchableOpacity, TextInput } from "react-native";
import { Theme } from "../Components/Theme";

export function UsernameScreen() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View>
                <Text style={{fontSize: 30, fontFamily: Theme.fonts.text900, 
                    alignSelf: 'center', paddingBottom: 20}}>Username</Text>
                <View style={styles.NameChange}>
                <TextInput placeholder="Nonso_123"/>
                </View>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.Text}>Change</Text>
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
    NameChange: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 15
    },
    btn: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 17,
        alignItems: 'center',
        backgroundColor: Theme.colors.blueMedium,
        borderColor: Theme.colors.blueMedium,
    },
    Text: {
        fontFamily: Theme.fonts.text200,
        color: 'white',
    }
})