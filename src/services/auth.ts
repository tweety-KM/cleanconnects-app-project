import type { AppUser, UserRole, VerificationStatus } from "../types/auth";

const USER_KEY = "cc_user";

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function makeId() {
  // simple id for demo; later replace with Cognito user sub
  return "cc_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function getCurrentUser(): AppUser | null {
  return safeJsonParse<AppUser>(localStorage.getItem(USER_KEY));
}

export function setCurrentUser(user: AppUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function signOut() {
  localStorage.removeItem(USER_KEY);
}

export type SignupInput = {
  role: UserRole;
  fullName: string;
  email: string;
  phone: string;
};

export function signUpDemo(input: SignupInput): AppUser {
  const user: AppUser = {
    id: makeId(),
    role: input.role,
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    verificationStatus: "PENDING_VERIFICATION",
    createdAt: new Date().toISOString(),
  };

  setCurrentUser(user);
  return user;
}

// Demo-only helper: simulate admin verification later
export function setVerificationStatus(status: VerificationStatus) {
  const user = getCurrentUser();
  if (!user) return;
  const updated: AppUser = { ...user, verificationStatus: status };
  setCurrentUser(updated);
}
