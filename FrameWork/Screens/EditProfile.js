import {
  View,
  SafeAreaView,
  Text,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Avatar } from "react-native-paper";
import { Theme } from "../Components/Theme";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export function EditProfile({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={styles.container}>
              <Text style={styles.Header}>Edit profile</Text>
            <TouchableOpacity style={{alignSelf: 'center', marginVertical: 30}}>
                <Image source={require("../../assets/profile.png")} 
                style={{width: 200, height:  200, borderWidth: 0, borderRadius: 100, borderColor: 'black'}}/>
                <FontAwesome5 name="camera" size={30} style={{position: 'absolute', bottom: 7, right: 16, zIndex: 9999}}/>
            </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("Name")}>
            <Text style={styles.EditBtns}>Name </Text>
            <FontAwesome5 name="pencil-alt" size={15} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("Username")}>
            <Text style={styles.EditBtns}>Username </Text>
            <FontAwesome5 name="pencil-alt" size={15} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("Mobile number")}>
            <Text style={styles.EditBtns}>Mobile Number </Text>
            <FontAwesome5 name="pencil-alt" size={15} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("Email")}>
            <Text style={styles.EditBtns}>Email </Text>
            <FontAwesome5 name="pencil-alt" size={15} color="white"/>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 20,
    justifyContent: "flex-start",
  },
  btn: {
    borderWidth: 1,
    padding: 17,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: Theme.colors.blueMedium,
    borderColor: Theme.colors.blueMedium,
    flexDirection: 'row',
    alignItems: 'center'
  },
  Header: {
    fontFamily: Theme.fonts.text900,
    fontSize: 40,
    color: 'black'
  },
  EditBtns: {
    fontFamily: Theme.fonts.text200,
    color: 'white',
  }
});
