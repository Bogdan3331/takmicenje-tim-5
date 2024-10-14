Rent-a-Car Web Application
This project is a Rent-a-Car platform designed to make vehicle reservations user-friendly and easy to manage. The application allows users to sign in, register, browse available cars, and make reservations. It features a clean, responsive UI and integrates map functionality for a better user experience.

Features

- User Authentication: Sign in, register, and manage profiles
- Vehicle Search and Filtering: Easily find and filter vehicles by various attributes (e.g., fuel type, gear, manufacturer)
- Reservation Management: Reserve cars, view upcoming reservations, and leave ratings
- Password Recovery: Recover forgotten passwords using a secure flow
- Admin Dashboard: Admin users can manage vehicles, locations, and reservations
- Interactive Maps: Locate rental locations via interactive maps using Leaflet
- Responsive Design: Mobile-friendly design powered by Tailwind CSS
  Technologies Used
- React: A JavaScript library for building user interfaces
- TypeScript: Enhances JavaScript with static typing for better developer experience
- Tailwind CSS: A utility-first CSS framework for quickly designing responsive layouts
- Ant Design: Provides elegant UI components such as modals and forms
- React Router: A routing library for seamless page navigation
- Axios: Simplifies HTTP requests for API integration
- Leaflet: A JavaScript library for interactive maps used to display rental locations
- Plain JavaScript: Simplified API service layer in api.js for handling HTTP requests
  User-Friendly Design
  This application was built with a focus on simplicity and ease of use. The UI is intuitive, making it easy for users to browse cars, filter by various criteria, and make reservations within just a few clicks. For the convenience of users, the password recovery feature allows seamless resetting of forgotten credentials.

Why Leaflet?
To enhance the overall experience, Leaflet is integrated for interactive map functionality. Users can easily visualize and navigate to rental locations, making it convenient to find available vehicles near them.

Installation
Clone the repository:

```bash
git clone https://github.com/your-username/rent-a-car.git
```
Navigate to the project directory:
```bash
cd rent-a-car
```
Install dependencies:
```bash
npm install
```
Running the Application
To start the development server, run:

```bash
npm start
```
This will start the application on http://localhost:3000.

Project Structure
``` bash
Copy code
├── public
├── src
│ ├── components
│ ├── pages
│ ├── Shared
│ ├── styles
│ ├── App.tsx
│ ├── index.tsx
│ ├── api.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```
components: Contains reusable UI components (e.g., buttons, forms)
pages: Contains the different pages for the application (e.g., SignInPage, VehicleList, AdminPage)
Shared: Contains shared utilities like the api.js file which simplifies the interaction with the backend using plain JavaScript
styles: Contains global styles, utilities, and Tailwind configurations
Contributing
Feel free to submit issues or pull requests if you would like to contribute to this project.
