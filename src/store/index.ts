import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { 
  User, 
  ServiceRequest, 
  ServiceType, 
  MeshType, 
  UIState, 
  AppConfig
} from '@/types';

// Authentication Store
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuth: boolean) => void;
  setLoading: (loading: boolean) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: null,

        setUser: (user) => set({ user, isAuthenticated: !!user }),
        
        setAuthenticated: (isAuth) => set({ isAuthenticated: isAuth }),
        
        setLoading: (loading) => set({ isLoading: loading }),
        
        setToken: (token) => set({ token }),

        logout: () => set({ 
          user: null, 
          isAuthenticated: false, 
          token: null 
        }),

        login: async (_email, _password) => {
          set({ isLoading: true });
          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const mockUser: User = {
              id: '1',
              email: 'john@example.com',
              firstName: 'John',
              lastName: 'Doe',
              phone: '(555) 123-4567',
              role: 'customer',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            
            const mockToken = 'mock-jwt-token-' + Date.now();
            
            set({ 
              user: mockUser, 
              isAuthenticated: true, 
              token: mockToken,
              isLoading: false 
            });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },

        register: async (userData) => {
          set({ isLoading: true });
          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newUser: User = {
              id: Date.now().toString(),
              email: userData.email!,
              firstName: userData.firstName!,
              lastName: userData.lastName!,
              phone: userData.phone,
              role: 'customer',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            
            set({ 
              user: newUser, 
              isAuthenticated: true, 
              token: 'mock-jwt-token-' + Date.now(),
              isLoading: false 
            });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },

        updateProfile: async (updates) => {
          const { user } = get();
          if (!user) throw new Error('No user logged in');
          
          set({ isLoading: true });
          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const updatedUser = { ...user, ...updates, updatedAt: new Date().toISOString() };
            set({ user: updatedUser, isLoading: false });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ 
          user: state.user, 
          isAuthenticated: state.isAuthenticated,
          token: state.token 
        }),
      }
    ),
    { name: 'auth-store' }
  )
);

// Service Requests Store
interface ServiceRequestsStore {
  requests: ServiceRequest[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setRequests: (requests: ServiceRequest[]) => void;
  addRequest: (request: ServiceRequest) => void;
  updateRequest: (id: string, updates: Partial<ServiceRequest>) => void;
  removeRequest: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchRequests: () => Promise<void>;
  createRequest: (requestData: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt'>) => Promise<ServiceRequest>;
}

export const useServiceRequestsStore = create<ServiceRequestsStore>()(
  devtools(
    (_set, _get) => ({
      requests: [],
      isLoading: false,
      error: null,

      setRequests: (requests) => set({ requests }),
      
      addRequest: (request) => set((state) => ({ 
        requests: [request, ...state.requests] 
      })),
      
      updateRequest: (id, updates) => set((state) => ({
        requests: state.requests.map(req => 
          req.id === id ? { ...req, ...updates, updatedAt: new Date().toISOString() } : req
        )
      })),
      
      removeRequest: (id) => set((state) => ({
        requests: state.requests.filter(req => req.id !== id)
      })),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),

      fetchRequests: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockRequests: ServiceRequest[] = [
            {
              id: '1',
              userId: '1',
              serviceTypeId: 'screen-repair',
              meshTypeId: 'standard-mesh',
              status: 'completed',
              priority: 'medium',
              description: 'Torn screen panel on south side of pool enclosure',
              poolDimensions: {
                length: 40,
                width: 20,
                height: 12,
                area: 800,
                perimeter: 120,
                wallType: 'screen'
              },
              damageDescription: 'Large tear from storm damage',
              quote: {
                id: 'quote-1',
                requestId: '1',
                amount: 350,
                breakdown: {
                  labor: 200,
                  materials: { mesh: 100, frame: 30, hardware: 20 },
                  travel: 0,
                  taxes: 0,
                  total: 350
                },
                validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
                terms: 'Valid for 7 days. Includes materials and labor.'
              },
              approvedQuote: undefined,
              progress: 100,
              milestones: [
                {
                  id: 'milestone-1',
                  title: 'Initial Assessment',
                  description: 'Technician assessed the damage',
                  status: 'completed',
                  completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                  id: 'milestone-2',
                  title: 'Materials Prepared',
                  description: 'All materials gathered and prepared',
                  status: 'completed',
                  completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                  id: 'milestone-3',
                  title: 'Screen Replacement',
                  description: 'New screen panel installed',
                  status: 'completed',
                  completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
                }
              ],
              photos: ['/images/project-1.jpg'],
              createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            }
          ];
          
          set({ requests: mockRequests, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch requests', isLoading: false });
        }
      },

      createRequest: async (requestData) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newRequest: ServiceRequest = {
            ...requestData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          set((state) => ({
            requests: [newRequest, ...state.requests],
            isLoading: false
          }));
          
          return newRequest;
        } catch (error) {
          set({ error: 'Failed to create request', isLoading: false });
          throw error;
        }
      },
    }),
    { name: 'service-requests-store' }
  )
);

// Configuration Store
interface ConfigStore {
  serviceTypes: ServiceType[];
  meshTypes: MeshType[];
  config: AppConfig | null;
  isLoading: boolean;
  
  // Actions
  setServiceTypes: (types: ServiceType[]) => void;
  setMeshTypes: (types: MeshType[]) => void;
  setConfig: (config: AppConfig) => void;
  setLoading: (loading: boolean) => void;
  initializeConfig: () => Promise<void>;
}

export const useConfigStore = create<ConfigStore>()(
  devtools(
    (_set, _get) => ({
      serviceTypes: [],
      meshTypes: [],
      config: null,
      isLoading: false,

      setServiceTypes: (types) => set({ serviceTypes: types }),
      setMeshTypes: (types) => set({ meshTypes: types }),
      setConfig: (config) => set({ config }),
      setLoading: (loading) => set({ isLoading: loading }),

      initializeConfig: async () => {
        set({ isLoading: true });
        try {
          // Mock service types
          const mockServiceTypes: ServiceType[] = [
            {
              id: 'screen-repair',
              name: 'Screen Repair',
              description: 'Quick fixes for torn panels and worn-out mesh',
              basePrice: 150,
              pricePerSqFt: 2.50,
              icon: 'hammer',
              category: 'repair',
              estimatedDuration: '1-2 hours',
              isActive: true,
            },
            {
              id: 'full-rescreen',
              name: 'Full Rescreen',
              description: 'Complete restoration of your pool cage',
              basePrice: 800,
              pricePerSqFt: 3.00,
              icon: 'home',
              category: 'replacement',
              estimatedDuration: '4-8 hours',
              isActive: true,
            },
            {
              id: 'storm-damage',
              name: 'Storm Damage Repair',
              description: 'Fast priority response for hurricane and storm damage',
              basePrice: 200,
              pricePerSqFt: 3.50,
              icon: 'wind',
              category: 'repair',
              estimatedDuration: '2-4 hours',
              isActive: true,
            },
            {
              id: 'pressure-washing',
              name: 'Pressure Washing',
              description: 'Deep cleaning for your pool deck and cage structure',
              basePrice: 250,
              icon: 'droplets',
              category: 'maintenance',
              estimatedDuration: '2-3 hours',
              isActive: true,
            },
          ];

          // Mock mesh types
          const mockMeshTypes: MeshType[] = [
            {
              id: 'standard-mesh',
              name: 'Phifer 18/14 Standard',
              description: 'Standard mesh for most applications',
              priceMultiplier: 1.0,
              durability: 'standard',
              uvProtection: true,
              color: 'gray',
            },
            {
              id: 'tuff-screen',
              name: 'Tuff Screen Pet-Resistant',
              description: 'Heavy-duty mesh perfect for homes with pets',
              priceMultiplier: 1.5,
              durability: 'pet-resistant',
              uvProtection: true,
              color: 'gray',
            },
            {
              id: 'no-see-um',
              name: 'No-See-Um Mesh',
              description: 'Ultra-fine mesh to keep even the smallest bugs out',
              priceMultiplier: 2.0,
              durability: 'heavy-duty',
              uvProtection: true,
              color: 'gray',
            },
          ];

          const mockConfig: AppConfig = {
            apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
            supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
            supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
            googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
            enableAnalytics: true,
            enableChat: true,
            businessHours: {
              open: '08:00',
              close: '17:00',
              days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            },
            serviceAreas: ['St. Petersburg', 'Clearwater', 'Tampa', 'Largo', 'Pinellas Park'],
          };

          set({
            serviceTypes: mockServiceTypes,
            meshTypes: mockMeshTypes,
            config: mockConfig,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    { name: 'config-store' }
  )
);

// UI Store
interface UIStore extends UIState {
  // Actions
  setLoading: (loading: boolean) => void;
  setMenuOpen: (open: boolean) => void;
  setActiveModal: (modal: string | null) => void;
  addNotification: (notification: Omit<import('@/types').Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    (_set, _get) => ({
      isLoading: false,
      isMenuOpen: false,
      activeModal: null,
      notifications: [],
      theme: 'light',
      sidebarCollapsed: false,

      setLoading: (loading) => set({ isLoading: loading }),
      setMenuOpen: (open) => set({ isMenuOpen: open }),
      setActiveModal: (modal) => set({ activeModal: modal }),

      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            ...notification,
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            isRead: false,
          },
          ...state.notifications,
        ].slice(0, 50), // Keep only latest 50 notifications
      })),

      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id),
      })),

      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n =>
          n.id === id ? { ...n, isRead: true } : n
        ),
      })),

      setTheme: (theme) => set({ theme }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      clearNotifications: () => set({ notifications: [] }),
    }),
    { name: 'ui-store' }
  )
);