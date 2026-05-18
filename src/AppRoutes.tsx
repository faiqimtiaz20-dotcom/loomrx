import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { MemberLayout } from "@/components/layout/MemberLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { VerifyEmailPage } from "@/pages/auth/VerifyEmailPage";
import { SessionExpiredPage } from "@/pages/auth/SessionExpiredPage";
import { OnboardingWelcomePage } from "@/pages/onboarding/OnboardingWelcomePage";
import { OnboardingProfilePage } from "@/pages/onboarding/OnboardingProfilePage";
import { OnboardingPlanPage } from "@/pages/onboarding/OnboardingPlanPage";
import { OnboardingCheckoutPage } from "@/pages/onboarding/OnboardingCheckoutPage";
import { OnboardingCheckoutSuccessPage } from "@/pages/onboarding/OnboardingCheckoutSuccessPage";
import { OnboardingCirclePage } from "@/pages/onboarding/OnboardingCirclePage";
import { DashboardPage } from "@/pages/member/DashboardPage";
import { AiAssistantPage } from "@/pages/member/AiAssistantPage";
import { ResourcesListPage } from "@/pages/member/ResourcesListPage";
import { ResourceDetailPage } from "@/pages/member/ResourceDetailPage";
import { ResourceUploadPage } from "@/pages/member/ResourceUploadPage";
import { MyUploadsPage } from "@/pages/member/MyUploadsPage";
import { CommunityPage } from "@/pages/member/CommunityPage";
import { BillingPage } from "@/pages/member/BillingPage";
import { SubscriptionInactivePage } from "@/pages/member/SubscriptionInactivePage";
import { SettingsLayout } from "@/pages/member/settings/SettingsLayout";
import { ProfileSettingsPage } from "@/pages/member/settings/ProfileSettingsPage";
import { SecuritySettingsPage } from "@/pages/member/settings/SecuritySettingsPage";
import { NotificationsSettingsPage } from "@/pages/member/settings/NotificationsSettingsPage";
import { DangerSettingsPage } from "@/pages/member/settings/DangerSettingsPage";
import { AdminOverviewPage } from "@/pages/admin/AdminOverviewPage";
import { AdminMembersPage } from "@/pages/admin/AdminMembersPage";
import { AdminMemberDetailPage } from "@/pages/admin/AdminMemberDetailPage";
import { AdminResourcesPage } from "@/pages/admin/AdminResourcesPage";
import { AdminResourceEditorPage } from "@/pages/admin/AdminResourceEditorPage";
import { AdminModerationPage } from "@/pages/admin/AdminModerationPage";
import { AdminModerationDetailPage } from "@/pages/admin/AdminModerationDetailPage";
import { AdminAiKnowledgePage } from "@/pages/admin/AdminAiKnowledgePage";
import { AdminCircleMappingPage } from "@/pages/admin/AdminCircleMappingPage";
import { TermsPage } from "@/pages/legal/TermsPage";
import { PrivacyPage } from "@/pages/legal/PrivacyPage";
import { AiDisclaimerPage } from "@/pages/legal/AiDisclaimerPage";
import { SupportPage } from "@/pages/legal/SupportPage";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";
import { ServerErrorPage } from "@/pages/errors/ServerErrorPage";
import { ForbiddenPage } from "@/pages/errors/ForbiddenPage";
import { MarketingGate } from "@/pages/public/MarketingGate";
import { LandingPage } from "@/pages/public/LandingPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MarketingGate />}>
        <Route element={<MarketingLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
      </Route>

      <Route element={<PublicLayout />}>
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/ai-disclaimer" element={<AiDisclaimerPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Route>

      <Route path="/session-expired" element={<SessionExpiredPage />} />
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/500" element={<ServerErrorPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route element={<ProtectedRoute mode="onboarding" />}>
          <Route path="/onboarding/welcome" element={<OnboardingWelcomePage />} />
          <Route path="/onboarding/profile" element={<OnboardingProfilePage />} />
          <Route path="/onboarding/plan" element={<OnboardingPlanPage />} />
          <Route path="/onboarding/checkout" element={<OnboardingCheckoutPage />} />
          <Route path="/onboarding/checkout-success" element={<OnboardingCheckoutSuccessPage />} />
          <Route path="/onboarding/circle" element={<OnboardingCirclePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute mode="auth-only" />}>
        <Route path="/subscription-inactive" element={<SubscriptionInactivePage />} />
      </Route>

      <Route element={<ProtectedRoute mode="member" />}>
        <Route element={<MemberLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ai" element={<AiAssistantPage />} />
          <Route path="/resources" element={<ResourcesListPage />} />
          <Route path="/resources/upload" element={<ResourceUploadPage />} />
          <Route path="/resources/my-uploads" element={<MyUploadsPage />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="/settings/profile" replace />} />
            <Route path="profile" element={<ProfileSettingsPage />} />
            <Route path="security" element={<SecuritySettingsPage />} />
            <Route path="notifications" element={<NotificationsSettingsPage />} />
            <Route path="danger" element={<DangerSettingsPage />} />
          </Route>
        </Route>
      </Route>

      <Route element={<ProtectedRoute mode="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOverviewPage />} />
          <Route path="/admin/members" element={<AdminMembersPage />} />
          <Route path="/admin/members/:id" element={<AdminMemberDetailPage />} />
          <Route path="/admin/resources" element={<AdminResourcesPage />} />
          <Route path="/admin/resources/new" element={<AdminResourceEditorPage />} />
          <Route path="/admin/resources/:id/edit" element={<AdminResourceEditorPage />} />
          <Route path="/admin/moderation" element={<AdminModerationPage />} />
          <Route path="/admin/moderation/:id" element={<AdminModerationDetailPage />} />
          <Route path="/admin/ai" element={<AdminAiKnowledgePage />} />
          <Route path="/admin/circle-mapping" element={<AdminCircleMappingPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
