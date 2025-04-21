# Campus Gathering Grid

A web application for university events management, built with HTML, CSS (Tailwind), JavaScript, and PHP.

## Project Description

Campus Gathering Grid is a platform designed to connect students with campus events. It allows users to browse events, filter by category, view event details, and register for events.

## Features

- Responsive design for all screen sizes
- Home page with featured events
- Event filtering by category
- Detailed event pages
- Event registration system
- Mobile-friendly navigation

## Technologies Used

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- PHP
- No frameworks or libraries

## Project Structure


campus-gathering-grid/
├── index.html             # Home page
├── event-details.php      # Event details page
├── register.php           # Registration handler
├── css/
│   └── styles.css         # Custom CSS styles
├── js/
│   └── main.js            # JavaScript functionality
└── images/                # Image assets
    ├── logo.svg
    ├── campus-hero.jpg
    ├── event-placeholder.jpg
    └── events/            # Event images


## Setup Instructions

1. Clone this repository to your local machine or download the ZIP file
2. Place the files in your web server directory (e.g., htdocs, www, or public_html)
3. Ensure PHP is installed and configured on your web server
4. Access the site through your web server (e.g., http://localhost/campus-gathering-grid)

## Future Improvements

- Database integration for dynamic event data
- User authentication system
- Admin panel for managing events
- Event search functionality
- Comments and ratings for events
- Social media sharing

## Author

[Your Name]

## License

This project is created for educational purposes as a university assignment.

## Vercel Deployment

To make the backend services (MongoDB and other APIs) work on Vercel:

1. In your Vercel dashboard, go to your project settings
2. Navigate to the "Environment Variables" section
3. Add the following environment variables:
   - `MONGO_URI` = `mongodb+srv://vabblack:vaibhav23@campus-gathering.zg7neut.mongodb.net/?retryWrites=true&w=majority&appName=Campus-gathering`
   - `FRONTEND_URL` = `https://campus-gathering.vercel.app` (replace with your actual Vercel domain)
   - `JWT_SECRET` = `your-secure-jwt-secret-key` (use a strong, random string)
   - `EMAIL_USER` = Your Gmail address
   - `EMAIL_PASS` = Your Gmail app password (generated in Google account security settings)
   
4. Also add the frontend environment variable:
   - `VITE_API_URL` = `/api/auth` (this configures your React app to use the correct Vercel API routes)
   
5. Redeploy your application after setting these variables

Your MongoDB backend should now be properly connected to your Vercel deployment.
