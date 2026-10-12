import { BrevoClient } from "@getbrevo/brevo"

const brevoAPIkey = process.env.BREVO_API_KEY
if(!brevoAPIkey){
  console.log("brevo key is missing")
}
export const brevoClient = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY!
})

const connectBrevo =async () =>  {
    try{
      const info = await brevoClient.account.getAccount()
      console.log("brevo account details :: ", info)

    }catch(err){
      console.log("error in setting up brevo :: ", err)
    }
}
export default connectBrevo