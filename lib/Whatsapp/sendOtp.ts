import Axios from "axios";

interface SendOtpParams {
  phone: string;
  otp: string;
}

export async function sendOtpViaChatMitra({ phone, otp }: SendOtpParams) {
  try {
    const response = await Axios.post(
      "https://backend.chatmitra.com/developer/api/send_message",
      {
        recipient_mobile_number: `91${phone}`,
        messages: [
          {
            kind: "template",
            template: {
              name: "campus2career_otp_20260526185828",
              language: "en_US",
              category: "authentication",
              components: [
                {
                  type: "body",
                  parameters: [
                    {
                      type: "text",
                      text: otp.toString(),
                    },
                  ],
                },
                {
                  type: "button",
                  sub_type: "url",
                  index: "0",
                  parameters: [
                    {
                      type: "text",
                      text: otp.toString(),
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CHATMITRA_API_KEY}`,
        },
      },
    );
    console.log("rRRR", response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("ChatMitra Error:", error.response?.data || error.message);

    return { success: false, error: error.response?.data || error.message };
  }
}

export async function sendOtpViaMeta({ phone, otp }: SendOtpParams) {
  try {
    const response = await Axios.post(
      `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: `91${phone}`,
        type: "template",
        template: {
          name: "campus2career_otp_20260526185828",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: otp.toString(),
                },
              ],
            },
            {
              type: "button",
              sub_type: "url",
              index: "0",
              parameters: [
                {
                  type: "text",
                  text: otp.toString(),
                },
              ],
            },
          ],
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
        },
      },
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Meta Whats Error:", error.response?.data || error.message);

    return { success: false, error: error.response?.data || error.message };
  }
}
