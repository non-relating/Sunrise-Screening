# Sunrise Screening - Modern Reactive Web Application

A fully reactive, modern web application for Sunrise Screening, a pool screen repair service in St. Petersburg, Florida. Built with React, TypeScript, Vite, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Advanced State Management**: Zustand with persistence and devtools
- **Smooth Animations**: Framer Motion for fluid micro-interactions
- **Type-Safe Development**: Full TypeScript coverage
- **SEO Optimized**: Meta tags, Open Graph, and structured data

### User Experience
- **Progressive Enhancement**: Works without JavaScript
- **Fast Loading**: Code splitting and lazy loading
- **Accessible**: WCAG 2.1 AA compliant
- **PWA Ready**: Service worker and offline capabilities
- **Real-time Updates**: Live status tracking and notifications

### Business Features
- **Customer Portal**: Login/registration with service history
- **Admin Dashboard**: Manage requests and business operations
- **Service Configurator**: Interactive quote calculator
- **Contact Management**: Working contact forms with validation
- **Service Areas**: Geographic coverage and scheduling

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Zustand** - State management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Testing Library** - Component testing
- **TypeScript** - Static type checking

### UI Components
- **Lucide React** - Icon library
- **Headless UI** - Unstyled, accessible components
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 📁 Project Structure

```
sunrise-screening/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # UI components
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Page components
│   │   └── auth/         # Authentication pages
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sunrise-screening
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure environment variables:
   ```env
   VITE_API_URL=http://localhost:3001
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI

## 🏗️ Architecture

### State Management
The application uses Zustand for state management with the following stores:

- **AuthStore**: User authentication and session management
- **ServiceRequestsStore**: Service request data and operations
- **ConfigStore**: Application configuration and settings
- **UIStore**: UI state and user interface management

### Component Architecture
- **Layout Components**: Header, Footer, Navigation
- **Page Components**: Individual route components
- **UI Components**: Reusable, atomic components
- **Custom Hooks**: Business logic and side effects

### Routing Structure
```
/                    - Home page
/services            - Services overview
/quote              - Quote calculator
/contact            - Contact information
/login              - User login
/register           - User registration
/portal/*           - Customer portal (protected)
/admin/*            - Admin dashboard (protected)
```

## 🎨 Design System

### Colors
- **Primary**: Blue shades for trust and reliability
- **Accent**: Amber/orange for calls-to-action
- **Neutral**: Slate grays for text and backgrounds

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300-900
- **Responsive**: Fluid typography scaling

### Components
- **Cards**: Consistent container styling
- **Buttons**: Primary, secondary, and ghost variants
- **Forms**: Standardized input styling
- **Navigation**: Mobile-responsive menu system

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile-First Approach
- Progressive enhancement from mobile
- Touch-friendly interface elements
- Optimized performance on mobile devices

## 🔒 Security

### Authentication
- JWT token-based authentication
- Secure password handling
- Session management with persistence
- Protected routes and API calls

### Data Protection
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure headers configuration

## 🚀 Deployment

### Build Process

1. **Production build**
   ```bash
   npm run build
   ```

2. **Optimize assets**
   - Automatic code splitting
   - Asset optimization
   - CSS purging
   - Bundle analysis

### Deployment Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

#### Traditional Hosting
```bash
npm run build
# Upload dist/ folder to web server
```

### Environment Variables
Set the following environment variables in your deployment platform:

```
VITE_API_URL=https://your-api-url.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Component Tests
```bash
npm run test:ui
```

### Coverage Report
```bash
npm run test:coverage
```

## 📊 Performance

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and font optimization
- **Caching**: Aggressive caching strategies
- **Performance Monitoring**: Web Vitals tracking

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔧 Configuration

### Vite Configuration
- Path aliases for clean imports
- Environment variable handling
- Build optimization settings
- Development server configuration

### Tailwind Configuration
- Custom color palette
- Extended spacing scale
- Custom animations
- Responsive breakpoints

### TypeScript Configuration
- Strict mode enabled
- Path mapping for clean imports
- Modern ECMAScript targets
- React JSX configuration

## 📈 Analytics & Monitoring

### Performance Monitoring
- Core Web Vitals tracking
- Error boundary implementation
- Performance metrics collection

### User Analytics
- Page view tracking
- User interaction events
- Conversion funnel analysis
- A/B testing support

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Submit pull request

### Code Standards
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component documentation

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: info@sunrisescreening.com
- Phone: (555) 123-4567
- Website: https://sunrisescreening.com

---

Built with ❤️ for Sunrise Screening - Making Florida backyards beautiful since 2010.