import { MessageCircle } from "lucide-react";

const WHATSAPP_COMMUNITY = "https://chat.whatsapp.com/REPLACE_WITH_GROUP_LINK";

const WhatsAppButton = () => (
  <a
    href={WHATSAPP_COMMUNITY}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Join our WhatsApp Community"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-elevated hover:scale-110 transition-transform"
  >
    <MessageCircle className="h-7 w-7" />
  </a>
);

export default WhatsAppButton;
