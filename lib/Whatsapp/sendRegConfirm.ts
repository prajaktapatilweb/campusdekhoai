import Axios from "axios";

export interface SendRegistrationParams {
  phone: string;
  name: string; // {{1}} - User's name
  regNo: string; // {{2}} - Registration number
  venue: string; // {{3}} - Location / Venue
  dayDate: string; // {{4}} - Day/Date
  time: string; // {{5}} - Day string or extra date info
  // imageUrl: string; // URL of the header image to display
  // contactName: string; // {{5}} - Contact person
  // contactPhone: string; // {{6}} - Contact number
}

export async function sendRegistrationConfirmationViaCM({
  phone,
  name,
  regNo,
  venue,
  dayDate,
  time,
  // imageUrl,
  // contactName,
  // contactPhone,
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
              name: "reg_cnfm_20260529213441",
              language: "en_US",
              // category: "utility",
              components: [
                {
                  type: "body",
                  parameters: [
                    { type: "text", text: name }, // {{1}}
                    { type: "text", text: regNo }, // {{2}}
                    { type: "text", text: venue }, // {{3}}
                    { type: "text", text: dayDate }, // {{4}}
                    { type: "text", text: time }, // {{5}}
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
