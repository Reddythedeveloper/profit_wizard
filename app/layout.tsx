import '../styles/globals.css'

export const metadata = {
  title: 'Profit Wizard',
  description: 'Log completed jobs — phase 0 scaffold',
  icons: '/favicon.svg',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="app-root">{children}</main>
      </body>
    </html>
  )
}
