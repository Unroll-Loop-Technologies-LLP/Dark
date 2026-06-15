export interface PolicySection {
  heading: string;
  content: string;
}

export interface PolicyContent {
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export const PRIVACY_POLICY_CONTENT: PolicyContent = {
  title: "Privacy Policy",
  lastUpdated: "April 3, 2026",
  sections: [
    {
      heading: "Information We Collect",
      content: "We collect information that you provide directly to us, including name, email address, phone number, and any other information you choose to provide when using our services or contacting us."
    },
    {
      heading: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, communicate with you, process transactions, and comply with legal obligations."
    },
    {
      heading: "Information Sharing",
      content: "We do not sell your personal information. We may share your information with service providers who assist us in operating our business, with your consent, or as required by law."
    },
    {
      heading: "Data Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
    },
    {
      heading: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. Contact us at contact@unrollloop.com to exercise these rights."
    },
    {
      heading: "Contact Us",
      content: "If you have questions about this Privacy Policy, please contact us at contact@unrollloop.com"
    }
  ]
};
