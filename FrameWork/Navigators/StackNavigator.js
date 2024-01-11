import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FirstScreen, Intro } from '../Screens/Intro'
import { HomePage } from "../Screens/HomePage";
import { Profile } from "../Screens/Profile";
import { SignUp } from "../Screens/SignUp";
import { ChangePassword } from "../Screens/ChangePassword";
import { EditProfile } from "../Screens/EditProfile";
import { NameScreen } from "../Screens/Name";
import { UsernameScreen } from "../Screens/Username";
import { MobileNumberScreen } from "../Screens/MobileNumber";
import { EmailScreen } from "../Screens/Email";
import { SignIn } from "../Screens/SignIn";
import { ResetPassword } from "../Screens/ResetPassowrd";
import { Mode } from "../Screens/Mode";
import { Notifications } from "../Screens/Notifications";
import { ProceedSignUp } from "../Screens/ProceedSignUp";


const Stack = createNativeStackNavigator();

export function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Intro" component={FirstScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Change Password" component={ChangePassword} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Name" component={NameScreen} />
        <Stack.Screen name="Username" component={UsernameScreen} />
        <Stack.Screen name="Mobile number" component={MobileNumberScreen} />
        <Stack.Screen name="Email" component={EmailScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Reset password" component={ResetPassword} />
        <Stack.Screen name="Mode" component={Mode} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="ProceedSignUp" component={ProceedSignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}