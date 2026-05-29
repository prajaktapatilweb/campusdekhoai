// src/constants/chatReplies.ts

type QuickReplyPayload = {
  fullname: string;
  eventLocation?: string;
  whatsappGroupLink?: string;
};

export const QUICK_REPLY_MESSAGES: Record<
  string,
  (payload: QuickReplyPayload) => string
> = {
  // ------------------------------------------------------------------------------------------------
  "Join Event Group": ({
    fullname,
    eventLocation,
    whatsappGroupLink,
  }) => `Hello ${fullname},

Thank you for your interest in the ${eventLocation} Campus2Career event. 🎉

Join the official WhatsApp group for important updates, seminar information, and announcements:

${whatsappGroupLink}

We look forward to seeing you at the event!`,

  // ------------------------------------------------------------------------------------------------

  // ------------------------------------------------
  JOIN: ({ fullname, whatsappGroupLink }) => `Hello ${fullname},

Join your official Campus2Career WhatsApp group using the link below:

${whatsappGroupLink}`,

  // ------------------------------------------------------------------------------------------------
  HELP: ({ fullname }) => `Hello ${fullname},

Thank you for contacting Campus2Career support.

Our team will get in touch with you shortly.`,
};
type DefaultReplyProps = {
  fullname: string;
};

export const defaultReply = ({ fullname }: DefaultReplyProps) => `
Hello ${fullname},

Thank you for contacting Campus2Career.
`;
