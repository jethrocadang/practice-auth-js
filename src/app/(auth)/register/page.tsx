import {  sendMail } from "@/lib/mail";

export default function Home() {
  const send = async () => {
    "use server";

    console.log("working ..")
    await sendMail({
      to: "jethrocadang@gmail.com",
      name: "Vahid",
      subject: "Test Mail",
      body: "<h1>TEst</h1>"
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <form>
        <button formAction={send}>test</button>
      </form>
    </main>
  );
}
