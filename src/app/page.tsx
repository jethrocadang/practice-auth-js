import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container bg-slate-100 flex justify-items-end">
      <div className="space-x-0.5 ">
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"}>Register</Link>
      </div>
    </div>
  );
}
