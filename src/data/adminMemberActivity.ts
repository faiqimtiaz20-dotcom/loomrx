export type SubscriptionEventRow = {
  id: string;
  at: string;
  type: string;
  detail: string;
};

export type ActivityRow = {
  id: string;
  at: string;
  channel: string;
  summary: string;
};

const SUBSCRIPTION_EVENTS: SubscriptionEventRow[] = [
  { id: "se-1", at: "2026-05-10 09:12", type: "invoice.paid", detail: "Growth — monthly renewal succeeded" },
  { id: "se-2", at: "2026-04-10 08:40", type: "invoice.paid", detail: "Growth — monthly renewal succeeded" },
  { id: "se-3", at: "2026-03-12 14:02", type: "customer.subscription.updated", detail: "Tier changed Starter → Growth" },
];

const ACTIVITY: ActivityRow[] = [
  { id: "ac-1", at: "2026-05-15 11:20", channel: "AI", summary: "56 assistant messages (rolling 30d)" },
  { id: "ac-2", at: "2026-05-14 16:05", channel: "Resources", summary: "Downloaded “Clinic intake checklist”" },
  { id: "ac-3", at: "2026-05-13 07:58", channel: "Community", summary: "Opened Growth Lab space (Circle)" },
  { id: "ac-4", at: "2026-05-09 10:11", channel: "Billing", summary: "Opened customer portal (mock)" },
];

export function getSubscriptionEventsForMember(_memberId: string): SubscriptionEventRow[] {
  return SUBSCRIPTION_EVENTS;
}

export function getActivityForMember(_memberId: string): ActivityRow[] {
  return ACTIVITY;
}
