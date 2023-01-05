import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css'
import Layout from './Components/Layout';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    // <>
      // <Layout>Hii Welcome</Layout>
    // </>
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  );
}

export default App;
