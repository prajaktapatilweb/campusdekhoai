// src/constants/chatReplies.ts

export const QUICK_REPLY_MESSAGES = {
  A: ({
    fullname,
    whatsappGroupLink,
  }: {
    fullname: string;
    whatsappGroupLink: string;
  }) => `Hello ${fullname},

You selected Option A.

Join WhatsApp Group: ${whatsappGroupLink}`,

  // ------------------------------------------------
  B: ({
    fullname,
    eventLocation,
  }: {
    fullname: string;
    eventLocation: string;
  }) => `Hello ${fullname},

You selected Option B.

Seminar Location: ${eventLocation}`,

  // -------------------------------------------------
  JOIN: ({
    fullname,
    whatsappGroupLink,
  }: {
    fullname: string;
    whatsappGroupLink: string;
  }) => `Hello ${fullname},

Join your WhatsApp group: ${whatsappGroupLink}`,

  HELP: ({ fullname }: { fullname: string }) => `Hello ${fullname},

Campus2Career support team will contact you shortly.`,
};

type DefaultReplyProps = {
  fullname: string;
};

export const defaultReply = ({ fullname }: DefaultReplyProps) => `
Hello ${fullname},

Thank you for contacting Campus2Career.
`;
