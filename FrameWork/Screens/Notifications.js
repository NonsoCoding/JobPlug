import { View, StyleSheet, SafeAreaView, Text, StatusBar, Platform, FlatList, TouchableOpacity } from "react-native";
import { Theme } from "../Components/Theme";
import { useContext, useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { AppContext } from "./globalVariable";
import { useRoute } from "@react-navigation/native";

export function Notifications({}) {
    const { docID, jobID, userUID } = useContext(AppContext)
    const [applicants, setApplicants] = useState([])

    useEffect(() => {
        const q = collection(db, "Applied Jobs");
        const filter = query(q, where('jobID', '==', docID));
        // console.log('jobID:', jobID);
        onSnapshot(filter, (snapshot) => {
            const allData = [];
            snapshot.forEach(item => {
                allData.push({ ...item.data(), docID: userUID})
            })
            console.log(allData);
            setApplicants(allData);
        }, (error) => {
            console.log(error);
        })
    }, [])

    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={{fontSize: 40, fontFamily: Theme.fonts.text900}}>Notifications</Text>
                <FlatList
                data={applicants}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text style={{fontFamily: Theme.fonts.text900, fontSize: 20}}>New</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <Text style={{fontFamily: Theme.fonts.text900, }}>{item.firstName + " " + item.lastName}</Text>
                            <Text style={{fontFamily: Theme.fonts.text300}}>Applied for your Job</Text>
                            <TouchableOpacity style={styles.appLICANTBtn}>
                                <Text style={{fontFamily: Theme.fonts.text900, color: "white"}}>View</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    )
                }}
                />
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
    appLICANTBtn: {
        padding: 7, 
        paddingHorizontal: 30,
        backgroundColor: Theme.colors.blueMedium,
        borderRadius: 3
    }
}) 