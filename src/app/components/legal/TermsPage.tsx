import { LegalPage } from "./LegalPage";
import { TERMS_CONTENT } from "./TermsContent";

interface TermsPageProps {
  isModal?: boolean;
  onClose?: () => void;
}

export function TermsPage({ isModal = false, onClose }: TermsPageProps) {
  return (
    <LegalPage 
      content={TERMS_CONTENT} 
      isModal={isModal}
      onClose={onClose}
    />
  );
}
