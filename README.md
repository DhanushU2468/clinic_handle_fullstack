# HealthCare Pro Frontend

A modern, responsive healthcare management system built with Next.js 15, TypeScript, and Tailwind CSS 4.

## Features

### 🏥 Core Healthcare Management
- **Patient Management**: Complete patient records with search, filter, and CRUD operations
- **Doctor Management**: Doctor profiles, schedules, and availability
- **Appointment Scheduling**: Calendar-based appointment booking with real-time updates
- **Queue Management**: Real-time waiting queue with status tracking
- **Dashboard Analytics**: Comprehensive statistics and insights

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Component Library**: Reusable UI components (Button, Card, Sidebar, etc.)
- **Dark Mode Support**: Built-in dark mode compatibility
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation

### 🔧 Technical Features
- **TypeScript**: Full type safety across the application
- **Next.js 15**: Latest features with App Router
- **Tailwind CSS 4**: Modern utility-first styling
- **Real-time Updates**: WebSocket-ready architecture
- **API Integration**: RESTful API consumption patterns

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons
- **State Management**: React Hooks
- **Routing**: Next.js App Router
- **Build Tool**: Turbopack

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── patients/
│   │   ├── appointments/
│   │   ├── queue/
│   │   ├── login/
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   └── layout/
│   │       └── Sidebar.tsx
├── public/
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Pages

- **Login**: `/login` - Authentication page
- **Dashboard**: `/dashboard` - Main dashboard with statistics
- **Patients**: `/patients` - Patient management
- **Appointments**: `/appointments` - Appointment scheduling
- **Queue**: `/queue` - Real-time waiting queue
- **Doctors**: `/doctors` - Doctor management (coming soon)

## Component Usage

### Button Component
```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>
```

### Card Component
```tsx
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

## API Integration

The frontend is designed to work with the backend API. Key endpoints:

- **Authentication**: `/api/auth/login`
- **Patients**: `/api/patients`
- **Appointments**: `/api/appointments`
- **Queue**: `/api/queue`
- **Doctors**: `/api/doctors`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
