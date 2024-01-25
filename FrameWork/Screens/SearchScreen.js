import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import use, { useContext, useEffect, useState } from "react";
import { db } from "../../Firebase/Settings";
import { AppContext } from "./globalVariable";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { Theme } from "../Components/Theme";
import AntDesign from "react-native-vector-icons/AntDesign";

export function SearchScreen() {
  const { userUID, setPost, setUserInfo } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);

  async function getUserPost() {
    const post = await getDoc(doc(db, "Jobs", userUID));
    setJobs(post.data());
    console.log(post.data());
  }
  async function getUserinfo() {
    const userInfo = await getDoc(doc(db, "users", userUID));
    setUserInfo(userInfo.data());
    console.log(userInfo.data());
  }
  useEffect(() => {
    // console.log(userUID);
    onSnapshot(collection(db, "Jobs"), (snapshot) => {
      const allData = [];
      snapshot.forEach((Item) => {
        allData.push({ ...Item.data(), docID: Item.id });
        // console.log(Item.data());
      });
      setJobs(allData);
    });
    getUserinfo();
    // getUserPost()
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.SearchDesign}>
          <View>
            <Ionicons name="search" size={25} color={"#999999"} />
          </View>
          <View>
            <TextInput
              style={styles.SearchView}
              placeholder="Search"
              placeholderTextColor={"#999999"}
              color={Theme.colors.blueMedium}
            />
          </View>
        </View>
        <FlatList
          data={jobs}
          renderItem={({ item }) => {
            return (
              <View
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
                      source={{uri: "https://www.earlycode.net/_next/image?url=%2Fimages%2Fearlycode_logo.png&w=64&q=75"}}
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
                  <Text style={{fontFamily: Theme.fonts.text900, fontSize: 25}}>$200K/Month</Text>
                  </View>
                  <View style={{backgroundColor: "white", padding: 10, borderRadius: 10, marginHorizontal: 20, borderWidth: 1, borderColor: Theme.colors.blueMedium}}>
                    <Text style={{paddingHorizontal: 0, fontFamily: Theme.fonts.text400, color: Theme.colors.blueMedium}} numberOfLines={1}>{item.description}</Text>
                  </View>
                  <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginVertical: 10}}>
                    <TouchableOpacity style={{padding: 10, borderWidth: 1, borderRadius: 20, borderColor: Theme.colors.blueMedium, backgroundColor: "white"}}>
                      <Text style={{fontFamily: Theme.fonts.text600, color: Theme.colors.blueMedium}}>See details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 10, borderWidth: 1, borderRadius: 20, borderColor: Theme.colors.blueMedium, backgroundColor: Theme.colors.blueMedium}}>
                      <Text style={{fontFamily: Theme.fonts.text600, color: "white"}}>Apply now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        ></FlatList>
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
    width: 350,
  },
});
