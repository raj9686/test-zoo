# Zoo Ticketing Software

This repository contains the source code for a simple ticketing software for a Zoo, implemented using Node.js for the backend and React.js for the frontend.

## Features

1. **Ticket Issuance**: When guests arrive at the entrance gate, the ticketing counter can input the number of guests and their ages. The software calculates the total charges based on the age of each guest and issues an entrance ticket with the total charges displayed.

2. **Ticket Validation**: Security personnel can validate tickets by viewing the guests and their ages associated with the ticket. They can manually verify the guests before letting them enter the Zoo.

## Installation

### Backend (Node.js)

1. Clone the repository:

   ```sh
   git clone https://github.com/<your-username>/zoo-ticketing.git
   ```

2. Navigate to the backend directory:

   ```sh
   cd zoo-ticketing/backend
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the backend server:

   ```sh
   npm start
   ```

5. The backend server should now be running on <http://localhost:5000>

### Frontend (React.js)

1. Navigate to the frontend directory:

   ```sh
   cd zoo-ticketing/frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:

   ```sh
   npm start
   ```

4. The frontend should now be running on <http://localhost:3000>

## Usage

1. Access the frontend application in your web browser at <http://localhost:3000>

2. Enter the number of guests and the age of each guest at the ticketing counter. The software will calculate the total charges and issue a ticket.

3. Security personnel can validate tickets by entering the ticket number. The software will display the details of the guests associated with the ticket, allowing the personnel to verify the guests before entry.

## Contributing

Feel free to contribute to this project by forking the repository and submitting a pull request. If you encounter any issues or have suggestions for improvements, please open an issue.

---

This project was implemented as a part of a problem-solving exercise. If you have any questions or need further assistance, please contact the repository owner.
