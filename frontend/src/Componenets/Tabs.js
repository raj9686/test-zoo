import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
const url = "http://localhost:5000/";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);
  const [numGuests, setNumGuests] = useState(""); // Set to 1 instead of 0
  const [ages, setAges] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [validateTicketNumber, setValidateTicketNumber] = useState("");
  const [info, setInfo] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleValidateTicketNumberChange = (e) => {
    setValidateTicketNumber(e.target.value);
    setInfo(null);
  };

  const issueTicket = () => {
    if (numGuests <= 0) {
      alert("Number of guests must be greater than 0");
      return;
    }
    if (
      ages.filter((age) => age === "").length > 0 ||
      ages.length !== numGuests
    ) {
      alert("Please enter all ages");
      return;
    }
    axios
      .post(`${url}issueTicket`, { numGuests, ages })
      .then((response) => {
        setTicket(response.data);
        setAges([]);
        setNumGuests(0);
      })
      .catch((error) => {
        console.error("Error issuing ticket:", error);
      });
  };

  const validateTicket = (ticketNumber) => {
    axios
      .get(`${url}validateTicket/${ticketNumber}`)
      .then((response) => {
        console.log("Ticket details:", response.data);
        setInfo(response.data);
      })
      .catch((error) => {
        console.error("Error validating ticket:", error);
      });
  };

  const handleNumGuestsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNumGuests(value || 0);
    setAges(new Array(value).fill("").map(() => ""));
    setTicket(null);
  };

  const handleAgeChange = (index, value) => {
    const intValue = parseInt(value);
    if (isNaN(intValue)) return;
    setAges([...ages.slice(0, index), value, ...ages.slice(index + 1)]);
  };

  return (
    <Box marginBottom={5}>
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        value={value}
        onChange={handleChange}
      >
        <Tab label=" 🏷️ Issue Ticket" {...a11yProps(0)} />
        <Tab label=" ✅ Verify Ticket" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div>
          <Box display="flex" flexDirection="row" alignItems="start" gap={2}>
            <TextField
              label="Enter Number of Guests"
              variant="outlined"
              value={numGuests}
              onChange={(e) => handleNumGuestsChange(e)}
            />
            <Button variant="contained" onClick={issueTicket} marginTop={10}>
              Issue Ticket
            </Button>
          </Box>
          <Grid container spacing={2}>
            {ages &&
              ages.map((age, index) => (
                <Grid item xs={3} key={index}>
                  <Box marginTop={2} marginBottom={2}>
                    <TextField
                      label={`Age of Guest ${index + 1}`}
                      variant="outlined"
                      value={age}
                      onChange={(e) => handleAgeChange(index, e.target.value)}
                    />
                  </Box>
                </Grid>
              ))}
          </Grid>

          {ticket?.guests &&
            ticket?.guests.map((guest, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  flexDirection: "row",
                  alignItems: "start",
                  gap: 2,
                  padding: 2,
                  marginTop: 2,
                  maxWidth: 200,
                }}
              >
                <div>
                  <Typography variant="body1">Guest {index + 1}</Typography>
                  <Typography variant="body1">Age: {guest.age}</Typography>
                </div>
              </Card>
            ))}
          {ticket?.totalCharges && (
            <div>
              <Typography marginTop={2} color={"green"}>
                Ticket Issueed
              </Typography>
              <Typography marginTop={2} color={"primary"} fontWeight={"bold"}>
                Ticket Number: {ticket?.ticketNumber || ""}
              </Typography>

              <Typography marginTop={2} color={"primary"} fontWeight={"bold"}>
                Total Charges: {ticket?.totalCharges || ""}
              </Typography>
            </div>
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box display="flex" flexDirection="row" alignItems="start" gap={2}>
          <TextField
            label="Enter Ticket Number"
            variant="outlined"
            value={validateTicketNumber}
            onChange={(e) => handleValidateTicketNumberChange(e)}
          />
          <Button
            variant="contained"
            margin={10}
            onClick={() => validateTicket(validateTicketNumber)}
          >
            Verify
          </Button>
        </Box>
        {info?.guests &&
          info?.guests.map((guest, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                flexDirection: "row",
                alignItems: "start",
                padding: 2,
                marginTop: 2,
                maxWidth: 200,
              }}
            >
              <div>
                <Typography variant="body1">Guest {guest.Guest}</Typography>
                <Typography variant="body1">Age: {guest.age}</Typography>
              </div>
            </Card>
          ))}
      </TabPanel>
    </Box>
  );
}
