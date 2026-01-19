export type Role = "customer" | "cleaner";
export type VerificationStatus = "PENDING_VERIFICATION" | "VERIFIED" | "REJECTED";

export type User = {
  fullName: string;
  email: string;
  role: Role;
  verificationStatus: VerificationStatus;
};

const STORAGE_KEY = "cc_user";

export function createUser(input: { fullName: string; email: string; role: Role }) {
  const user: User = {
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    role: input.role,
    verificationStatus: "PENDING_VERIFICATION",
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setVerificationStatus(status: VerificationStatus) {
  const user = getCurrentUser();
  if (!user) return;
  const updated = { ...user, verificationStatus: status };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function signOut() {
  localStorage.removeItem(STORAGE_KEY);
}
