import { sendTokenbyEmail } from "@/lib/mail";
import { User } from "lucide-react";

export default function Form() {
  const send = async () => {
    "use server";
    await sendTokenbyEmail({ email: "jethrocadang@gmail.com" });
    console.log("Working")
  };
  return (
    <form>
      {/* <div className="flex input-container border border-gray-300 rounded p-1 focus-within:border-red-500">
        <User className="self-center" />
        <div>
          <p>Name</p>
          <input
            className="focus:ring-transparent focus:outline-none"
            type="text"
            placeholder="firstname"
            name="firstname"
          />
        </div>
      </div> */}
      <button formAction={send}>submit</button>
    </form>
  );
}
