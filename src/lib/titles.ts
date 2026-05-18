export function memberTitleFromPath(pathname: string) {
  if (pathname.startsWith("/dashboard")) return "Home";
  if (pathname.startsWith("/ai")) return "AI Assistant";
  if (pathname.startsWith("/resources/my-uploads")) return "My uploads";
  if (pathname.startsWith("/resources/upload")) return "Upload resource";
  if (pathname.startsWith("/resources")) return "Resources";
  if (pathname.startsWith("/community")) return "Community";
  if (pathname.startsWith("/billing")) return "Billing";
  if (pathname.startsWith("/settings")) return "Settings";
  return "LoomRX";
}

export function adminTitleFromPath(pathname: string) {
  if (pathname === "/admin" || pathname === "/admin/") return "Admin overview";
  if (pathname.startsWith("/admin/members")) return "Members";
  if (pathname.startsWith("/admin/resources")) return "Resource management";
  if (pathname.startsWith("/admin/moderation")) return "Moderation";
  if (pathname.startsWith("/admin/ai")) return "AI & knowledge";
  if (pathname.startsWith("/admin/circle-mapping")) return "Circle mapping";
  return "Admin";
}
