const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// Database-free temporary storage
const tickets = [];
const reports = [];

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
    tickets: tickets.length,
    reports: reports.length
  });
});

// Submit student ticket
app.post("/api/tickets", (req, res) => {
  const { name, category, message } = req.body;

  if (!name || !category || !message) {
    return res.status(400).json({
      error: "Please provide name, category and message"
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

  tickets.push(ticket);

  res.status(201).json({
    success: true,
    message: "Ticket submitted successfully",
    ticket
  });
});

// Track ticket
app.get("/api/tickets/:id", (req, res) => {
  const ticket = tickets.find(
    t => t.ticketId === req.params.id
  );

  if (!ticket) {
    return res.status(404).json({
      error: "Ticket not found"
    });
  }

  res.json(ticket);
});

// Maintenance report
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

  reports.push(report);

  res.status(201).json({
    success: true,
    message: "Maintenance report submitted",
    report
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Smart Help Desk running on port ${PORT}`);
});
