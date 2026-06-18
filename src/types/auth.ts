export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  areasOfInterest: string[];
  userType?: "user" | "counselor";
  isVerified?: boolean;
  guestName?: string;
  location?: {
    country?: string;
    city?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  profilePicture?: string;
  role: "user" | "counselor" | "admin" | "superadmin";
  isActive: boolean;
  lastLogin?: string;
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      sessionReminders: boolean;
      chatMessages: boolean;
    };
    privacy: {
      showOnlineStatus: boolean;
      allowDirectMessages: boolean;
    };
  };
  socialAuth?: {
    google?: {
      id: string;
      email: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  guestToken: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword?: string;
  token?: string;
}

export interface ContactUsFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
