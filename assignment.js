{/* <View>
                <Text style={styles.TextTwo}>The worlds #1 Job search App</Text>
                <TouchableOpacity style={styles.SignUpBtn}>
                    <Text style={styles.TextEditOne}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.CreateAnAcctBtn}>
                    <Text style={styles.TextEditTwo}>Create an account</Text>
                </TouchableOpacity>
                <Text style={styles.ButtomText}>
                <Text>By Using JobPLug, you agree and consent to our: </Text>
                <TouchableOpacity>
                    <Text>Terms of Service</Text>
                </TouchableOpacity>
                <Text>-</Text>
                <TouchableOpacity>
                    <Text>Cookie Policy</Text>
                </TouchableOpacity>
                <Text>-</Text>
                <TouchableOpacity>
                    <Text>Privacy Policy</Text>
                </TouchableOpacity>
                </Text>
            </View> */}

            import { StyleSheet, View, Text, SafeAreaView, Button, Platform, StatusBar, ImageBackground, TouchableOpacity } from "react-native";
import { useState, useEffect, useCallback } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico'
import { Raleway_800ExtraBold } from "@expo-google-fonts/raleway";
import { Raleway_900Black } from "@expo-google-fonts/raleway";

export function FirstScreen() {

    const [count, setCount] = useState(0);
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
          try {
            await Font.loadAsync({ Pacifico_400Regular });
            await Font.loadAsync({ Raleway_800ExtraBold });
            await Font.loadAsync({ Raleway_900Black })
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (e) {
            console.warn(e);
          } finally {
            setAppIsReady(true);
          }
        }
    
        prepare();
      }, []);

      useCallback(async () => {
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);
    
      if (!appIsReady) {
        return null;
      }
    
    return (
        // <ImageBackground style={{flex: 1}} source={{url: 'https://images.pexels.com/photos/4303031/pexels-photo-4303031.jpeg?auto=compress&cs=tinysrgb&w=600'}}>
    <ImageBackground style={styles.container}source={{url: 'https://images.pexels.com/photos/6347900/pexels-photo-6347900.jpeg?auto=compress&cs=tinysrgb&w=600'}}>
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            <View>
              <View style={styles.headerArrangment}>
            <Text style={styles.headerOne}>Job</Text>
            <Text style={styles.headerOneHalf}>Plug</Text>
              </View>
            <Text style={styles.headerTwo}> The worlds #1 Job search App </Text>
            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.SignUpButton}>
              <Text style={styles.btnText}> Sign Up </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.CreateAcctButton}>
              <Text style={styles.btnText}> Create an account </Text>
            </TouchableOpacity>
            </View >
            <Text style={styles.buttomText}>By Using JobPLug, you agree and consent to our: Terms of Service-Cookie-Policy-privacy Policy</Text>
            </View>
        </View>
    </SafeAreaView>
  </ImageBackground>
)
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        padding: 5,
    },
    headerOne:{
      fontSize: 70, 
      textAlign: 'left', 
      fontFamily: 'Pacifico_400Regular',
      color: 'blue',
    },
    headerOneHalf:{
      fontSize: 70, 
      textAlign: 'left', 
      fontFamily: 'Pacifico_400Regular',
      color: 'red'
    },
    headerArrangment:{
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    headerTwo:{
      fontFamily: 'Raleway_900Black',
      fontSize: 30,
      marginTop: 350,
      marginBottom: 50
    },
    SignUpButton:{
      borderWidth: 2,
      height: 42, width: '70%',
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: 10,
      borderRadius: 5,
    },
    CreateAcctButton:{
      borderWidth: 2,
      height: 42, 
      width: '70%',
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius: 5,
      
    },
    buttomText: {
      textAlign: 'center',
      color: 'white',
      marginTop: 30,
      fontFamily: 'Raleway_600SemiBold'
    },
    btnContainer:{
      width: '130%',
      justifyContent: 'center',
      alignSelf: 'center', 
      alignContent: 'center', 
      alignItems: 'center',
      marginTop: 10,
    },
    btnText:{
      fontFamily: 'Raleway_800ExtraBold',
      
    }
    


})
