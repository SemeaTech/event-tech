import Image from "next/image";

export function LoginHeader() {
  return (
    <section className="flex flex-col items-center justify-center space-y-20 w-full">
      <div className="flex gap-4 items-center">
        <Image src="/logo.svg" alt="Event Tech" width={60} height={60} />
        <h1 className="text-white text-2xl font-bold font-jetbrains">Semea tech</h1>
      </div>

      <div>
        <p className="text-xl text-center max-w-[500px] text-white font-medium font-poppins">
          Bem vindo! É muito bom te ver por aqui de novo, entre e continue compartilhando com a{" "}
          <strong className="text-green-500 pl-1">comunidade</strong>.
        </p>
      </div>
    </section>
  );
}