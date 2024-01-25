import { View, StyleSheet, SafeAreaView, Text, StatusBar, Platform, Image, TextInput, TouchableOpacity, Modal, Pressable } from "react-native";
import { Theme } from "../Components/Theme";
import { useContext, useState } from "react";
import * as yup from "yup"
import { AppContext } from "./globalVariable";
import { Formik } from "formik";
import { formatMoney } from "../Components/FormatMoney";

const validation = yup.object({
    amount: yup.number().required().min(100).max(200000),
})

export function FundScreen({navigation}) {
    const {email, setPreloader} = useContext(AppContext)
    const [preVisibility, setPreVisibilty] = useState("");
    const [modalVisibility, setModalVisibility] = useState ("");
    const [imageMD, setImageMD] = useState("")
    const [amount, setAmount] = useState("")

    const previewModal = () => {
        setPreVisibilty(!preVisibility)
    }
    const closeModal = () => {
        setModalVisibility(!modalVisibility)
    }
    const imageModal = () => {
        setImageMD(!imageMD)
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <View style={styles.container}>
                <Formik
                initialValues={{amount: ""}}
                onSubmit={(value)=> {
                    closeModal();
                    setAmount(Number(value.amount))
                }}
                validationSchema={validation}
                >
                    {(prop)=> {
                        return (
                            <View>

                <Text style={{fontSize: 40, fontFamily: Theme.fonts.text900}}>Fund your account Now!</Text>
                <Image source={{uri: "https://thumbs.dreamstime.com/b/credit-card-stack-several-cards-pile-isolated-white-background-38680475.jpg"}} 
                style={{height: 370, width: 350, alignSelf: "center"}}/>
                <View>
                    <Text style={{fontFamily: Theme.fonts.text900, padding: 5}}>Amount</Text>
                    <View style={{borderWidth: 1, padding: 15, borderRadius: 10}}>
                        <TextInput placeholder="Enter Amount" style={{fontSize: 18}}
                        onChangeText={prop.handleChange("amount")}
                        autoCapitalize="none"
                        />
                    </View>
                    <Text style={[styles.error, {display: prop.touched.amount && prop.errors.amount ? "flex" : "none"}]}>{prop.errors.amount}</Text>
                    <TouchableOpacity style={{marginVertical: 15, borderRadius: 10, borderWidth: 1, padding: 12, alignItems: "center", 
                    borderColor: Theme.colors.blueMedium, backgroundColor: Theme.colors.blueMedium}} onPress={prop.handleSubmit} >
                        <Text style={{fontSize: 15, color: "white", fontFamily: Theme.fonts.text900}} >Pay</Text>
                    </TouchableOpacity>
                    <Modal visible={modalVisibility}
            animationType="slide"
            transparent={true}
            >
            <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.8)"}}>
            <Pressable style={{flex: 1}} onPress={closeModal}></Pressable>
            <View style={{
            height: 300,
            backgroundColor: "#fcfbff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            }}>
            <View style={{alignItems: "flex-end", margin: 10}}> 
            <TouchableOpacity onPress={closeModal}>
            </TouchableOpacity>
            </View>
            <View>
            <View style={{ alignItems: "center", marginBottom: 10}}>
            <Text style={{fontFamily: Theme.fonts.text900}}>Payment</Text>
            </View>
            <View style={{
            marginTop: 20,
            margin: 15,
            padding: 0,
            borderRadius: 8
            }}
            >
            <View onPress={imageModal}
            // style={{
            //         //   backgroundColor: Theme.colors.blueMedium,
            //           width: "100%",
            //           // alignItems: "center",
            //           padding: 10,
            //           borderRadius: 8,
            //         }}

            >
                <View style={styles.ModalText}>
                    <Text>Payment Method</Text>
                    <Text>Paystack</Text>
                </View>
                <View style={styles.ModalText}>
                    <Text>Fee</Text>
                    <Text>1.8%</Text>
                </View>
                <View style={styles.ModalText}>
                    <Text>Amount</Text>
                    <Text>₦{formatMoney(amount)}</Text>
                </View>
                <View style={styles.ModalText}>
                    <Text>Total</Text>
                    <Text>₦{formatMoney(amount + ((1.8 / 100) * amount))}</Text>
                </View>
                <TouchableOpacity style={{marginVertical: 15, borderRadius: 10, borderWidth: 1, padding: 12, alignItems: "center", 
                    borderColor: Theme.colors.blueMedium, backgroundColor: Theme.colors.blueMedium}}
                    onPress={() => { closeModal(); navigation.navigate("Payment", { amount: amount })}}>
                    <Text style={{color: "white", fontFamily: Theme.fonts.text900}}>Pay Now</Text>
                </TouchableOpacity>
            </View>
            </View>
            </View>
            </View>
            </View>
            </Modal>
   
                </View>
                            </View>
                        )
                    }}

                </Formik>
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
    error: {
        color: "red",
        paddingTop: 5
    },
    ModalText: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        paddingVertical: 10
    }
}) 
