import {
    View,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    Text,
    Platform,
    TextInput,
    TouchableOpacity
  } from "react-native";
  import Ionicons from "react-native-vector-icons/Ionicons"
import { Theme } from "../Components/Theme";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { Formik } from "formik";


  export function PostingScreen() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <Formik
            initialValues={{}}
            onSubmit={()=> {

            }}

            >

            </Formik>
          <Text style={{fontFamily: Theme.fonts.text800, fontSize: 29, alignSelf: 'center'}}>Let's create your job post</Text>
          <View>
          <Text style={{fontFamily: Theme.fonts.text200, marginTop: 10}}>* indicates required</Text>
          <Text style={styles.Text}>
            Job title*
          </Text>
          <View style={styles.TextInput}>
          <TextInput/>
          </View>
          <Text style={styles.Text}>Company*</Text>
          <View style={styles.TextInput}>
            <TextInput />
          </View>
          <Text style={styles.Text}>Workplace type*</Text>
          <View style={styles.TextInput}>
          <TextInput />
          </View>
          <Text style={styles.Text}>Job location*</Text>
          <View style={styles.TextInput}>
            <TextInput />
          </View>
          <Text style={styles.Text}>Job type*</Text>
          <View style={styles.TextInput}>
            <TextInput />
          </View>
          <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row', 
          borderWidth: 1, borderRadius: 10, padding: 20, marginVertical: 10}}>
            <FontAwesome name="photo" size={20}/>
            <Text style={{ fontFamily: Theme.fonts.text300}}>photo/video</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.TextInput, {alignItems: 'center',borderColor: Theme.colors.blueMedium, backgroundColor: Theme.colors.blueMedium }]}>
            <Text style={{fontFamily: Theme.fonts.text300, color: "white"}}>Share now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
      padding: 20,
      justifyContent: 'space-between',

    },
    TextInput: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
    },
    Text: {
        fontFamily: Theme.fonts.text300,
        marginTop: 10
    }
  });
  