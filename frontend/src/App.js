import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import VerticalTabs from "./Componenets/Tabs";

// import "antd/dist/antd.css"; // Import Ant Design styles

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box flexDirection={"column"} gap={5} alignItems={"start"} margin={5}>
      <Typography
        variant="h4"
        color={"primary"}
        fontWeight={"bold"}
        marginBottom={2}
      >
        🐘 Zoo Ticketing System
      </Typography>
      <VerticalTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </Box>
  );
}

export default App;
