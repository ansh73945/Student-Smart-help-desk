const express = require("express");
const cors = require("cors");

const {
  addTicket,
  getTickets,
  findTicket,
  addReport,
  getReports
} = require("./data/store");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.json({
    project: "CSJMU Smart Help Desk",
    status: "Backend Running Successfully",
    database: "Demo Mode - No Database"
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    database: "Not Connected",
    tickets: getTickets().length,
    reports: getReports().length
  });
});

// Create student ticket
app.post("/api/tickets", (req, res) => {
  const { name, category, message } = req.body;

  if (!name || !category || !message) {
    return res.status(400).json({
      error: "Please provide all required fields"
    });
  }

  const ticket = {
    ticketId: "CSJMU-" + Date.now(),
    name,
    category,
    message,
    status: "Received",
    createdAt: new Date()
  };

  addTicket(ticket);

  res.status(201).json({
    success: true,
    message: "Ticket submitted successfully",
    ticket
  });
});

// Get all tickets
app.get("/api/tickets", (req, res) => {
  res.json(getTickets());
});

// Track ticket
app.get("/api/tickets/:id", (req, res) => {
  const ticket = findTicket(req.params.id);

  if (!ticket) {
    return res.status(404).json({
      error: "Ticket not found"
    });
  }

  res.json(ticket);
});

// Submit maintenance report
app.post("/api/maintenance", (req, res) => {
  const { name, building, description } = req.body;

  if (!name || !building || !description) {
    return res.status(400).json({
      error: "Please fill all required fields"
    });
  }

  const report = {
    reportId: "MNT-" + Date.now(),
    name,
    building,
    description,
    status: "Received",
    createdAt: new Date()
  };

  addReport(report);

  res.status(201).json({
    success: true,
    message: "Maintenance report submitted",
    report
  });
});

// Get all maintenance reports
app.get("/api/maintenance", (req, res) => {
  res.json(getReports());
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
