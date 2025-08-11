// import React, {createContext, useState, useContext, PropsWithChildren} from 'react';
// import {View, StyleSheet, Appearance} from 'react-native';
// import {ThemeType} from "../styles/theme";
//
//
// interface ThemeContextProps {
//     theme: ThemeType;
//     toggleTheme: () => void;
// }
//
// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
//
// export const useTheme = () => {
//     const context = useContext(ThemeContext);
//     if (!context) {
//         throw new Error('useTheme must be used within a ThemeProvider');
//     }
//     return context;
// };
//
// export const ThemeProvider = ({ children } : PropsWithChildren) => {
//     const systemTheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
//     const [theme, setTheme] = useState<ThemeType>(systemTheme);
//
//     const toggleTheme = () => {
//         setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//     };
//
//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             <View style={theme === 'light' ? styles.lightContainer : styles.darkContainer}>
//                 {children}
//             </View>
//         </ThemeContext.Provider>
//     );
// };
//
// const styles = StyleSheet.create({
//     lightContainer: {
//         backgroundColor: 'white',
//         flex: 1,
//     },
//     darkContainer: {
//         backgroundColor: 'black',
//         flex: 1,
//     },
// });