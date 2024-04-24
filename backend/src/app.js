const express = require("express");
const bodyParser = require("body-parser");
const TicketingSoftware = require("./TicketingSoftware");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
const zooTicketing = new TicketingSoftware();

app.use(bodyParser.json());

app.post("/issueTicket", (req, res) => {
  const { numGuests, ages } = req.body;
  const ticket = zooTicketing.issueTicket(numGuests, ages);
  res.json(ticket);
});

app.get("/validateTicket/:ticketNumber", (req, res) => {
  const ticketNumber = parseInt(req.params.ticketNumber);
  const ticketDetails = zooTicketing.validateTicket(ticketNumber);
  res.json(ticketDetails);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
