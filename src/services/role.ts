import type { UserRole } from "../types/auth";

const KEY = "cc_role";

export function setRole(role: UserRole) {
  localStorage.setItem(KEY, role);
}

export function getRole(): UserRole | null {
  const value = localStorage.getItem(KEY);
  if (value === "customer" || value === "cleaner") return value;
  return null;
}

export function clearRole() {
  localStorage.removeItem(KEY);
}
