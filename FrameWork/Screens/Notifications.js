import { View, StyleSheet, SafeAreaView, Text, StatusBar, Platform } from "react-native";
import { Theme } from "../Components/Theme";

export function Notifications() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={{fontSize: 40, fontFamily: Theme.fonts.text900}}>Notifications</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        padding: 20,
    }
}) 