import "./App.css";
import { createTheme } from "@mui/material/styles";
import MainProject from "./MainProject";

const theme = createTheme({
  typography: {
    fontFamily: "IBM",
  },
});
function App() {
  return (
    <div className="App">
      <themeProvider theme={theme} style={{ width: "100%" }}>
        <MainProject />
      </themeProvider>
    </div>
  );
}

export default App;
