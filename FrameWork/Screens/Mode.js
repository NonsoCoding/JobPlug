import { View, SafeAreaView, Text, StatusBar, StyleSheet, Platform, TouchableOpacity, TextInput, Touchable, Switch } from "react-native";
import { Theme } from "../Components/Theme";

export function Mode() {

    // const [colorScheme, toggleColorScheme] = usest

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={{fontFamily: Theme.fonts.text900, fontSize: 30}}>Settings</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{fontFamily: Theme.fonts.text300, fontSize: 18}}>Mode</Text>
                    <Switch style={{alignSelf: 'flex-end'}}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        padding: 20,
    },
})