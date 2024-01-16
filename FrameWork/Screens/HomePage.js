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
  Dimensions,
} from "react-native";

import { Avatar, Searchbar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Theme } from "../Components/Theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FirstScreen } from "./Intro";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Carousel from "react-native-reanimated-carousel";
import { Profile } from "./Profile";
import { useContext, useEffect } from "react";
import { AppContext } from "./globalVariable";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { PostingScreen } from "./PostingScreen";


const CarouselLinks = [
"https://images.pexels.com/photos/5439381/pexels-photo-5439381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
'https://images.pexels.com/photos/5439436/pexels-photo-5439436.jpeg?auto=compress&cs=tinysrgb&w=600',
'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

]
const screenwidth = Dimensions.get('screen').width;

function Home({navigation}) {

  const { userUID, setUserInfo, userInfo} = useContext(AppContext)

  async function getUserinfo() {
    const userInfo = await getDoc(doc(db, "users", userUID))
    setUserInfo(userInfo.data())
    console.log(userInfo.data());
  }
  useEffect(() => {
    console.log(userUID);
    getUserinfo()
  }, [])
  

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
            <View style={{alignItems: 'center', flexDirection: "column", }}>
              <Text style={{fontFamily: Theme.fonts.text600, fontSize: 25, }}>
                Welcome back
              </Text>
              <Text style={{fontFamily: Theme.fonts.text300, fontSize: 15, }}>
                {userInfo.firstName} {userInfo.lastName}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <TouchableOpacity onPress={()=> navigation.navigate("SearchScreen")}>
                <EvilIcons name="search" size={35} color={"#999999"} />
                </TouchableOpacity>
              </View>
            <TouchableOpacity onPress={()=> navigation.navigate("Notifications")}>
              <Ionicons name="notifications" size="30" />
            </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={screenwidth}
                height={250}
                autoPlay={true}
                data={CarouselLinks}
                scrollAnimationDuration={2000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            margin: 1
                        }}
                    >
                        <Image style={{
                          width: '100%',
                          height: 250,
                          borderRadius: 10,
                        }}
                        source={{uri: CarouselLinks[index]}}
                        />
                    </View>
                )}
            />
        </View>
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
          }
          else if (route.name == "Post") {
            size = focused ? 35 : 23;
            iconName = focused ? "plus" : "plus-box-outline"
          } 
          else if (route.name === "Profile") {
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
      <Tab.Screen name="Post" component={PostingScreen} />
      <Tab.Screen name="Profile" component={Profile} />
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
    width: 27,
    fontFamily: Theme.fonts.text400,
  },
});
