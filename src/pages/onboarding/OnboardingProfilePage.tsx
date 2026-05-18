import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { TIMEZONES } from "@/data/timezones";

export function OnboardingProfilePage() {
  const navigate = useNavigate();
  const { user, login } = useAppState();
  const [name, setName] = useState(user?.name ?? "");
  const [org, setOrg] = useState(user?.org ?? "");
  const [timezone, setTimezone] = useState(user?.timezone ?? "America/Chicago");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    login({ ...user, name, org: org || undefined, timezone }, { onboardingComplete: false });
    navigate("/onboarding/plan");
  };

  return (
    <Card>
      <CardBody className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step 2 of 5</p>
        <h1 className="mt-2 type-h1 text-slate-900">Profile basics</h1>
        <p className="mt-2 text-sm text-slate-600">Tell us who you are so we can tailor defaults.</p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            label="Organization / clinic (optional)"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
          />
          <Select
            label="Timezone"
            value={timezone}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setTimezone(e.target.value)}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </Select>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
