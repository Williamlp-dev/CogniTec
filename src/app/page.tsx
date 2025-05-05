import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Background com imagem usando next/Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-neutral-700 opacity-70 z-10"> </div>
        <div className="relative h-full w-full">
          <Image
            src="/assets/img/cabeca3.png"
            alt="Background cerebral"
            fill
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              mixBlendMode: 'overlay', // Simulando o efeito color-mix
            }}
            className="z-0"
          />
        </div>
      </div>

      {/* Conteúdo central */}
      <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 z-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          <span className="block mb-2">Cognitec</span>
          <span className="block">
            Soluções de IA para Alzheimer
            <span className="text-amber-300">.</span>
          </span>
        </h1>
      </div>
    </main>
  )
}
