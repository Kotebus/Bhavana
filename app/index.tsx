import {NavigationContainer} from "@react-navigation/native";
import {AppNavigator} from "@/components/common/AppNavigator";

export default function Index() {
    return (
        <NavigationContainer>
            <AppNavigator/>
        </NavigationContainer>
    );
}
