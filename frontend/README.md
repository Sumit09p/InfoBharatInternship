# BabbaFly Frontend

A modern, production-ready marketplace frontend built with React, Vite, Tailwind CSS, and shadcn UI components.

## Features

- 🎨 Beautiful, clean light UI with Tailwind CSS
- 🔐 JWT authentication with protected routes
- 📱 Fully responsive design
- 🛍️ Browse and create listings
- 👤 User profile management
- 🔍 Advanced search and filtering
- 🏷️ Category-based browsing

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── api/              # API client and service functions
│   │   ├── axiosClient.js
│   │   ├── auth.js
│   │   ├── listings.js
│   │   └── categories.js
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ListingCard.jsx
│   │   ├── CategoryBadge.jsx
│   │   ├── Loader.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/          # React context providers
│   │   └── AuthContext.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Listings.jsx
│   │   ├── ListingDetails.jsx
│   │   ├── CreateListing.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## API Integration

The frontend connects to the backend API at the base URL specified in `.env`. All API calls are made through:

- `axiosClient.js` - Configured Axios instance with auth interceptors
- Service modules in `api/` folder for organized API calls

### Authentication

- JWT tokens are stored in localStorage
- Auth interceptor automatically adds tokens to requests
- Protected routes redirect to login if not authenticated

## Pages

- **Home** (`/`) - Landing page with featured listings and categories
- **Listings** (`/listings`) - Browse all listings with filters
- **Listing Details** (`/listings/:id`) - View individual listing
- **Create Listing** (`/create-listing`) - Create new listing (protected)
- **Profile** (`/profile`) - User profile and listings (protected)
- **Login** (`/login`) - User login
- **Register** (`/register`) - User registration

## Components

- **Navbar** - Main navigation with auth state
- **Footer** - Site footer with links
- **ListingCard** - Card component for displaying listings
- **CategoryBadge** - Badge for category display
- **Loader** - Loading spinner component
- **ProtectedRoute** - Route wrapper for authenticated pages

## Development

The app uses Vite for fast development with HMR (Hot Module Replacement). Any changes to files will automatically reload in the browser.

## Production Deployment

1. Build the app: `npm run build`
2. Serve the `dist` directory with a static file server
3. Ensure the backend API is accessible at the configured URL
4. Update CORS settings on the backend if needed

