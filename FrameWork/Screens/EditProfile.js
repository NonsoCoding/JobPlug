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
  TextInput,
  Alert,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from "react-native";
import { Avatar, } from "react-native-paper";
import { Theme } from "../Components/Theme";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./globalVariable";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, imgStorage, storage } from "../../Firebase/Settings";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
// import ImagePicker from "expo-image-picker"
import * as ImagePicker from "expo-image-picker"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import { Formik } from "formik";
import * as yup from "yup"
import { getDownloadURL, ref } from "firebase/storage";


const validation = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email()
})

export function EditProfile({ navigation }) {
  const { userInfo, setPreloader, userUID} = useContext(AppContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preVisibility, setpreVisibility] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [imageMD, setimageMD] = useState(false);
  const [image, setImage] = useState(null);
  const width = Dimensions.get("screen").width


//   useEffect(()=> {
//     // setPreloader(false)
//   }, []);

//   const closeModal = ()=> {
//     setModalVisibility(!modalVisibility);
//   };
//   const previewModal = () => {
//     setPreVisibility(!preVisibility);
//   };
//   const imageModal = () => {
//     setImageMD(!imageMD);
//   };

// async function picker() {
//   const result = await ImagePicker.launchImageLibraryAsync({
//     allowsEditing: true,
//     aspect: [4, 4],
//     quality: 1,
//   })
//   console.log(result);
//   if (!result.canceled) {
//     const { uri } = result.assets[0];
//     setImage(uri)
//     previewModal();
//   }
// }

//   function editProfile() {
//     setPreloader(true)
//     updateDoc(doc(db, "users", userUID), {
//       firstName,
//       lastName,
//       image,
//     }).then(() => {
//       setPreloader(false)
//       Alert.alert(
//         "Edit profile",
//         "profile has been edited successfully",
//       )
//     }).catch((error)=> {
//       setPreloader(false)
//       console.log(error);
//       Alert.alert(
//         "Message!",
//         "Failed to make changes"
//       )
//     })
//   }

//   async function getProfilePic() {
//     setPreloader(true)
//     const reference = ref(storage,`ProfileIages/${userUID}`);
//     await getDownloadURL(reference).then(userImg => {
//       updateDoc(doc(db, "users", userUID), {
//         image: userImg
//       }).then(()=> {
//         Alert.alert(
//           "Profile Image uploaded",
//           "Your profile picture has been uploaded successfully",
//         );
//         setPreloader(false);
//       }).catch(()=> {
//         Alert.alert(
//           "Upload failed",
//           "Failed to Update profile picture. Please try again"
//         )
//         setPreloader(false);
//       })
//     }).catch(()=> {
//       setPreloader(false);
//     })
//   }

//   async function upLoadToStorage() {
//     try {
//       let response = await fetch(image);
//       console.log(response);
//       const imageBlob = await response.blob()
//       await imgStorage().ref().child(`ProfileImages/${userUID}`).put(imageBlob);
//     } catch {
//       setPreloader(false);
//       Alert.alert(
//         "Upload Failed",
//         "Failed to upload image. Please try again",
//         [{ text: "OK"}]
//       )
//     }
//   }

//   function handleUpload() {
//     setPreloader(true)
//     upLoadToStorage().then(()=> {
//        getProfilePic()
//     })
//   }

useEffect(() => {
  // setPreloader(false)
}, []);

const closeModal = () => {
  setModalVisibility(!modalVisibility);
};
const previewModal = () => {
  setpreVisibility(!preVisibility);
};

const imageModal = () => {
  setimageMD(!imageMD);
};


async function picker() {
  const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
  })
  console.log(result);
  if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri)
      previewModal();
  }
}

async function fetchProfilePic() {
  setPreloader(true)
  const reference = ref(storage, `ProfileImages/${userUID}`);
  await getDownloadURL(reference).then(userImg => {
      updateDoc(doc(db, "users", userUID), {
          image: userImg
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
      let response = await fetch(image);
      console.log(response);
      const imageBlob = await response.blob()
      await imgStorage().ref().child(`ProfileImages/${userUID}`).put(imageBlob);
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
      image,

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
    // <SafeAreaView style={{ flex: 1, }}>
    //   <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={{flex: 1}}>
    //   <View style={styles.container}>
    //     <Formik
    //     initialValues={{firstName: "", lastName: "", email: ""}}
    //     onSubmit={()=> {
    //     }}
    //     validationSchema={validation}
    //     >
    //       {()=> {
    //         return (
    //           <View>
    //       <View>
    //           <Text style={styles.Header}>Edit profile</Text>
    //           <View style={{ paddingTop: 30, alignItems: "center"}}>
    //         <Pressable style={{position: "relative"}} >
    //             <Image source={require("../../assets/profile.png")} 
    //             style={{width: 150, height:  150, borderWidth: 0, borderRadius: 120, borderColor: 'black'}}/>
    //             <FontAwesome5 name="camera" size={25} color={Theme.colors.blueMedium} style={{padding: 5, borderRadius: 60, position: "absolute", 
    //             bottom: 0, right: 10, zIndex: 11}}/>
    //         </Pressable>
    //       <TouchableOpacity>
    //       <Text style={{fontFamily: Theme.fonts.text900, paddingHorizontal: 20, 
    //         paddingTop: 10, color: Theme.colors.blueMedium}} onPress={closeModal}>Edit</Text>
    //       </TouchableOpacity>
    //         </View>
    //         <Modal visible={modalVisibility}
    //         animationType="slide"
    //         transparent={true}
    //         >
    //         <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.8)"}}>
    //         <Pressable style={{flex: 1}} onPress={closeModal}></Pressable>
    //         <View style={{
    //         height: 300,
    //         backgroundColor: "#fcfbff",
    //         borderTopLeftRadius: 20,
    //         borderTopRightRadius: 20,
    //         }}>
    //         <View style={{alignItems: "flex-end", margin: 10}}> 
    //         <TouchableOpacity onPress={closeModal}>
    //         </TouchableOpacity>
    //         </View>
    //         <View>
    //         <View style={{ alignItems: "center", marginBottom: 10}}>
    //         <Text style={{fontFamily: Theme.fonts.text900}}>Edit profile picture</Text>
    //         </View>
    //         <View style={{
    //         alignItems: "center",
    //         marginTop: 20,
    //         margin: 15,
    //         padding: 0,
    //         borderRadius: 8
    //         }}
    //         >
    //         <View
    //         style={{
    //                   backgroundColor: Theme.colors.blueMedium,
    //                   width: "100%",
    //                   // alignItems: "center",
    //                   padding: 10,
    //                   borderRadius: 8,
    //                 }}
    //         >
    //         <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5}} onPress={()=> {Pickcamera()}}>
    //         <Pressable style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} >
    //         <Text style={{ color: "white", fontWeight: "bold", fontFamily: Theme.fonts.text900 }} >
    //                   Take a photo
    //                 </Text>
    //                 <FontAwesome
    //           name="camera"
    //           size={25}
    //           color="white"
    //           style={{ paddingRight: 5 }}
    //         />
    //         </Pressable>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={{padding: 15, borderBottomWidth: 0.5}}  onPress={() => { previewModal(); handleUpload() }}>
    //         <Pressable style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
    //         <Text style={{ color: "white", fontWeight: "bold", fontFamily: Theme.fonts.text900 }} >
    //                   Choose a photo
    //           </Text>
    //           <FontAwesome
    //           name="photo"
    //           size={25}
    //           color="white"
    //           style={{ paddingRight: 5 }}
    //         />
    //         </Pressable>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={{padding: 15, }}>
    //         <Pressable style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
    //         <Text style={{ color: "white", fontWeight: "bold", fontFamily: Theme.fonts.text900 }} >
    //                   View profile picture
    //           </Text>
    //           <AntDesign
    //           name="aliwangwang"
    //           size={25}
    //           color="white"
    //           style={{ paddingRight: 5 }}
    //         />
    //         </Pressable>
    //         </TouchableOpacity>
    //         </View>
    //         </View>
    //         </View>
    //         </View>
    //         </View>
    //         </Modal>
            
    //       </View>
    //     <View>
    //       <Text style={styles.TopText}>firstName*</Text>
    //       <View  style={{borderWidth: 1, padding: 13, borderRadius: 10, marginVertical: 10, flexDirection: "row", alignItems: "center"}}>
    //         <MaterialCommunityIcons
    //           name="account"
    //           size={25}
    //           color={Theme.colors.blueMedium}
    //           style={{ paddingRight: 5 }}
    //         />
    //         <TextInput style={styles.Text} placeholder={userInfo.firstName}
    //         onChangeText={(text) => setFirstName(text.trim())}
    //         value={firstName}
    //         keyboardType="default"
    //         autoCapitalize="words"
    //         mode="outlined"
    //         />
    //       </View>
    //       <Text style={styles.TopText}>lastName*</Text>
    //       <View style={{borderWidth: 1, padding: 13, borderRadius: 10, marginVertical: 10, flexDirection: "row", alignItems: "center"}} >
    //       <MaterialCommunityIcons
    //           name="account"
    //           size={25}
    //           color={Theme.colors.blueMedium}
    //           style={{ paddingRight: 5 }}
    //         />
    //         <TextInput style={styles.Text} placeholder={userInfo.lastName}
    //         onChangeText={(text)=> setLastName(text.trim())}
    //         value={lastName}
    //         keyboardType="default"
    //         autoCapitalize="words"
    //         mode="outlined"
    //         />
    //       </View>
    //       <Text style={styles.TopText}>Email*</Text>
    //       <View style={{borderWidth: 1, padding: 13, borderRadius: 10, marginVertical: 10, flexDirection: "row", alignItems: "center"}} >
    //       <MaterialCommunityIcons
    //           name="email"
    //           size={25}
    //           color={Theme.colors.blueMedium}
    //           style={{ paddingRight: 5 }}
    //         />
    //         <TextInput style={styles.Text} placeholder={userInfo.email}/>
    //       </View>
    //       <Text style={styles.TopText}>Bio*</Text>
    //       <View style={{borderRadius: 10, borderWidth: 1, padding: 13}}>
    //         <TextInput
    //         numberOfLines={5}
    //         multiline={true}
    //         />
    //       </View>
    //     </View>
    //           </View>
    //         )
    //       }}
    //     </Formik>
    //     <TouchableOpacity style={{borderRadius: 10, borderWidth: 1, 
    //       padding: 20, alignItems: 'center', fontFamily: Theme.fonts.text500,
    //       backgroundColor: Theme.colors.blueMedium, borderColor: Theme.colors.blueMedium}} onPress={editProfile}>
    //       <Text style={{color: 'white', fontFamily: Theme.fonts.text900}}>Edit</Text>
    //     </TouchableOpacity>
    //   </View>
    //   </KeyboardAvoidingView>
    // </SafeAreaView>
    <SafeAreaView style={{flex: 1}}>

      <View style={styles.container}>
          <View style={styles.body}>
              {/* <ScrollView > */}
              <View style={styles.header}>
                  <View style={{ position: "relative" }}>
                      <Pressable onPress={imageModal}>
                          <Image source={{ uri: userInfo.image }}
                              defaultSource={require("../../assets/Avatar.png")}
                              style={styles.ProfileImage} />
                      </Pressable>
                      <TouchableOpacity onPress={closeModal} style={styles.BtnIcon}>
                      </TouchableOpacity>
                  </View>
              </View>

              <ScrollView>

                  <View style={styles.formContainer}>
                      <Text style={styles.signupText}>First Name</Text>
                      <TextInput
                          style={styles.inputStyle}
                          keyboardType='default'
                          placeholder='Last name'
                          autoCapitalize='words'
                          mode='outlined'
                          onChangeText={(text) => setFirstName(text.trim())}
                          value={firstName}
                      />

                      <Text style={styles.signupText}>Last Name</Text>
                      <TextInput
                          style={styles.inputStyle}
                          keyboardType='default'
                          placeholder='Last name'
                          mode='outlined'
                          autoCapitalize='words'
                          onChangeText={(text) => setLastName(text.trim())}
                          value={lastName}
                      />
                      <TouchableOpacity onPress={editProfile}
                          style={[styles.getStarted, { marginHorizontal: 10 }]}>
                          <Text style={{ fontFamily: Theme.fonts.text600, fontSize: 16, color: "white" }}>Update Profile</Text>
                      </TouchableOpacity>
                  </View>
              </ScrollView>
          </View>


          {/* <=======================> Image Methods <=======================> */}
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
                          <TouchableOpacity onPress={closeModal}>
                          </TouchableOpacity>
                      </View>
                      <View>

                          <TouchableOpacity onPress={() => {
                              closeModal(); picker()
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
                          <Image source={{ uri: image }} style={{ width: 300, height: 300, borderRadius: 400, }} />
                      </View>
                      <TouchableOpacity onPress={() => { previewModal(); handleUpload() }}
                          style={[styles.getStarted, { marginHorizontal: 10 }]}>
                          <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16, }}>Upload Image</Text>
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
                      <Image source={require('../../assets/Avatar.png')}
                          style={{ width: width - 5, height: width - 5 }}
                      />
                  </View>
                  <Pressable style={{ flex: 1 }} onPress={imageModal} >
                  </Pressable>
              </View>
          </Modal>
      </View >
    </SafeAreaView>
  );
}


export const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fcfbff',

  },
  body: {
      flex: 1,
      marginHorizontal: 10,
  },
  header: {
      position: "relative",
      alignItems: 'center',
      marginBottom: 15,
      marginTop: 15,
      backgroundColor: '#d4cef1',
      padding: 10,
      borderRadius: 8
  },
  BtnIcon: {
      backgroundColor: Theme.colors.primary,
      padding: 5,
      borderRadius: 60,
      position: "absolute",
      bottom: 0,
      right: 10,
      zIndex: 11,
  },
  ProfileImage: {
      width: 100,
      height: 100,
      marginRight: 10,
      borderRadius: 80,
  },
  text1: {
      color: '#787A8D',
      marginTop: 10,
      fontSize: 23,
      fontWeight: 'bold'
  },
  formContainer: {
      padding: 10,
      marginTop: 10
  },
  inputStyle: {
      borderColor: "gray",
      borderWidth: 1,
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      width: "100%",
      fontSize: 18
  },
  getStarted: {
      backgroundColor: Theme.colors.primary,
      padding: 13,
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,

  },
  signupText: {
      color: '#434355',
      marginBottom: 5,
      fontSize: 15
  },
  calenderIcon: {
      backgroundColor: Theme.colors.primary,
      position: "absolute",
      padding: 8,
      top: 4,
      right: 4,
      borderRadius: 90
  },
  login: {
      flexDirection: 'row',
  },
  terms: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center',
  },
  errorMessage: {
      color: 'red'
  },
  textBelow: {
      // flexDirection:'row',
      // justifyContent:'space-between'
      alignItems: 'center'
  }
})
