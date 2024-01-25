import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Theme } from "../Components/Theme";
import * as yup from "yup";
import { Formik } from "formik";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authentication, db } from "../../Firebase/Settings";
import { userUID } from "./SignUp";
import { useContext } from "react";
import { AppContext } from "./globalVariable";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const validation = yup.object({
  firstName: yup.string().required().min(3).max(20),
  firstName: yup.string().required().min(2).max(20),
  lastName: yup.string().required().min(2).max(20),
  Address: yup.string().required(),
  Gender: yup.string().required(),
  email: yup.string().required().email(),
});

export function ProceedSignUp( {navigation} ) {

  const { setPreloader, setUserUID, setUserInfo } = useContext(AppContext)
  // const navigation = useNavigation();

  // useEffect(() => {
  //   // Reset the form values when navigating to SignUp
  //   return () => {
  //     prop.resetForm();
  //   };
  // }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Formik
          initialValues={{ firstName: "", lastName: "", Gender: "", Address: "", email: "" }}
          onSubmit={(value, formikBag) => { 
            setPreloader(true)
              onAuthStateChanged(authentication, (user) => {
                if (user) {
                  setUserUID(user.uid)
                  const userUID = user.uid;
  
                  const userDocRef = doc(db, "users", userUID)
                  setDoc(userDocRef, {
                    firstName: value.firstName,
                    lastName: value.lastName,
                    Gender: value.Gender,
                    balance: 0,
                    Address: value.Address,
                    AccountStatus: "Active",
                    email: value.email
                  })
                  .then(()=> {
                    setPreloader(false);
                    Alert.alert("Success", "registration complete!")
                    navigation.navigate("HomePage")
                  })
                  .catch((error)=> {
                    console.log(error);
                    setPreloader(false)
                    Alert.alert(
                      "message!",
                      [{ text: "Sorry, Something went wrong please try again" }]
                    )
                  })
                } else {
                  setPreloader(false)
                  Alert.alert("Error", "user not authenticated")
                }
              })
          }}
          validationSchema={validation}
        >
          {(prop) => {
            return (
              <View>
                  <Text
                    style={{
                      fontFamily: Theme.fonts.text900,
                      fontSize: 30,
                      alignSelf: "center",
                    }}
                  >
                    Create username
                  </Text>
                  <View style={{ paddingVertical: 10 }}>
                    <Text
                      style={{
                        fontFamily: Theme.fonts.text300,
                        alignSelf: "center",
                      }}
                    >
                      Choose a username for your new account. you can always
                    </Text>
                    <Text
                      style={{
                        fontFamily: Theme.fonts.text300,
                        alignSelf: "center",
                      }}
                    >
                      change it later
                    </Text>
                  </View>
                  <Text style={{ fontFamily: Theme.fonts.text400 }}>
                    firstName
                  </Text>
                  <View style={styles.TextInput}>
                    <TextInput 
                    onChangeText={prop.handleChange("firstName")}
                    value={prop.values.firstName}
                    />
                  </View>
                  <Text style={[styles.errors, { display: prop.touched.firstName && prop.errors.firstName ? "flex" : "none" }]}>{prop.errors.firstName}</Text>
                  <Text style={{fontFamily: Theme.fonts.text300, }}>
                    lastName
                  </Text>
                  <View style={styles.TextInput}>
                    <TextInput 
                    onChangeText={ prop.handleChange("lastName") }
                    value={prop.values.lastName}
                    />
                  </View>
                  <Text style={[styles.errors, {display: prop.touched.lastName && prop.errors.lastName}]}>{prop.errors.lastName}</Text>
                  <Text style={{fontFamily: Theme.fonts.text300}}>
                    Gender
                  </Text>
                  <View style={styles.TextInput}>
                    <TextInput 
                    onChangeText={prop.handleChange("Gender")}
                    value={prop.values.Gender}
                    />
                  </View>
                  <Text style={[styles.errors, {display: prop.touched.Gender && prop.errors.Gender ? "flex" : "none"}]}>{prop.errors.Gender}</Text>
                  <Text style={{fontFamily: Theme.fonts.text300}}>Address</Text>
                  <View style={styles.TextInput}>
                    <TextInput 
                    onChangeText={ prop.handleChange("Address") }
                    value={prop.values.Address}
                    />
                  </View>
                  <Text style={[styles.TextInput, {display: prop.touched.Address && prop.errors.Address ? "flex" : "none"}]}>{prop.errors.Address}</Text>
                  <Text style={{fontFamily: Theme.fonts.text300}}>Email</Text>
                  <View style={styles.TextInput}>
                    <TextInput 
                    onChangeText={prop.handleChange("email")}
                    value={prop.values.email}
                    />
                  </View>
                  <Text style={[styles.errors, {display: prop.touched.email && prop.errors.email ? "flex" : "none"}]}>{prop.errors.email}</Text>
                  <TouchableOpacity style={styles.btn} onPress={prop.handleSubmit} disabled={prop.isSubmitting}>
                    <Text
                      style={{
                        fontFamily: Theme.fonts.text900,
                        color: "white",
                      }}
                    >
                      Continue
                    </Text>
                  </TouchableOpacity>
                </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 20,
  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    padding: 20,
    backgroundColor: Theme.colors.blueMedium,
    borderColor: Theme.colors.blueMedium,
  },
  errors: {
    color: 'red',
    padding: 3,
    fontFamily: Theme.fonts.text300
  }
});
