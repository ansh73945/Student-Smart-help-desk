const tickets = [];
const reports = [];

// Add a new ticket
function addTicket(ticket) {
  tickets.push(ticket);
  return ticket;
}

// Get all tickets
function getTickets() {
  return tickets;
}

// Find ticket by ID
function findTicket(id) {
  return tickets.find(ticket => ticket.ticketId === id);
}

// Add maintenance report
function addReport(report) {
  reports.push(report);
  return report;
}

// Get all maintenance reports
function getReports() {
  return reports;
}

module.exports = {
  tickets,
  reports,
  addTicket,
  getTickets,
  findTicket,
  addReport,
  getReports
};
