'use client'

import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <Image
        src="/alvarapp-1.jpg"
        alt="Logo do site"
        width={128}
        height={128}
        className="mx-auto mb-6 rounded-lg"
        priority
      />
    </div>
  )
}
