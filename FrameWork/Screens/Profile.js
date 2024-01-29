import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Theme } from "../Components/Theme";
import { useContext, useState } from "react";
import { AppContext } from "./globalVariable";
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome";
export function Profile({ navigation }) {
  const { userUID, setUserInfo, userInfo, setPreloader, setUserUID } =
    useContext(AppContext); 
  const [modalVisibility, setModalVisibility] = useState(false);
  const [accountBalance, setAccountBalance] = useState([])
  const [isBalanceVisible, setIsBalanceVisible] = useState([])

  const BalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible)
  }

  const user = {
    name: "John Doe",
    email: "john@example.com",
    balance: 5000, // Sample personal balance
  };

  const closeModal = () => {
    setModalVisibility(!modalVisibility);
  };

  async function logout(params) {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
      setUserInfo({ balance: 0 });
      setUserUID("");
      navigation.navigate("Intro");
    }, 2000);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View
          style={[
            styles.profileInfo,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Image
            source={{uri: userInfo.image}} 
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={styles.name}>
              {userInfo.firstName + " " + userInfo.lastName}
            </Text>
            <Text style={styles.email}>{userInfo.email}</Text>
          </View>
        </View>
        <View style={styles.balanceSection}>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <Text style={styles.balanceTitle}>Personal Balance</Text>
          <TouchableOpacity style={{borderWidth: 1, padding: 5, borderRadius: 10, backgroundColor: Theme.colors.blueMedium, borderColor: Theme.colors.blueMedium,}}
          onPress={()=> navigation.navigate("Fund screen")}>
            <Text style={{fontFamily: Theme.fonts.text900, color: 'white'}}>Fund</Text>
          </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.balanceAmount}>${isBalanceVisible ? `${userInfo.balance}` : `****`}</Text>
            <Text
              style={{
                fontFamily: Theme.fonts.text900,
                color: Theme.colors.blueMedium,
              }}
              onPress={BalanceVisibility}
            >
              Hide
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.EditProfileBtn}
          onPress={() => navigation.navigate("Edit Profile")}
        >
          <Text style={{ fontFamily: Theme.fonts.text900, color: "white" }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.ProfileBtn} onPress={() => navigation.navigate("Job posted")}>
            <MaterialCommunityIcons
              name="account"
              size={25}
              color={Theme.colors.blueMedium}
              style={{ paddingHorizontal: 10 }}
            />
            <Text style={styles.profileTEXT}>
              My Jobs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ProfileBtn} onPress={()=> navigation.navigate("Applied Jobs")}>
            <MaterialIcons name="support-agent" size={25} color={Theme.colors.blueMedium} style={{ paddingHorizontal: 10 }} />
            <Text style={styles.profileTEXT}>Applied Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ProfileBtn}
            onPress={() => navigation.navigate("Mode")}
          >
            <Ionicons
              name="help-circle"
              size={25}
              color={Theme.colors.blueMedium}
              style={{ paddingHorizontal: 10 }}
            />
            <Text style={styles.profileTEXT}>Help Center</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.ProfileBtn} onPress={()=> navigation.navigate("Reset password")}>
            <Fontisto name="locked" size={25} color={Theme.colors.blueMedium} style={{ paddingHorizontal: 10 }} />
            <Text style={styles.profileTEXT}>Password and Security</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth: 1, alignItems: "center", padding: 10, 
          borderRadius: 10, backgroundColor: Theme.colors.blueMedium, 
          borderColor: Theme.colors.blueMedium, flexDirection: 'row', alignItems: "center",}} onPress={closeModal}>
          <SimpleLineIcons
              name="logout"
              size={25}
              style={{ paddingRight: 20, alignSelf: "center" }}
            />
            <Text style={{fontFamily: Theme.fonts.text900, color: "white"}}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={modalVisibility}
          animationType="slide"
          transparent={true}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
            <Pressable style={{ flex: 1 }} onPress={closeModal}></Pressable>
            <View
              style={{
                height: 200,
                backgroundColor: "#fcfbff",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <View style={{ alignItems: "flex-end", margin: 10 }}>
                <TouchableOpacity onPress={closeModal}>
                  {/* <FontAwesomeIcon
                                    icon={box}
                                    size={24}
                                    color='#787A8D'
                                /> */}
                </TouchableOpacity>
              </View>
              <View>
                <View style={{ alignItems: "center", marginBottom: 10 }}>
                  <Text>Are you sure you want to log out</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 20,
                    margin: 15,
                    padding: 0,
                    borderRadius: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      closeModal();
                      logout();
                    }}
                    style={{
                      backgroundColor: "#de4040",
                      width: "100%",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    // alignItems: 'center',
    padding: 20,
    justifyContent: "space-between",
  },
  EditProfileBtn: {
    borderWidth: 1,
    paddingHorizontal: 40,
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    borderColor: Theme.colors.blueMedium,
    backgroundColor: Theme.colors.blueMedium,
    alignItems: "center",
  },
  ProfileBtn: {
    paddingVertical: 15,
    flexDirection: "row",
    padding: 1,
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 0.5
  },
  profileInfo: {
    marginBottom: 20,
  },
  name: {
    fontFamily: Theme.fonts.text900,
    fontSize: 25,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  balanceSection: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 20,
    borderRadius: 10,
  },
  balanceTitle: {
    fontSize: 18,
    fontFamily: Theme.fonts.text700,
    fontWeight: "bold",
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 24,
    color: Theme.colors.blueMedium,
  },
  verification: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: Theme.colors.blueMedium,
    marginBottom: 10
  },
  profileTEXT: {
    color: Theme.colors.blueMedium,
    fontFamily: Theme.fonts.text900
  }
});
