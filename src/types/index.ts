// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  avatar?: string;
  role: 'customer' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Service Types
export interface ServiceType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerSqFt?: number;
  icon: string;
  category: 'repair' | 'replacement' | 'maintenance';
  estimatedDuration: string;
  isActive: boolean;
}

export interface MeshType {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
  durability: 'standard' | 'heavy-duty' | 'pet-resistant';
  uvProtection: boolean;
  color: string;
}

// Quote and Request Types
export interface ServiceRequest {
  id: string;
  userId: string;
  serviceTypeId: string;
  meshTypeId: string;
  status: 'pending' | 'quoted' | 'approved' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Project Details
  description: string;
  poolDimensions?: PoolDimensions;
  damageDescription?: string;
  urgencyReason?: string;
  
  // Quote Information
  quote?: Quote;
  approvedQuote?: Quote;
  
  // Scheduling
  preferredDate?: string;
  scheduledDate?: string;
  estimatedCompletion?: string;
  
  // Progress Tracking
  progress: number; // 0-100
  milestones: Milestone[];
  
  // Media
  photos: string[];
  videos?: string[];
  
  // Notes
  customerNotes?: string;
  technicianNotes?: string;
  adminNotes?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface Quote {
  id: string;
  requestId: string;
  amount: number;
  breakdown: PriceBreakdown;
  validUntil: string;
  notes?: string;
  terms: string;
  createdAt: string;
}

export interface PriceBreakdown {
  labor: number;
  materials: {
    mesh: number;
    frame: number;
    hardware: number;
  };
  travel: number;
  taxes: number;
  discounts?: {
    type: string;
    amount: number;
  }[];
  total: number;
}

export interface PoolDimensions {
  length: number;
  width: number;
  height: number;
  area: number;
  perimeter: number;
  wallType: 'screen' | 'solid' | 'mixed';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  completedAt?: string;
  notes?: string;
}

// Contact Form Types
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  urgency: 'low' | 'medium' | 'high';
  preferredContact: 'email' | 'phone' | 'text';
  bestTime: string;
}

// UI State Types
export interface UIState {
  isLoading: boolean;
  isMenuOpen: boolean;
  activeModal: string | null;
  notifications: Notification[];
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actions?: {
    label: string;
    action: () => void;
  }[];
}

// App State
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  serviceRequests: ServiceRequest[];
  serviceTypes: ServiceType[];
  meshTypes: MeshType[];
  ui: UIState;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Validation Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// Analytics Types
export interface ServiceMetrics {
  totalRequests: number;
  completedRequests: number;
  averageCompletionTime: string;
  customerSatisfaction: number;
  revenue: number;
  popularServices: {
    service: string;
    count: number;
    revenue: number;
  }[];
}

// Configuration Types
export interface AppConfig {
  apiUrl: string;
  supabaseUrl: string;
  supabaseKey: string;
  googleMapsApiKey: string;
  enableAnalytics: boolean;
  enableChat: boolean;
  businessHours: {
    open: string;
    close: string;
    days: string[];
  };
  serviceAreas: string[];
}