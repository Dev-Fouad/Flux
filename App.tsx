import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { ProductListScreen } from './src/screens/ProductListScreen';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <ProductListScreen />
    </>
  );
}
