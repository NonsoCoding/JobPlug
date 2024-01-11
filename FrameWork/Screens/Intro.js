import { StyleSheet, View, Text, SafeAreaView, Button, Platform, StatusBar, ImageBackground, TouchableOpacity, Image } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { Theme } from "../Components/Theme";
export function FirstScreen({navigation}) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <Image source={require("../../assets/applogo.png")} style={{width: 100, height: 100}} />
          <View>
          <Image source={require("../../assets/Interview.png")} style={{width: '100%', height: 250, marginTop: 70}} />
          <Text style={{fontFamily: Theme.fonts.text200, color: 'black', fontSize: 30}}>Welcome to JobPlug, Choose a job
           you love, and you will never have to work a day in your life. </Text>
          </View>
          <View>
          <TouchableOpacity style={styles.appBTN} onPress={()=> navigation.navigate("SignUp")}>
            <Text style={{ fontSize: 16, color: 'white', fontFamily: Theme.fonts.text200}}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.appBTN, { backgroundColor: 'white' }]} onPress={()=> navigation.navigate("SignIn", {metaData:"Chukwunonso obi"})}>
            <Text style={{fontSize: 16, color: Theme.colors.blueMedium, fontFamily: Theme.fonts.text200}}>Sign In</Text>
          </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        padding: 20,
        justifyContent: 'space-between',
    },
    appBTN:{
      borderWidth: 1,
      borderColor: Theme.colors.blueMedium,
      padding: 10,
      marginVertical: 5,
      alignItems: 'center',
      borderRadius: 40,
      backgroundColor: Theme.colors.blueMedium,
    }

})
