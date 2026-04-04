export type ContactIntent = "message" | "call";

const CONTACT_EVENT_NAME = "ul:contact-intent";
const NAVBAR_OFFSET = 104;

export function scrollToSection(selector: string) {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
}

export function openContact(intent: ContactIntent = "message") {
  window.dispatchEvent(new CustomEvent<ContactIntent>(CONTACT_EVENT_NAME, { detail: intent }));
  requestAnimationFrame(() => {
    scrollToSection("#contact");
  });
}

export function onContactIntent(listener: (intent: ContactIntent) => void) {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<ContactIntent>;
    listener(customEvent.detail || "message");
  };

  window.addEventListener(CONTACT_EVENT_NAME, handler);

  return () => {
    window.removeEventListener(CONTACT_EVENT_NAME, handler);
  };
}
