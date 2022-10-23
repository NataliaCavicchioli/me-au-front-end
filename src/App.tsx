import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

import CartModal from "./components/CartModal";
import Header from "./components/Header";
import { UserContextProvider } from "./contexts/UserContext";
import { AppRoutes } from "./routes";
import GlobalStyle from "./styles/GlobalStyles";
import { MUITheme } from "./styles/themes";

import "./i18n";

function App() {
  return (
    <>
      <GlobalStyle />
      <GoogleOAuthProvider clientId="361752817190-u5s66m46ngocih4n5drs13dmg5nht2v9.apps.googleusercontent.com">
        <UserContextProvider>
          <ThemeProvider theme={MUITheme}>
            <Header />
            <CartModal />
            <AppRoutes />
          </ThemeProvider>
        </UserContextProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
