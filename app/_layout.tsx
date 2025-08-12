import 'react-native-reanimated';
import {AppNavigator} from "@/components/AppNavigator";
import {SettingsProvider} from "@/components/contexts/SettingsContext";
import {I18nextProvider} from "react-i18next";
import i18n from "i18next";
import {AudioProvider} from "@/components/contexts/AudioContext";

export default function RootLayout() {
  return (
      <AudioProvider>
          <SettingsProvider>
              <I18nextProvider i18n={i18n}>
                  <AppNavigator/>
              </I18nextProvider>
          </SettingsProvider>
      </AudioProvider>
  );
}
