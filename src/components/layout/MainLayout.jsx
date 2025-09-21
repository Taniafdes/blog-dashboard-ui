import React from "react";
import { Box, Container } from "@mui/material";

const MainLayout = ({ children }) => {

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ flex: 1 }}>
        {children}
      </Container>
    </Box>
  );
};

export default MainLayout;
