export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 -left-10 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob dark:bg-teal-900 dark:opacity-30 dark:mix-blend-screen" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob [animation-delay:2000ms] dark:bg-cyan-900 dark:opacity-30 dark:mix-blend-screen" />
      <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob [animation-delay:4000ms] dark:bg-emerald-900 dark:opacity-30 dark:mix-blend-screen" />
    </div>
  );
}