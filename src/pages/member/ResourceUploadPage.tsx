import { Navigate } from "react-router-dom";

export function ResourceUploadPage() {
  return <Navigate to="/resources?upload=1" replace />;
}
