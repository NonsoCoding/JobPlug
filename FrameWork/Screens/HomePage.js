import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Avatar, Searchbar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Theme } from "../Components/Theme";

export function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Avatar.Image
            size={35}
            source={require("../../assets/profile.png")}
          />
          {/* <Avatar.Text
            size={35}
          label="XD"
          /> */}
          <View style={styles.SearchIcon}>
            <TouchableOpacity>
              <EvilIcons name="search" size="25" color={'#999999'} />
            </TouchableOpacity>
            <TextInput placeholder="Search" placeholderTextColor={'#999999'} style={styles.SearchFont}/>
          </View>
          <Ionicons name="notifications" size="30" color="black" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 10,
  },
  topBar: {
    flexDirection: "row",
    marginTop: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  SearchIcon: {
    borderWidth: 1,
    width: 290,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#CCE0F0',
    borderColor: '#CCE0F0',
  },
  Searchbar: {
    borderRadius: 1,
    padding: 1,
  },
  SearchFont:{
    fontFamily: Theme.fonts.text400,
  }
});
