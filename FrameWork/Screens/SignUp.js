import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Image } from "react-native";
import { Theme } from "../Components/Theme";
import * as yup from "yup";
import { Formik } from "formik";
import { useContext } from "react";
import { AppContext } from "./globalVariable";
import { createUserWithEmailAndPassword, onAuthStateChanged, signUpWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../Firebase/Settings";

const validation = yup.object({
    email: yup.string().required().email().min(8).max(30),
    password: yup.string().required().min(6).max(20)
})

export function SignUp({ navigation }) {
    // const [email, setEmail] = useContext(AppContext)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(value) => {
            createUserWithEmailAndPassword(authentication, value.email, value.password)
            .then(()=> {
              onAuthStateChanged(authentication, (user) => {
                console.log(user.uid)
                navigation.navigate("ProceedSignUp")
              })
              .catch((error) => {
                console.log(error);
                Alert.alert(
                    "Message!",
                    "An error"
                    [{ text: "Try Again" }]
                )
              })
            })
          }}
          validationSchema={validation}
        >
          {(prop) => {
            return (
              <View>
                <Text
                  style={{
                    fontSize: 50,
                    fontWeight: "900",
                    fontFamily: Theme.fonts.text900,
                  }}
                >
                  SignUp
                </Text>
                <Image
                  source={require("../../assets/signuplogo2.png")}
                  style={{ width: 400, height: 300, alignSelf: "center" }}
                />
                <View>
                  <Text style={styles.InpText}>Email</Text>
                  <View style={styles.TextInput}>
                    <TextInput  
                    onChangeText={prop.handleChange("email")}
                    value={prop.values.email}
                    onBlur={prop.handleBlur("email")}
                    />
                  </View>
                  <Text style={[styles.Error, {display: prop.touched.email && prop.errors.email ? "flex" : "none"}]}>{prop.errors.email}</Text>
                  <Text style={{fontFamily: Theme.fonts.text300}}>Password</Text>
                  <View style={styles.TextInput}>
                    <TextInput  
                    onChangeText={prop.handleChange("password")}
                    value={prop.values.password}
                    onBlur={prop.handleBlur("email")}
                    secureTextEntry
                    />
                  </View>
                    <Text style={[styles.Error, { display: prop.touched.password && prop.errors.password ? "flex" : "none" }]}>{prop.errors.password}</Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={prop.handleSubmit}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: Theme.fonts.text200,
                      }}
                    >
                      Continue
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={{ fontFamily: Theme.fonts.text200 }}>
                      Already have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SignIn")}
                    >
                      <Text
                        style={{
                          color: Theme.colors.blueMedium,
                          fontFamily: Theme.fonts.text600,
                        }}
                      >
                        {" "}
                        Click here
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
    justifyContent: "space-between",
  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    backgroundColor: Theme.colors.blueMedium,
    borderColor: Theme.colors.blueMedium,
  },
  InpText: {
    fontFamily: Theme.fonts.text300
  },
  Error: {
    color: 'red',
    paddingBottom: 10,
    fontFamily: Theme.fonts.text300
  }
});
