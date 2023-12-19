import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FirstScreen, Intro } from '../Screens/Intro'
import { HomePage } from "../Screens/HomePage";
import { Profile } from "../Screens/Profile";


const Stack = createNativeStackNavigator();

export function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Intro" component={FirstScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}