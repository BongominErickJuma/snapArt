import Footer from "./components/layouts/footer/Footer";

import AuthProvider from "./contexts/AuthContex";
import Routes from "./routes/Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
      <Footer />
    </AuthProvider>
  );
}

export default App;
