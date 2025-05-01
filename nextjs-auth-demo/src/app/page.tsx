import LoginWithEmail from "@/components/LoginWithEmail";
import LoginWithGoogle from "@/components/LoginWithGoogle";
import LoginWithPhone from "@/components/LoginWithPhone";
import RegisterWithEmail from "@/components/RegisterWithEmail";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Next.js + Firebase Auth</h1>
      <LoginWithGoogle />
      <RegisterWithEmail />
      <LoginWithEmail />
      <LoginWithPhone />
      {/* Aquí puedes agregar <LoginWithEmail /> o <LoginWithPhone /> */}
    </main>
  );
}
