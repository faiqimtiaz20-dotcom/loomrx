import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useAppState } from "@/contexts/AppStateContext";
import { useToast } from "@/contexts/ToastContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { TIMEZONES } from "@/data/timezones";

export function ProfileSettingsPage() {
  const toast = useToast();
  const { user, login, updateUser } = useAppState();
  const [name, setName] = useState(user?.name ?? "");
  const [org, setOrg] = useState(user?.org ?? "");
  const [timezone, setTimezone] = useState(user?.timezone ?? "America/Chicago");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setOrg(user.org ?? "");
    setTimezone(user.timezone ?? "America/Chicago");
  }, [user]);

  const onAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = typeof reader.result === "string" ? reader.result : undefined;
      if (url) updateUser({ avatarUrl: url });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardBody className="max-w-xl space-y-4">
        <div>
          <p className="type-h3">Profile</p>
          <p className="text-sm text-slate-600">Shown to admins for support and provisioning.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-primary/10 text-lg font-bold text-primary">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              user?.name
                ?.split(" ")
                .map((s) => s[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() ?? "?"
            )}
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatar} />
            <Button type="button" variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
              Change photo
            </Button>
            <p className="mt-1 text-xs text-slate-500">Optional — image is stored in your local session.</p>
          </div>
        </div>
        <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Organization / clinic" value={org} onChange={(e) => setOrg(e.target.value)} />
        <Select label="Timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          {TIMEZONES.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </Select>
        <Input label="Email" value={user?.email ?? ""} disabled hint="Contact support to change email." />
        <Button
          onClick={() => {
            if (!user) return;
            login({ ...user, name, org: org || undefined, timezone }, { onboardingComplete: true });
            toast.push("Profile saved.", "success");
          }}
        >
          Save changes
        </Button>
      </CardBody>
    </Card>
  );
}
