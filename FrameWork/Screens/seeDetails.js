import { View, StyleSheet, SafeAreaView, Text, StatusBar, Platform, Image, FlatList, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { Theme } from "../Components/Theme";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./globalVariable";
import { db } from "../../Firebase/Settings";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import Carousel from "react-native-reanimated-carousel";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"

const CarouselLinks = [
    "https://www.earlycode.net/_next/image?url=%2Fimages%2Fearlycode_logo.png&w=64&q=75",
    "https://images.pexels.com/photos/5439436/pexels-photo-5439436.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const screenwidth = Dimensions.get("screen").width;
export function SeeDetails({navigation}) {
    const {postID, setPostID, userUID, setUserInfo} = useContext(AppContext);
    const [jobPostData, setJobPostData] = useState("");
  
    useEffect(() => {
      const fetchJobPostData = async () => {
        try {
          const jobPostRef = doc(db, 'Jobs', docID);
          const jobPostSnapshot = await getDoc(jobPostRef);
  
          if (jobPostSnapshot.exists()) {
            // Job post data found
            setJobPostData(jobPostSnapshot.data());
          } else {
            // Job post not found
            console.log('Job post not found.');
          }
        } catch (error) {
          console.error('Error fetching job post data:', error.message);
        }
      };
  
      fetchJobPostData();
    }, [docID]);
  
      const route = useRoute();
      const docID = route.params?.docID;
    
  
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
              <Text style={{fontFamily: Theme.fonts.text900, fontSize: 40, marginBottom: 10}}>Job Details</Text>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <View>
            <Carousel
              loop
              width={screenwidth}
              height={300}
              autoPlay={false}
              data={CarouselLinks}
              scrollAnimationDuration={2000}
              // onSnapToItem={(index) => console.log('current index:', index)}
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
            <View>
          <Text style={{fontSize: 30, fontFamily: Theme.fonts.text900}}>{jobPostData.jobTitle}</Text>
          <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
          <Ionicons name="location-sharp" size={25} color={"red"}/>
          <Text style={{fontFamily: Theme.fonts.text500}}>{jobPostData.jobLocation}</Text>
          </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 10}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={{fontFamily: Theme.fonts.text700, color: Theme.colors.greenMedium, fontSize: 25}}>₦{jobPostData.salary}</Text>
          <Text style={{fontFamily: Theme.fonts.text500}}>/Month</Text>
          </View>
          <View style={{borderWidth: 1, padding: 8, paddingHorizontal: 15, borderRadius: 10, backgroundColor: Theme.colors.blueMedium, borderColor: Theme.colors.blueMedium}}>
          <Text style={{color: Theme.colors.white, fontFamily: Theme.fonts.text500}}>on-site</Text>
          </View>
            </View>
              </View>

            <View>
            <View >
              <Text style={{fontSize: 23, fontFamily: Theme.fonts.text600}}>Description</Text>
              <Text style={{marginVertical: 15, fontFamily: Theme.fonts.text500}}>{jobPostData.description}</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <TouchableOpacity style={styles.heartBtn}>
              <AntDesign name="heart" size={40} color={Theme.colors.blueMedium} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
              <Text style={{color: Theme.colors.white, fontSize: 20, fontFamily: Theme.fonts.text800}}>Apply now</Text>
              </TouchableOpacity>
            </View>
            </View>
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
    },
    btn: {
      borderWidth: 1,
      padding: 25,
      borderRadius: 15,
      backgroundColor: Theme.colors.blueMedium,
      borderColor: Theme.colors.blueMedium,
      alignItems: "center",
      width: "75%"
    },
    heartBtn: {
      borderWidth: 1,
      padding: 15,
      borderRadius: 15,
      backgroundColor: Theme.colors.blueLight,
      borderColor: Theme.colors.blueMedium,
      alignItems: "center",
      width: "22%",
      marginRight: 10
    }
}) 