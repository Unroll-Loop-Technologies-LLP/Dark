import { LegalPage } from "./LegalPage";
import { PRIVACY_POLICY_CONTENT } from "./PrivacyPolicyContent";

interface PrivacyPageProps {
  isModal?: boolean;
  onClose?: () => void;
}

export function PrivacyPage({ isModal = false, onClose }: PrivacyPageProps) {
  return (
    <LegalPage 
      content={PRIVACY_POLICY_CONTENT} 
      isModal={isModal}
      onClose={onClose}
    />
  );
}
