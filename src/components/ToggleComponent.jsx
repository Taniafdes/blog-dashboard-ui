import React from 'react'
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

function ToggleComponent({ mode, setMode }) {
    return (
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>

            <Container sx={{ flex: 1 }}>
                <div className='toggle'>
                    <h2>BLOG DASHBOARD UI</h2>
                    <Button
                        variant="contained"
                        onClick={() => setMode(mode === "light" ? "dark" : "light")}
                    >
                        Toggle {mode === "light" ? "Dark" : "Light"} Mode
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default ToggleComponent