import RegisterForm from "@/app/ui/authUi/registerForm";
import Form from "@/app/ui/authUi/registerNative";
import NextUiForm from "@/app/ui/authUi/registerNextUi";

export default function Register() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <NextUiForm/>
        </div>
      </div>
    </main>
  );
}
