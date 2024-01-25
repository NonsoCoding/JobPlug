import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Theme } from "../Components/Theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { AppContext } from "./globalVariable";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import * as yup from "yup"
import {Picker, } from "@react-native-picker/picker"

// const validation = yup.object({
//     jobTitle: yup.string().required(),
//     jobTitle: yup.string().required(),
//     jobTitle: yup.string().required(),
//     jobTitle: yup.string().required(),
//     jobTitle: yup.string().required(),
// })

export function PostingScreen() {
  const { setPreloader, userUID, setUserUID, userInfo } = useContext(AppContext)
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [workPlaceType, setWorkPlaceType] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState(userInfo.email)
  const [contactInfo, setContactInfo] = useState(userInfo.email)

  function handlePostJob() {
    setPreloader(true)
    addDoc(collection(db, "Jobs"), {
        jobTitle,
        jobLocation,
        jobType, 
        workPlaceType,
        company,
        userUID,
        description,
        contactInfo,
        salary,
        creatAt: new Date().toDateString(),
        status: "Active"
    }).then(()=> {
        setPreloader(false);
        Alert.alert("Success", "Post has been made successfully!")
        // navigation.navigate("HomePage")
      })
      .catch((error)=> {
        console.log(error);
        setPreloader(false)
        Alert.alert(
          "message!",
          [{ text: "Sorry, Something went wrong please try again" }]
        )
      })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
      <View style={styles.container}>
        <Formik initialValues={{}} 
        onSubmit={() => {

        }}>

        </Formik>
        <Text
          style={{
            fontFamily: Theme.fonts.text800,
            fontSize: 29,
            alignSelf: "center",
          }}
        >
          Let's create your job post
        </Text>
        <View>
          <Text style={{ fontFamily: Theme.fonts.text200, marginTop: 10 }}>
            * indicates required
          </Text>
          <Text style={styles.Text}>Job title*</Text>
          <View style={styles.TextInput}>
            <TextInput onChangeText={(inp) => setJobTitle(inp.trim())} />
          </View>
          <Text style={styles.Text}>Company*</Text>
          <View>
            <TextInput
              style={styles.TextInput}
              onChangeText={(inp) => setCompany(inp.trim())}
            />
          </View>
          <View>
          <Text style={styles.Text}>Workplace type*</Text>
            <Picker
            selectedValue={workPlaceType}
            onValueChange={(itemValue)=> setWorkPlaceType(itemValue)}
            >
              <Picker.Item label="On-site" value="On-site"/>
              <Picker.Item label="Remote" value="Remote" />
              <Picker.Item label="Hybrid" value="Hybrid" />
            </Picker>
          </View>
          <Text style={styles.Text}>Job location*</Text>
          <View>
            <TextInput 
            style={styles.TextInput}
            onChangeText={(inp) => setJobLocation(inp.trim())} />
          </View>
          <Text style={styles.Text}>Job type*</Text>
          <View >
            {/* <TextInput 
            style={styles.TextInput}
            onChangeText={(inp) => setJobType(inp.trim())} 

            /> */}
            <Picker
            selectedValue={jobType}
            onValueChange={(itemValue)=> setJobType(itemValue)}
            >
              <Picker.Item label="Full-Time" value={"Full-Time"} />
              <Picker.Item label="Part-Time" value={"Part-Time"} />
              <Picker.Item label="Internship" value={"Internship"} />
              <Picker.Item label="Contract" value={"Contract"} />
              <Picker.Item label="Other" value={"Other"} />
            </Picker>
          </View>
          <Text style={styles.Text}>Salary*</Text>
          <View>
            <TextInput 
            style={styles.TextInput}
            onChangeText={(inp)=> setSalary(inp.trim())}
            value={salary}
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="numeric"
            />
          </View>
          <Text style={styles.Text}>contactInfo*</Text>
          <View>
            <TextInput 
            style={styles.TextInput}
            onChangeText={(inp)=> setContactInfo(inp.trim())}
            value={contactInfo}
            autoCapitalize="none"
            autoComplete="off"
            />
          </View>
          <Text style={styles.Text}>Job description</Text>
          <View>
          <TextInput 
          style={styles.TextInput}
          multiline={true}
          numberOfLines={5}
          onChangeText={(inp)=> setDescription(inp.trim())}
          />
          </View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              flexDirection: "row",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginVertical: 10,
            }}
          >
            <FontAwesome name="photo" size={20} />
            <Text style={{ fontFamily: Theme.fonts.text300 }}>photo/video</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.TextInput,
            {
              alignItems: "center",
              borderColor: Theme.colors.blueMedium,
              backgroundColor: Theme.colors.blueMedium,
            },
          ]} onPress={handlePostJob}
        >
          <Text style={{ fontFamily: Theme.fonts.text300, color: "white" }}>
            Share now
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 20,
    justifyContent: "space-between",
  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 15
  },
  Text: {
    fontFamily: Theme.fonts.text300,
    marginTop: 10,
  },
});
