import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="relative w-32 h-32 animate-bounce">
        <Image
          src="/bilbars-loading.png"
          alt="Жүктөлүүдө..."
          fill
          className="object-contain"
        />
      </div>
      <p className="text-gray-600 dark:text-gray-400 font-medium">Жүктөлүүдө...</p>
    </div>
  );
}
