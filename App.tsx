import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNav from './src/navigations'
import createStore from './src/app/reducers'
import Toast from 'react-native-toast-message';
import toastConfig from './src/components/alert_message/config';


const { store, persistor } = createStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={styles.container}>
          <AppNav />
          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                
  },
});

export default App;
