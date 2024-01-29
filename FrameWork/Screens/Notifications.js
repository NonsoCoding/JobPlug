import { View, StyleSheet, SafeAreaView, Text, StatusBar, Platform, FlatList } from "react-native";
import { Theme } from "../Components/Theme";
import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { AppContext } from "./globalVariable";

export function Notifications() {
    const { userUID, docID, jobID } = useContext(AppContext);
    const [applicants, setApplicants] = useState([])

    useEffect(() => {
        const q = collection(db, "Applied Jobs");
        const filter = query(q, where('userUID', '==', userUID));
        onSnapshot(filter, (snapshot) => {
            const allData = []
            snapshot.forEach(item => {
                allData.push({ ...item.data(), docID: item.id})
            })
            console.log(allData);
            setApplicants(allData);
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
                            <Text>{item.lastName}</Text>
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
    }
}) 