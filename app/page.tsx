export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Video Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src="/video.mov" type="video/quicktime" />
          <source src="/video.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl lg:text-8xl">Revolcón Challenge</h1>
          <p className="max-w-2xl text-lg text-white/90 md:text-xl lg:text-2xl">
            Únete al desafío más emocionante y demuestra tus habilidades
          </p>
        </div>
      </section>

      {/* Additional content sections can go here */}
    </main>
  )
}
