import Axios from "axios";

export interface SendRegistrationParams {
  phone: string;
  name: string; // {{1}} - User's name
  regNo: string; // {{2}} - Registration number
  venue: string; // {{3}} - Location / Venue
  dayDate: string; // {{4}} - Day/Date
  time: string; // {{5}} - Day string or extra date info
  groupLink: string;
  // imageUrl: string; // URL of the header image to display
  // contactName: string; // {{5}} - Contact person
  // contactPhone: string; // {{6}} - Contact number
}

export async function sendRegistrationConfirmationViaCMNew({
  phone,
  name,
  regNo,
  venue,
  dayDate,
  time,
  groupLink,
  // imageUrl,
  // contactName,
  // contactPhone,
}: SendRegistrationParams) {
  try {
    console.log("Reached Fu", name, regNo, venue, dayDate, time, groupLink);
    const response = await Axios.post(
      "https://backend.chatmitra.com/developer/api/send_message",
      {
        recipient_mobile_number: `91${phone}`,
        messages: [
          {
            kind: "template",
            template: {
              name: "on_registration_20260612112748",
              language: "en_US",
              // category: "utility",
              components: [
                {
                  type: "header",
                  parameters: [
                    {
                      type: "image",
                      image: {
                        link: "https://pudhariedudisha.com/images/PudhaiCampus2CareerLogo.png",
                      },
                    },
                  ],
                },
                {
                  type: "body",
                  parameters: [
                    { type: "text", text: String(name) }, // {{1}}
                    { type: "text", text: String(regNo) }, // {{2}}
                    { type: "text", text: String(venue) }, // {{3}}
                    { type: "text", text: String(dayDate) }, // {{4}}
                    { type: "text", text: String(time) }, // {{5}}
                    { type: "text", text: String(groupLink) }, // {{5}}
                  ],
                },
              ],
            },
          },
        ],
        customer_name: name,
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
