import { ActivityIndicator, Modal, View, Text } from "react-native";
import { Theme } from "./Theme";
import { useContext } from "react";
import { AppContext } from "../Screens/globalVariable";

export function Preloader() {
    const {preloader} = useContext(AppContext)
    return (
        <>
        <Modal
        visible={preloader}
        transparent={true}
        
        >
            <View style={{
                flex: 1, paddingTop: 20, justifyContent: "center", alignItems: 'center',
            backgroundColor: "#ffffffcd"
        }}>
            <Text>Loading</Text>
            <ActivityIndicator size="large" color={Theme.colors.blueMedium} />
            </View>
        </Modal>
        </>
    )
}