import { View, StyleSheet, SafeAreaView, Text, StatusBar, Platform, TextInput, TouchableOpacity, Alert } from "react-native";
import { Theme } from "../Components/Theme";
import { useContext, useState } from "react";
import { AppContext } from "./globalVariable";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/Settings";

export function ApplyNow({ navigation, route}) {
const {userInfo, setPreloader, userUID, docID} = useContext(AppContext);

const {jobTitle, jobLocation, imagePost, description,jobType} = route.params;

const [address, setAddress] = useState("")
const [Image, setImage] = useState("")
const [firstName, setFirstName] = useState(userInfo.firstName)
const [lastName, setLastName] = useState(userInfo.lastName)
const [email, setEmail] = useState(userInfo.email)



function handleApplyJobs() {
    setPreloader(true);
    addDoc(collection(db, "Applied Jobs"), {
        Image, 
        address,
        lastName,
        email,
        jobTitle,
        jobLocation,
        description,
        jobType,
        firstName,
        imagePost,
        userUID,
        jobID: docID,
        appliedAt: new Date().toDateString(),
        
    }).then(()=> {
        setPreloader(false)
        Alert.alert(
            "Application",
            "Application sent successfully"
        )
    }).catch((error)=> {
        console.log(error);
        setPreloader(false);
        Alert.alert(
            "Application Failed",
            "Failed to Apply, Please try again!"
            [{ text: "Try Again" }]
        )
    })
}


    

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View>

                <Text style={{fontSize: 40, fontFamily: Theme.fonts.text900, marginBottom: 20}}>Apply now</Text>
                <Text style={styles.Text}>FirstName*</Text>
                <View>
                <TextInput placeholder="FirstName"
                style={styles.TextInput}
                value={userInfo.firstName}
                // onChangeText={(inp)=> userInfo.fullName(inp.trim())}
                />
                </View>
                <Text style={styles.Text}>LastName*</Text>
                <View>
                <TextInput placeholder="LastName"
                style={styles.TextInput}
                value={userInfo.lastName}
                // onChangeText={(inp)=> (inp.trim())}
                />
                </View>
                <Text style={styles.Text}>Contact Info*</Text>
                <View>
                <TextInput placeholder="Email"
                style={styles.TextInput}
                value={userInfo.email}
                />
                </View>
                <Text style={styles.Text}>Address*</Text>
                <View>
                <TextInput placeholder="Address"
                style={styles.TextInput}
                onChangeText={(inp)=> setAddress(inp.trim())}
                />
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{color: "white", fontFamily: Theme.fonts.text900,}}>Upload CV</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => handleApplyJobs()}>
                    <Text style={{color: "white", fontFamily: Theme.fonts.text900,}}>Apply Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        padding: 20,
        justifyContent: "space-between"
    },
    TextInput: {
        borderWidth: 1,
        padding: 13,
        fontSize: 20,
        marginVertical: 10,
        borderRadius: 10
    },
    btn: {
        // borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: Theme.colors.blueMedium
    },
    Text: {
        fontFamily: Theme.fonts.text400
    },
    btnText: {
        color: Theme.colors.white,
        fontFamily: Theme.fonts.text900,
    }
}) 