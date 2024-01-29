import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Theme } from "../Components/Theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./globalVariable";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, imgStorage, storage } from "../../Firebase/Settings";
import * as yup from "yup"
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { getDownloadURL, ref } from "firebase/storage";



// const validation = yup.object({
//     jobTitle: yup.string().required(),
//     jobTitle: yup.string().required(),
//     jobTitle: yup.string().required(),
//     jobTitle: yup.string().required(),
//     jobTitle: yup.string().required(),
// })

export function PostingScreen() {
  const { setPreloader, userUID, setUserUID, userInfo, postID } = useContext(AppContext)
  const [imagePost, setImagePost] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [workPlaceType, setWorkPlaceType] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState(userInfo.email)
  const [contactInfo, setContactInfo] = useState(userInfo.email)
  const [modalVisibility, setModalVisibility] = useState("");
  const [preVisibility, setPreVisibility] = useState("");
  const [imageMD, setImageMD] = useState(false);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null)
  const width = Dimensions.get("screen").width

  function handlePostJob() {
    setPreloader(true)
    addDoc(collection(db, "Jobs"), {
        jobTitle,
        jobLocation,
        imagePost,
        jobType, 
        workPlaceType,
        company,
        userUID,
        description,
        contactInfo,
        salary,
        creatAt: new Date().toDateString(),
        status: "Active",
        image1,
        image2,
        image3,
    }).then(()=> {
        setPreloader(false);
        Alert.alert("Success", "Post has been made successfully!")
        // navigation.navigate("HomePage")
      })
      .catch((error)=> {
        console.log(error);
        setPreloader(false)
        Alert.alert(
          "message!",
          [{ text: "Sorry, Something went wrong please try again" }]
        )
      })
  }
  useEffect(() => {
    // setPreloader(false)
  }, []);
  
  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };
  const previewModal = () => {
    setPreVisibility(!preVisibility);
  };
  
  const imageModal = () => {
    setImageMD(!imageMD);
  };
  
  
  async function picker() {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    })
    console.log(result);
    if (!result.canceled) {
        const { uri } = result.assets[0];
        setImagePost(uri)
        previewModal();
    }
  }
  
  async function fetchProfilePic() {
    setPreloader(true)
    const reference = ref(storage, `PostingImages/${userUID}`);
    await getDownloadURL(reference).then(userImg => {
        updateDoc(doc(db, "users", userUID), {
            imagePost: userImg
        }).then(() => {
            Alert.alert(
                "Profile Image uploaded",
                "Your profile picture has been uploaded successfully!",
            );
            setPreloader(false)
        })
            .catch(() => {
                Alert.alert(
                    "Upload Status",
                    "Failed to update profile image. Please try again",
                )
                setPreloader(false);
            })
    }).catch(() => {
        setPreloader(false);
    })
  }
  
  async function uplaodToStorage() {
    try {
        let response = await fetch(imagePost);
        console.log(response);
        const imageBlob = await response.blob()
        await imgStorage().ref().child(`PostingImages/${userUID}`).put(imageBlob);
    } catch {
        setPreloader(false)
        Alert.alert(
            "Upload Status",
            "Failed to upload profile image. Please try again",
            [{ text: 'OK' }]
        )
    }
  }
  
  function handleUpload() {
    setPreloader(true)
    uplaodToStorage().then(() => {
        fetchProfilePic()
    })
  }
  
  function editProfile() {
    setPreloader(true)
    updateDoc(doc(db, "users", userUID), {
        firstName,
        lastName,
        address
  
    }).then(() => {
        setPreloader(false)
        Alert.alert(
            "Edit Profile",
            "Profile has been edited successfully",
        )
    }).catch((error) => {
        // console.log(typeof error.code)
        setPreloader(false)
        Alert.alert(
            "Message!",
            errorMessage(error.code),
            [{ text: "Try Again" }]
        )
    })
  }
  
  


  



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
      <View style={styles.container}>
        <Formik initialValues={{}} 
        onSubmit={() => {

        }}>

        </Formik>
        <Text
          style={{
            fontFamily: Theme.fonts.text800,
            fontSize: 29,
            alignSelf: "center",
          }}
        >
          Let's create your job post
        </Text>
        <View>
          <Text style={{ fontFamily: Theme.fonts.text200, marginTop: 10 }}>
            * indicates required
          </Text>
          <Text style={styles.Text}>Job title*</Text>
          <View style={styles.TextInput}>
            <TextInput onChangeText={(inp) => setJobTitle(inp.trim())} />
          </View>
          <Text style={styles.Text}>Company*</Text>
          <View>
            <TextInput
              style={styles.TextInput}
              onChangeText={(inp) => setCompany(inp.trim())}
            />
          </View>
          <View>
          <Text style={styles.Text}>Workplace type*</Text>
            <Picker
            selectedValue={workPlaceType}
            onValueChange={(itemValue)=> setWorkPlaceType(itemValue)}
            >
              <Picker.Item label="On-site" value="On-site"/>
              <Picker.Item label="Remote" value="Remote" />
              <Picker.Item label="Hybrid" value="Hybrid" />
            </Picker>
          </View>
          <Text style={styles.Text}>Job location*</Text>
          <View>
            <TextInput 
            style={styles.TextInput}
            onChangeText={(inp) => setJobLocation(inp.trim())} />
          </View>
          <Text style={styles.Text}>Job type*</Text>
          <View >
            {/* <TextInput 
            style={styles.TextInput}
            onChangeText={(inp) => setJobType(inp.trim())} 

            /> */}
            <Picker
            selectedValue={jobType}
            onValueChange={(itemValue)=> setJobType(itemValue)}
            >
              <Picker.Item label="Full-Time" value={"Full-Time"} />
              <Picker.Item label="Part-Time" value={"Part-Time"} />
              <Picker.Item label="Internship" value={"Internship"} />
              <Picker.Item label="Contract" value={"Contract"} />
              <Picker.Item label="Other" value={"Other"} />
            </Picker>
          </View>
          <Text style={styles.Text}>Salary*</Text>
          <View>
            <TextInput 
            style={styles.TextInput}
            onChangeText={(inp)=> setSalary(inp.trim())}
            value={salary}
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="numeric"
            />
          </View>
          <Text style={styles.Text}>contactInfo*</Text>
          <View>
            <TextInput 
            style={styles.TextInput}
            onChangeText={(inp)=> setContactInfo(inp.trim())}
            value={contactInfo}
            autoCapitalize="none"
            autoComplete="off"
            />
          </View>
          <Text style={styles.Text}>Job description</Text>
          <View>
          <TextInput 
          style={styles.TextInput}
          multiline={true}
          numberOfLines={5}
          onChangeText={(inp)=> setDescription(inp.trim())}
          />
          </View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              flexDirection: "row",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginVertical: 10,
            }}
            onPress={()=> { closeModal()}}
          >
            <FontAwesome name="photo" size={20} />
            <Text style={{ fontFamily: Theme.fonts.text300 }}>photo/video</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontFamily: Theme.fonts.text900, fontSize: 25}}>Logo Image*</Text>
        <Image source={{uri: userInfo.imagePost}} style={{width: 150, height: 150, borderWidth: 1, marginVertical: 10}}/>
        <TouchableOpacity>
          <Text style={{fontFamily: Theme.fonts.text900, fontSize: 25}}>Select slide photos*</Text>
        </TouchableOpacity>
        <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
          <TouchableOpacity>
        <Image source={{}} style={{width: 100, height: 100, borderWidth: 1, margin: 5}} />
          </TouchableOpacity>
        <Image source={{}} style={{width: 100, height: 100, borderWidth: 1, margin: 5}}/>
        <TouchableOpacity>
        <Image source={{}} style={{width: 100, height: 100, borderWidth: 1, margin: 5}}/>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.TextInput,
            {
              alignItems: "center",
              borderColor: Theme.colors.blueMedium,
              backgroundColor: Theme.colors.blueMedium,
            },
          ]} onPress={handlePostJob}
        >
          <Text style={{ fontFamily: Theme.fonts.text300, color: "white" }}>
            Share now
          </Text>
        </TouchableOpacity>
        <Modal
              visible={modalVisibility}
              animationType="slide"
              transparent={true}
          >
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                  <Pressable style={{ flex: 1 }} onPress={closeModal} >
                  </Pressable>
                  <View style={{ backgroundColor: "#16171D", height: 170, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                      <View style={{ alignItems: 'flex-end', margin: 10 }}>
                          {/* <TouchableOpacity onPress={closeModal}>
                          </TouchableOpacity> */}
                      </View>
                      <View>

                          <TouchableOpacity onPress={() => {
                              closeModal(); picker();
                          }}>
                              <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row", }}>
                                  <Text style={{ fontSize: 15, paddingLeft: 5, color: "white" }}>Gallery</Text>
                              </View>
                          </TouchableOpacity>
                          <View
                              style={{
                                  borderBottomColor: Theme.colors.primary,
                                  borderBottomWidth: StyleSheet.hairlineWidth,
                                  margin: 10, marginTop: 0
                              }}
                          />
                          <TouchableOpacity onPress={() => {
                              closeModal()
                          }}>
                              <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row" }}>
                                  <Text style={{ fontSize: 15, paddingLeft: 5, color: "white" }}>
                                      Camera
                                  </Text>
                              </View>
                          </TouchableOpacity>
                      </View>

                  </View>

              </View>
          </Modal>

          {/* <====================> Preview Image before Uploading <====================> */}
          <Modal
              visible={preVisibility}
              transparent={true}
          >
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                  <Pressable style={{ flex: 1 }} onPress={previewModal} >
                  </Pressable>
                  <View style={{ backgroundColor: '#16171D', height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                      <View style={{ alignItems: 'flex-end', margin: 10 }}>
                          <TouchableOpacity onPress={previewModal}>
                          </TouchableOpacity>
                      </View>
                      <View style={{ alignItems: 'center', padding: 5, justifyContent: 'center' }}>
                          <Image source={{uri: imagePost}} style={{ width: 300, height: 300, borderRadius: 400, }} />
                      </View>
                      <TouchableOpacity onPress={() => { previewModal(); handleUpload() }}
                          style={[styles.getStarted, { marginHorizontal: 10, alignItems: 'center', padding: 30 }]}>
                          <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16, color: Theme.colors.white}}>Upload Image</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </Modal>

          {/* ============================> Profile Modal <============================ */}
          <Modal
              visible={imageMD}
              animationType="slide"
              transparent={true}
          >
              <View style={{ flex: 1, backgroundColor: "#16171df4" }}>
                  <Pressable style={{ flex: 1 }} onPress={imageModal} >
                  </Pressable>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                      <Image source={{uri: userInfo.imagePost}}
                          style={{ width: width - 5, height: width - 5 }}
                      />
                  </View>
                  <Pressable style={{ flex: 1 }} onPress={imageModal} >
                  </Pressable>
              </View>
          </Modal>
      </View>
      </ScrollView>
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
    borderRadius: 10,
    padding: 15,
    fontSize: 15
  },
  Text: {
    fontFamily: Theme.fonts.text300,
    marginTop: 10,
  },
});
