export const ROLE_SIDEBAR: Record<string, string[]> = {
  "Super Admin": ["all"],
  "Hotel Owner": ["all"],
  "Manager": [
    "Dashboard", "Reservations", "Guests", "Rooms",
    "Housekeeping", "Event Halls", "Payments", "Analytics",
    "CRM", "AI Concierge", "Notifications", "Reports", "Staff",
  ],
  "Receptionist": [
    "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  ],
  "Housekeeping": [
    "Dashboard", "Housekeeping", "Rooms",
  ],
  "Finance": [
    "Dashboard", "Payments", "Analytics", "Reports",
  ],
};

export function canAccessPage(role: string, page: string): boolean {
  const access = ROLE_SIDEBAR[role] || ["all"];
  if (access.includes("all")) return true;
  return access.includes(page);
}

export function getAccessiblePages(role: string): string[] {
  return ROLE_SIDEBAR[role] || [];
}