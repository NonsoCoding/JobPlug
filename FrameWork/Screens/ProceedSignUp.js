import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Theme } from "../Components/Theme";
import * as yup from "yup";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../Firebase/Settings";

const validation = yup.object({
  username: yup.string().required().min(3).max(20),
});

export function ProceedSignUp() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Formik
          initialValues={{ username: "" }}
          onSubmit={(value) => {
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
                    Username
                  </Text>
                  <View style={styles.TextInput}>
                    <TextInput 
                    onChangeText={prop.handleChange("username")}
                    value={prop.values.username}
                    />
                  </View>
                  <Text style={[styles.errors, { display: prop.touched.username && prop.errors.username ? "flex" : "none" }]}>{prop.errors.username}</Text>
                  <TouchableOpacity style={styles.btn} onPress={prop.handleSubmit}>
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
