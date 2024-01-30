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
  Alert,
  FlatList,
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
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./globalVariable";
import AntDesign from "react-native-vector-icons/AntDesign"
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { PostingScreen } from "./PostingScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const CarouselLinks = [
  "https://images.pexels.com/photos/5439381/pexels-photo-5439381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5439436/pexels-photo-5439436.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
const screenwidth = Dimensions.get("screen").width;

function Home({ navigation }) {
  const { userUID, setUserInfo, userInfo, setPreloader, setDocID, setAllJobs, postID } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);

  async function getUserinfo() {
    onSnapshot(doc(db, "users", userUID), (snapshot) => {
      setUserInfo(snapshot.data());
    });
    // console.log(userInfo.data());
  }
  async function getUserPost() {
    const post = await getDoc(doc(db, "Jobs", userUID));
    setPost(post.data());
    console.log(post.data());
  }
  useEffect(() => {
    // console.log(userUID);
    onSnapshot(collection(db, "Jobs"), (snapshot) => {
        const allData = []
        snapshot.forEach(item => {
            allData.push({ ...item.data(), docID: item.id })
        })
        setJobs(allData);
        setAllJobs(allData);
    })
    getUserinfo()
}, []);
// useEffect(() => {
//   const q = collection(db, 'Jobs');
//     const filter = query(q, where('active', '==', userUID));
//     onSnapshot(filter, (snapshot) => {
//         const allData = [];
//         snapshot.forEach(item => {
//             allData.push({ ...item.data(), postID: item.id })
//         })
//         console.log(allData);
//         setJobs(allData);
//     })
// }, []);
  

  
  const selectImage = async () => {
    let result = await ImagePicer.launchImageLibraryAsync({
        mediaType: ImagePicer.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    });
    if (!result.canceled) {
        const { uri, type } = result.assets[0]
        if (type === 'image') {
            setImage(uri)
            setpreVisibility(true)
        }
        else {
            Alert.alert("File", "Can't select this type of file.")
            setImage(null)
            setpreVisibility(false)
        }
    }
}
useEffect(()=> {
  onSnapshot(collection(db, "Jobs"), (snapshot)=> {
    const allData = []
    snapshot.forEach(item => {
      allData.push({ ...item.data(), docID: item.id})
    })
    setJobs(allData);
  })
  getUserinfo();
}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Avatar.Image
                size={35}
                source={{uri: userInfo.image}}
              />
            </TouchableOpacity>
            <View style={{ alignItems: "center", flexDirection: "column" }}>
              <Text style={{ fontFamily: Theme.fonts.text600, fontSize: 25 }}>
                Welcome back
              </Text>
              <Text style={{ fontFamily: Theme.fonts.text300, fontSize: 15 }}>
                {userInfo.firstName} {userInfo.lastName}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SearchScreen")}
                >
                  <EvilIcons name="search" size={35} color={"#999999"} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
              >
                <Ionicons name="notifications" size={30}/>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{paddingBottom: 10, fontSize: 30, fontFamily: Theme.fonts.text900, paddingLeft: 10}}>Find your dream job!</Text>
          <View style={{ flex: 1 }}>
            <Carousel
              loop
              width={screenwidth}
              height={200}
              autoPlay={true}
              data={CarouselLinks}
              scrollAnimationDuration={2000}
              renderItem={({ index }) => (
                <View
                  style={{
                    margin: 1,
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: 250,
                      borderRadius: 10,
                    }}
                    source={{ uri: CarouselLinks[index] }}
                  />
                </View>
              )}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
              <View
                style={{
                  padding: 10,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderRadius: 20,
                  marginHorizontal: 5,
                  backgroundColor: Theme.colors.blueMedium,
                  borderColor: Theme.colors.blueMedium,
                }}
              >
                <Text
                  style={{ color: "white", fontFamily: Theme.fonts.text600 }}
                >
                  All
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("Job posted")}>
              <View
                style={{
                  padding: 10,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderRadius: 20,
                  marginVertical: 10,
                  backgroundColor: Theme.colors.blueMedium,
                  borderColor: Theme.colors.blueMedium,
                }}
              >
                <Text
                  style={{ color: "white", fontFamily: Theme.fonts.text600 }}
                >
                  My Posts
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("Applied Jobs")}>
              <View
                style={{
                  padding: 10,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderRadius: 20,
                  marginVertical: 10,
                  backgroundColor: Theme.colors.blueMedium,
                  borderColor: Theme.colors.blueMedium,
                }}
              >
                <Text
                  style={{ color: "white", fontFamily: Theme.fonts.text600 }}
                >
                  Applied Jobs
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {jobs.map(item => {
            return (
              <View
              key={item.docID}
                style={{
                  padding: 1,
                  paddingVertical: 15,
                  paddingBottom: 10,
                  marginBottom: 10,
                  borderRadius: 3,
                  borderColor: Theme.colors.primary + 20,
                  borderBottomWidth: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    height: 300,
                    borderRadius: 40,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 25,
                      justifyContent: "space-between"
                    }}
                  >
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image
                      source={{uri: item.imagePost}}
                      style={{ width: 70, height: 70 }}
                    />
                    <View style={{alignItems: "center", flexDirection: "row"}}>
                      <View>
                        <View style={{flexDirection: "row"}}>
                      <Text style={{fontFamily: Theme.fonts.text900, fontSize: 15, paddingLeft: 15}}>{item.company}</Text>
                      <Text style={{fontFamily: Theme.fonts.text400, paddingLeft: 5}}>({item.workPlaceType})</Text>
                        </View>
                    <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 10}}>
                    <Ionicons name="location-sharp" size={25} color={"red"}/>
                    <Text style={{fontFamily: Theme.fonts.text600}}>{item.jobLocation}</Text>
                    </View>
                      </View>
                    </View>
                    </View>
                      <AntDesign name="hearto" size={25} color={Theme.colors.blueMedium} />
                  </View>
                  <View style={{paddingHorizontal: 25}}>
                <Text style={{fontFamily: Theme.fonts.text900, fontSize: 20}}>{item.jobTitle}</Text>
                <Text style={{fontFamily: Theme.fonts.text600, color: Theme.colors.blueMedium}}>{item.jobType}</Text>
                  </View>
                  <View style={{paddingHorizontal: 25, paddingVertical: 5}}>
                  <Text style={{fontFamily: Theme.fonts.text900, fontSize: 25}}>₦{item.salary}/Month</Text>
                  </View>
                  <View style={{backgroundColor: Theme.colors.blueMedium, padding: 10, borderRadius: 10, marginHorizontal: 20}}>
                    <Text style={{paddingHorizontal: 0, fontFamily: Theme.fonts.text400, color: "white"}} numberOfLines={1}>{item.description}</Text>
                  </View>
                  <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginVertical: 10}}>
                    <TouchableOpacity style={{padding: 10, borderWidth: 1, borderRadius: 20, borderColor: Theme.colors.blueMedium, backgroundColor: "white"}} 
                    onPress={() => navigation.navigate("See Details", { docID: item.docID })}>
                      <Text style={{fontFamily: Theme.fonts.text600, color: Theme.colors.blueMedium}}>See details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 10, borderWidth: 1, borderRadius: 20, borderColor: Theme.colors.blueMedium, 
                      backgroundColor: Theme.colors.blueMedium}} onPress={()=> {navigation.navigate("Notifications"); setDocID(item.docID)}}>
                      <Text>applicants</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 10, borderWidth: 1, borderRadius: 20, borderColor: Theme.colors.blueMedium, 
                      backgroundColor: Theme.colors.blueMedium}} onPress={() => { navigation.navigate("Apply Now", { jobTitle: item.jobTitle, jobLocation: item.jobLocation
                      , description: item.description, jobType: item.jobType, imagePost: item.imagePost}); setDocID(item.docID) }}>
                      <Text style={{fontFamily: Theme.fonts.text600, color: "white"}}>Apply now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
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
          } else if (route.name == "Post") {
            size = focused ? 35 : 23;
            iconName = focused ? "plus" : "plus-box-outline";
          } else if (route.name === "Profile") {
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
