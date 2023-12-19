import { View, StyleSheet, Text, SafeAreaView, Platform, StatusBar, TouchableOpacity,Image } from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Theme } from "../Components/Theme";

export function Profile() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
            <TouchableOpacity>
              <Avatar.Image
                size={150}
                source={require("../../assets/profile.png")} />
            </TouchableOpacity>
            <View style={{alignItems: 'center', marginVertical: 10}}>
            <Text style={{fontSize: 30, fontFamily: Theme.fonts.text500 }}>Chukwunonso Obi</Text>
                <TouchableOpacity style={styles.EditProfileBtn}>
                    <Text style={{fontFamily: Theme.fonts.text500}}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            </View>
            <View>
                <TouchableOpacity style={styles.ProfileBtn}>
                    <MaterialCommunityIcons name='account-check' size='30' style={{paddingRight: 20 }}/>
                    <Text style={{fontFamily: Theme.fonts.text500}}>Verification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ProfileBtn}>
                    <Ionicons name='settings-sharp' size='30' style={{paddingRight: 20}} />
                    <Text style={{fontFamily: Theme.fonts.text500}}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ProfileBtn}>
                    <FontAwesome5 name='lock' size='30' style={{paddingRight: 20}}/>
                    <Text style={{fontFamily: Theme.fonts.text500}}>Change password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ProfileBtn}>
                    <SimpleLineIcons name='logout' size='30' style={{paddingRight: 20}}/>
                    <Text style={{fontFamily: Theme.fonts.text500}}>Logout</Text>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        // alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between'
    },
    EditProfileBtn: {
        borderWidth: 1,
        paddingHorizontal: 40,
        padding: 10,
        borderRadius: 10,
        marginVertical: 20
    },
    ProfileBtn:{
        paddingVertical: 40,
        flexDirection: 'row',
        padding: 1,
        alignItems: 'center'
    },
})