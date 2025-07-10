import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Microvolts Item Finder - React Version',
  description:
    'Descubra e visualize itens do jogo Microvolts com o Microvolts Item Finder - React Version. Pesquise, filtre e explore itens com uma interface moderna e responsiva.',
  keywords: [
    'Microvolts',
    'Item Finder',
    'React',
    'Busca de Itens',
    'Visualização de Itens',
    'Lazy Loading',
    'Next.js',
    'Tailwind CSS',
    'Debounce',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
