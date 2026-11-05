1. User Searches Your Website
URL: /
Page Rendered: Home Page
What Happens:
When a user searches for your website or enters the website's URL, they land on the Home Page.
This is the public-facing page, where the user might see an introduction to your services, features, or navigation options.
From here, the user is presented with various options, such as logging in, registering, or accessing services (like making an appointment or viewing health records).
2. User Wants to Access Services (E.g., Book an Appointment)
URL: /appointment
Page Rendered: Appointment Page
What Happens:
If a user is looking for a service, such as booking an appointment, they may click on a button or link that leads them to the Appointment Page.
This page may display available appointments, a form to book a service, or a calendar to select dates.
However, if the user is not logged in, they cannot access this service directly, so they are prompted to log in.
3. User Is Redirected to the Login Page
URL: /login
Page Rendered: Login Page
What Happens:
Upon attempting to access the appointment or any protected service, the user is redirected to the Login Page because accessing appointments requires authentication.
Here, the user will enter their credentials (email and password) to log in.
If the user does not have an account yet, they are given the option to Register.
4. User Logs In Successfully
URL: /dashboard
Page Rendered: Dashboard
What Happens:
After entering the correct login credentials, the user is redirected to their Dashboard, which serves as their main hub or homepage after logging in.
On the dashboard, the user can access more personalized features, like viewing health records, updating their profile, or making further appointments.
This page gives the user a high-level overview of their account, services, and options.
5. User Wants to View or Edit Their Profile
URL: /userdetails
Page Rendered: User Details Page
What Happens:
From the dashboard, the user might want to view or edit their personal details (e.g., name, address, phone number).
They can click on a profile link that takes them to the User Details Page.
This page displays their profile information and allows them to update it. After making changes, the user can save the updated details.
6. User Wants to Make Changes to Their Health Records or Orders
URL: /healthrecords or /orders
Page Rendered: Health Records or Orders Page
What Happens:
If the user wants to see their health records, they can navigate to the Health Records Page from the dashboard or another link.
Similarly, if the user wants to view or manage orders, they can go to the Orders Page.
These pages display relevant information like past appointments, prescriptions, and any items ordered (e.g., medical supplies).
7. User Logs Out
URL: /logout
Page Rendered: N/A (Redirects to Home Page)
What Happens:
If the user decides to log out, they can click the logout link, which will redirect them to the home page (/).
After logging out, the user will be redirected to the home page, and they will no longer have access to any protected routes (e.g., dashboard, appointments) until they log in again.





Home Page (/) -> Appointment Page (/appointment) -> Login Page (/login)
       |                                  |
       v                                  v
Dashboard Page (/dashboard) -> User Details Page (/userdetails)
       |
       v
Health Records Page (/healthrecords) -> Orders Page (/orders)
       |
       v
Logout Page (/logout) -> Home Page (/) ->
