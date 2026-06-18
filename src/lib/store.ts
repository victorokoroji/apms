import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Role = "ceo" | "team_leader" | "call_rep";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  teamId?: string;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (role: Role) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}

export const ROLE_USERS: Record<Role, AuthUser> = {
  ceo: {
    id: "u-ceo",
    name: "Adaeze Okafor",
    email: "adaeze@admordglobal.com",
    role: "ceo",
  },
  team_leader: {
    id: "u-tl-1",
    name: "Tunde Bello",
    email: "tunde@admordglobal.com",
    role: "team_leader",
    teamId: "t-1",
  },
  call_rep: {
    id: "u-cr-1",
    name: "Chioma Eze",
    email: "chioma@admordglobal.com",
    role: "call_rep",
    teamId: "t-1",
  },
};

export const ROLE_LABELS: Record<Role, string> = {
  ceo: "Chief Executive Officer",
  team_leader: "Team Leader",
  call_rep: "Call Representative",
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (role) => set({ user: ROLE_USERS[role], isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setRole: (role) => set({ user: ROLE_USERS[role], isAuthenticated: true }),
    }),
    {
      name: "apms-auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/**
 * Hook for components rendered inside <AuthGuard>, where `user` is guaranteed
 * to be non-null. Returns a fallback CEO user during SSR/hydration to avoid
 * crashes; the guard prevents real rendering until the real user is loaded.
 */
export const useAuthedUser = (): AuthUser => {
  const user = useAuth((s) => s.user);
  return user ?? ROLE_USERS.ceo;
};
