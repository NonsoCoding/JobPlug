import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  TextInput
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"

export function SearchScreen() {
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
            />
          </View>
        </View>
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
