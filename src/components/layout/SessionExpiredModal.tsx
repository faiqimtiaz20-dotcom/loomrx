import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useAppState } from "@/contexts/AppStateContext";
import { useNavigate } from "react-router-dom";

export function SessionExpiredModal() {
  const { sessionExpired, setSessionExpired, logout } = useAppState();
  const navigate = useNavigate();

  return (
    <Modal
      open={sessionExpired}
      title="Session expired"
      description="For your security, please sign in again to continue."
      onClose={() => setSessionExpired(false)}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setSessionExpired(false)}>
            Stay on page
          </Button>
          <Button
            onClick={() => {
              setSessionExpired(false);
              logout();
              navigate("/login");
            }}
          >
            Sign in again
          </Button>
        </div>
      }
    />
  );
}
