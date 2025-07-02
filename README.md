#WildTrack: Safari Wildlife Sighting Platform

[![CI Status](https://github.com/[your-username]/wildtrack-safari-platform/workflows/WildTrack%20CI%20Pipeline/badge.svg)](https://github.com/[your-username]/wildtrack-safari-platform/actions)
[![Coverage Status](https://codecov.io/gh/[your-username]/wildtrack-safari-platform/branch/main/graph/badge.svg)](https://codecov.io/gh/[your-username]/wildtrack-safari-platform)

## Project Description

WildTrack is a real-time wildlife sighting tracking platform designed specifically for safari lodges, guides, and guests. The platform allows users to log animal sightings with GPS coordinates and photos, creating a live map of wildlife activity that enhances safari experiences and helps lodges optimize game drive routes.

### Problem Statement
Traditional safari operations rely on radio communication and memory to track wildlife sightings, leading to:
- Missed opportunities for optimal guest experiences
- Poor coordination between safari guides
- Limited data for conservation efforts
- Inefficient game drive route planning

### Solution
WildTrack provides a centralized platform where safari guides and guests can log real-time wildlife sightings, creating a dynamic database that benefits:
- **Safari Guides**: Access to real-time sighting data for better route planning
- **Lodge Management**: Analytics and reporting for operational optimization
- **Guests**: Enhanced safari experience with species information and activity tracking
- **Conservation**: Data collection for wildlife monitoring and research

##  Key Features

### User Management System
- Role-based access control (Guides, Guests, Management)
- Secure authentication and authorization
- User profile management

### Wildlife Sighting Logging
- Quick sighting entry with species selection
- GPS coordinate capture and manual location entry
- Photo upload and attachment
- Timestamp and observer tracking
- Optional notes and behavioral observations

### Interactive Real-Time Map
- Live wildlife sighting visualization
- Filtering by species, time range, and location
- Route optimization suggestions for guides
- Heatmap view of wildlife activity

### Analytics Dashboard
- Wildlife activity trends and statistics
- Popular sighting locations identification
- Species frequency analysis
- Weekly and monthly reporting

### Species Information Hub
- Comprehensive species database with photos
- Educational content for guests
- Sighting statistics per species
- Conservation status information

## Architecture

### Technology Stack
- **Backend**: Node.js with Express.js framework
- **Frontend**: React.js with responsive design
- **Database**: PostgreSQL with geospatial support
- **Authentication**: JWT tokens with bcrypt encryption
- **File Storage**: AWS S3 (for production) / Local storage (development)
- **Maps**: Leaflet with OpenStreetMap tiles
- **API Integration**: Google Maps API for geocoding

### Project Structure
```
wildtrack-safari-platform/
├── backend/              # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/  # API route handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API route definitions
│   │   ├── middleware/   # Authentication & validation
│   │   └── utils/        # Helper functions
│   ├── tests/           # Backend unit & integration tests
│   └── package.json
├── frontend/            # React.js client application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── hooks/       # Custom React hooks
│   │   └── utils/       # Frontend utilities
│   ├── public/          # Static assets
│   └── package.json
├── docs/               # Project documentation
├── .github/workflows/  # CI/CD pipeline configuration
└── README.md
```

## Local Development Setup

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v13 or higher) - [Download here](https://postgresql.org/)
- **Git** - [Download here](https://git-scm.com/)
- **NPM** or **Yarn** package manager

### 1. Clone the Repository
```bash
git clone https://github.com/[your-username]/wildtrack-safari-platform.git
cd wildtrack-safari-platform
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb wildtrack_dev

# Create environment file
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your database credentials:
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wildtrack_dev
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key_here
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Run database migrations (when implemented)
npm run migrate

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:5000`

### 4. Frontend Setup
```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend application will be available at `http://localhost:3000`

### 5. Verify Setup
- Visit `http://localhost:5000/health` to check backend status
- Visit `http://localhost:3000` to access the frontend application

## Testing

### Backend Testing
```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Frontend Testing
```bash
cd frontend

# Run all tests
npm test

# Run tests with UI
npm run test:ui
```

## Code Quality

### Linting
```bash
# Backend linting
cd backend && npm run lint

# Frontend linting
cd frontend && npm run lint

# Auto-fix linting issues
npm run lint:fix
```

### Pre-commit Hooks
This project uses ESLint and Prettier to maintain code quality. The CI pipeline will automatically check code quality on pull requests.

## Build & Deployment

### Development Build
```bash
# Build frontend for development
cd frontend && npm run build
```

### Production Deployment
Deployment configurations and instructions will be added in future phases of the project.

## Contributing

### Git Workflow
1. Create feature branch from `develop`
2. Make your changes with descriptive commits
3. Write/update tests for new functionality
4. Ensure all tests pass and code is linted
5. Create Pull Request to `develop` branch
6. Request code review from team member
7. Merge after approval and CI checks pass

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Example:
```
feat(sightings): add GPS coordinate validation

- Add latitude/longitude range validation
- Include error messages for invalid coordinates
- Update tests for new validation rules

Closes #23
```

## Project Management

**Project Board**: [WildTrack Development Board](https://github.com/users/bvilane/projects/1)

**Current Sprint**: Phase 1 - Foundation & CI Setup

## Support & Contact

**Course**: Advanced DevOps  
**Student**: Bavukile Vilane - b.vilane@alustudent.com (ttps://github.com/bvilane)
**Project Phase**: 1 - Foundation & CI Setup

For questions or issues with this project, please create an issue on the GitHub repository.

## License

This project is developed as part of the Advanced DevOps course curriculum.

---

*Last Updated: July 2, 2025*