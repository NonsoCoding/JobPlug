import { useContext, useEffect, useState } from "react";
import { View, SafeAreaView, Text, StatusBar, StyleSheet, Platform, TouchableOpacity, TextInput, useColorScheme, FlatList, Image, Alert } from "react-native";
import { AppContext } from "./globalVariable";
import { db } from "../../Firebase/Settings";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { Theme } from "../Components/Theme";
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"



export function PostedJobs() {
    
    const { userUID, setPost, setUserInfo, setPreloader, docID, postID} = useContext(AppContext);
        const [jobs, setJobs] = useState([]);
    
    useEffect(() => {
        const q = collection(db, 'Jobs');
          const filter = query(q, where('userUID', '==', userUID));
          onSnapshot(filter, (snapshot) => {
              const allData = [];
              snapshot.forEach(item => {
                  allData.push({ ...item.data(), postID: item.id })
              })
              console.log(allData);
              setJobs(allData);
          })
      }, []);

      const deleteRequest = (postID) => {
        const docRef = doc(db, "Jobs", postID);
        setPreloader(true);
        deleteDoc(docRef)
        .then(()=> {
            setPreloader(false)
            Alert.alert(
                "Delete Status",
                "You have deleted this Item successfully"
            )
        }).catch(()=> {
            setPreloader(false)
            Alert.alert(
                "Delete Status",
                "You have deleted this Item successfully"
            )
        })
      }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={[styles.container]}>
                <View>
                    <Text style={{fontFamily: Theme.fonts.text900, fontSize: 35}}>Posted Jobs</Text>
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
                  <Text style={{fontFamily: Theme.fonts.text900, fontSize: 25}}>{item.jobType}</Text>
                  </View>
                  <View style={{backgroundColor: "white", padding: 10, borderRadius: 10, marginHorizontal: 20, borderWidth: 1, borderColor: Theme.colors.blueMedium}}>
                    <Text style={{paddingHorizontal: 0, fontFamily: Theme.fonts.text400, color: Theme.colors.blueMedium}} numberOfLines={1}>{item.description}</Text>
                  </View>
                  <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginVertical: 10}}>
                    <TouchableOpacity style={{padding: 10, borderWidth: 1, borderRadius: 20, borderColor: Theme.colors.blueMedium, backgroundColor: "white"}}>
                      <Text style={{fontFamily: Theme.fonts.text600, color: Theme.colors.blueMedium}}>See details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 10, borderWidth: 1, borderRadius: 20, borderColor: Theme.colors.blueMedium, backgroundColor: Theme.colors.blueMedium}}>
                      <Text style={{fontFamily: Theme.fonts.text600, color: "white"}} onPress={()=> deleteRequest(item.postID)}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        ></FlatList>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        padding: 20,
        justifyContent: 'space-between',
    },
})