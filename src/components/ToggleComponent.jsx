import React from "react";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

function ToggleComponent({ mode, setMode }) {
  return (
    // Main Dashboard Header and Mode Toggle
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Container sx={{ flex: 1 }}>
        <div className="toggle">


          <h2>BLOG DASHBOARD UI</h2>

          {/* Button to toggle light/dark mode */}
          <Button
            variant="contained"
            onClick={() =>
              // Switch between light and dark mode
              setMode(mode === "light" ? "dark" : "light")
            }
          >
            Toggle {mode === "light" ? "Dark" : "Light"} Mode
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default ToggleComponent;
