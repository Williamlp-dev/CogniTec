import Image from 'next/image'

export default function Home() {
  return (
    <section className="min-h-screen relative">
      <div className="absolute inset-0">
        <Image
          src="/assets/img/cabeca3.png"
          alt="Background cerebral"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            mixBlendMode: 'overlay',
            filter: 'brightness(0.3)',
          }}
          className="z-0"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 z-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">
          <span className="block font-poppins mb-2">Cognitec</span>
          <span className="block font-poppins">
            Soluções de IA para Alzheimer
            <span className="text-amber-300 font-poppins">.</span>
          </span>
        </h1>
      </div>
    </section>
  )
}
