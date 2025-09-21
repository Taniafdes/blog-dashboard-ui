import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../src/components/layout/MainLayout.jsx";
import JobTableComponent from "./components/JobTableComponent.jsx";
import ToggleComponent from "./components/ToggleComponent.jsx";

function App() {
  const [mode, setMode] = React.useState("light");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToggleComponent mode={mode} setMode={setMode} />
      <MainLayout>
        <JobTableComponent />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
