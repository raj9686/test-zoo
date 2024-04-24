class TicketingSoftware {
  constructor() {
    this.tickets = [];
    this.ticket = { guests: [], totalCharges: 0, ticketNumber: 0 };
    this.currentTicketNumber = 0;
  }

  issueTicket(numGuests, ages) {
    const ticket = { guests: [] };
    let totalCharges = 0;
    ticket.ticketNumber = ++this.currentTicketNumber;
    for (let i = 0; i < numGuests; i++) {
      const age = ages[i];
      let price = 0;
      if (age <= 2) {
        price = 0;
      } else if (age < 18) {
        price = 100;
      } else if (age < 60) {
        price = 500;
      } else {
        price = 300;
      }
      totalCharges += price;
      ticket.guests.push({ Guest: i + 1, age: age });
    }
    ticket.totalCharges = totalCharges;
    this.tickets.push(ticket);
    return ticket;
  }

  validateTicket(ticketNumber) {
    const ticket = this.tickets[ticketNumber - 1];
    if (!ticket) {
      return "Ticket not found";
    }
    return ticket;
  }
}

module.exports = TicketingSoftware;
