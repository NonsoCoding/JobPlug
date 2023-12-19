import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { Avatar, Searchbar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Theme } from "../Components/Theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FirstScreen } from "./Intro";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function Home({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={()=> navigation.navigate("Profile")}>
              <Avatar.Image
                size={35}
                source={require("../../assets/profile.png")}
              />
            </TouchableOpacity>
            <View style={styles.SearchDesign}>
              <View>
                <EvilIcons name="search" size="25" color={"#999999"} />
              </View>
              <View>
                <TextInput
                  style={styles.SearchView}
                  placeholder="Search"
                  placeholderTextColor={"#999999"}
                />
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="notifications" size="30" />
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export function HomePage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let size;
          if (route.name === "Home") {
            size = focused ? 35 : 23;
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Intro") {
            size = focused ? 35 : 23;
            iconName = focused ? "account" : "account-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.blueLight,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Intro" component={FirstScreen} />
    </Tab.Navigator>
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
  Searchbar: {
    borderRadius: 1,
    padding: 1,
  },
  SearchDesign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#CCE0F0",
    paddingHorizontal: 1,
    borderRadius: 5,
  },
  SearchView: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
    width: 270,
    fontFamily: Theme.fonts.text400,
  },
});
