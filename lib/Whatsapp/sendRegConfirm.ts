import Axios from "axios";

export interface SendRegistrationParams {
  phone: string;
  imageUrl: string; // URL of the header image to display
  name: string; // {{1}} - User's name
  venue: string; // {{2}} - Location / Venue
  date: string; // {{3}} - Day/Date
  day: string; // {{4}} - Day string or extra date info
  contactName: string; // {{5}} - Contact person
  contactPhone: string; // {{6}} - Contact number
}

export async function sendRegistrationConfirmationViaCM({
  phone,
  imageUrl,
  name,
  venue,
  date,
  day,
  contactName,
  contactPhone,
}: SendRegistrationParams) {
  try {
    console.log("Reached Function");
    const response = await Axios.post(
      "https://backend.chatmitra.com/developer/api/send_message",
      {
        recipient_mobile_number: `91${phone}`,
        messages: [
          {
            kind: "template",
            template: {
              name: "c2c_reg_confirmation1_20260527164751",
              language: "en_US",
              category: "utility",
              components: [
                {
                  type: "header",
                  parameters: [
                    {
                      type: "image",
                      image: {
                        link: imageUrl,
                      },
                    },
                  ],
                },
                {
                  type: "body",
                  parameters: [
                    { type: "text", text: name }, // {{1}}
                    { type: "text", text: venue }, // {{2}}
                    { type: "text", text: date }, // {{3}}
                    { type: "text", text: day }, // {{4}}
                    { type: "text", text: contactName }, // {{5}}
                    { type: "text", text: contactPhone }, // {{6}}
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
