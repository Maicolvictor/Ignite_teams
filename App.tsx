import { StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components/native';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import theme from './src/theme';

import { Loading } from '@components/Loading';

export default function App() {
  const [fontsloaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme = {theme}>
      <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
      />
      { fontsloaded ? <Routes /> : <Loading /> }
    </ThemeProvider>
  );
}