export type UserRole = "customer" | "cleaner";

export type VerificationStatus =
  | "PENDING_VERIFICATION"
  | "VERIFIED"
  | "REJECTED"
  | "SUSPENDED";

export type AppUser = {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  phone: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
};
