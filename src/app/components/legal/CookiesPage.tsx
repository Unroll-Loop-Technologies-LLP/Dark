import { LegalPage } from "./LegalPage";
import { COOKIE_POLICY_CONTENT } from "./CookiePolicyContent";

interface CookiesPageProps {
  isModal?: boolean;
  onClose?: () => void;
}

export function CookiesPage({ isModal = false, onClose }: CookiesPageProps) {
  return (
    <LegalPage 
      content={COOKIE_POLICY_CONTENT} 
      isModal={isModal}
      onClose={onClose}
    />
  );
}
