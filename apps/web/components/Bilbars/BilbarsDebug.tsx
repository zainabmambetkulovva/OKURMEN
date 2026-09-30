'use client';

export default function BilbarsDebug() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-orange-100 dark:bg-orange-900/20 rounded-3xl">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">🐆</div>
        <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
          Билбарс DEBUG
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Если вы видите это, React компонент работает!
        </p>
      </div>
    </div>
  );
}
