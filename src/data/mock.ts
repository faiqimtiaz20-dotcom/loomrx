export const CIRCLE_SPACES = [
  { id: "general", name: "General lounge", minTier: "starter" as const },
  { id: "growth-lab", name: "Growth lab", minTier: "growth" as const },
  { id: "exec", name: "Enterprise roundtable", minTier: "enterprise" as const },
];

export type MockResource = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  tier: "starter" | "growth" | "enterprise";
  updatedAt: string;
  /** When false, hidden from member library (admin mock publish state). */
  published?: boolean;
};

export const MOCK_RESOURCES: MockResource[] = [
  {
    id: "r1",
    title: "Clinic intake checklist",
    description: "Front-desk intake steps aligned for outpatient clinics.",
    category: "Operations",
    type: "PDF",
    tier: "starter",
    updatedAt: "2026-05-01",
  },
  {
    id: "r2",
    title: "Marketing email — reactivation",
    description: "Template sequence for dormant patient reactivation.",
    category: "Marketing",
    type: "DOCX",
    tier: "growth",
    updatedAt: "2026-05-14",
  },
  {
    id: "r3",
    title: "Enterprise KPI dashboard spec",
    description: "Blueprint for multi-location reporting.",
    category: "Strategy",
    type: "PDF",
    tier: "enterprise",
    updatedAt: "2026-05-10",
  },
];

export const MOCK_ADMIN_MEMBERS = [
  {
    id: "m1",
    name: "Jordan Lee",
    email: "jordan@example.com",
    tier: "growth" as const,
    status: "active" as const,
    createdAt: "2026-04-02",
  },
  {
    id: "m2",
    name: "Sam Rivera",
    email: "sam@example.com",
    tier: "starter" as const,
    status: "canceled" as const,
    createdAt: "2026-03-18",
  },
];

export const MOCK_MODERATION = [
  {
    id: "mod1",
    title: "Custom SOAP note helper",
    submitter: "jordan@example.com",
    submittedAt: "2026-05-10",
    status: "pending" as const,
  },
  {
    id: "mod2",
    title: "Recall flyer — draft v2",
    submitter: "sam@example.com",
    submittedAt: "2026-05-09",
    status: "pending" as const,
  },
  {
    id: "mod3",
    title: "Staffing matrix template",
    submitter: "jordan@example.com",
    submittedAt: "2026-05-08",
    status: "pending" as const,
  },
  {
    id: "mod4",
    title: "Vendor comparison sheet",
    submitter: "ops@example.com",
    submittedAt: "2026-05-07",
    status: "pending" as const,
  },
  {
    id: "mod5",
    title: "HIPAA checklist — custom",
    submitter: "sam@example.com",
    submittedAt: "2026-05-06",
    status: "pending" as const,
  },
  {
    id: "mod6",
    title: "On-call script pack",
    submitter: "jordan@example.com",
    submittedAt: "2026-05-05",
    status: "pending" as const,
  },
  {
    id: "mod7",
    title: "Budget rollup workbook",
    submitter: "finance@example.com",
    submittedAt: "2026-05-04",
    status: "pending" as const,
  },
];

export const TIER_LABELS = {
  starter: "Starter",
  growth: "Growth",
  enterprise: "Enterprise",
} as const;
