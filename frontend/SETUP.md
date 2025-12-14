# Quick Setup Guide

## 1. Install Dependencies

```bash
cd frontend
npm install
```

## 2. Environment Configuration

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Note:** Make sure your backend server is running on port 5000 before starting the frontend.

## 3. Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Troubleshooting

- **CORS errors**: Make sure your backend has CORS enabled and allows requests from `http://localhost:5173`
- **API connection issues**: Verify the `VITE_API_BASE_URL` in `.env` matches your backend URL
- **Authentication not working**: Check that JWT tokens are being stored in localStorage and the backend is returning tokens correctly

