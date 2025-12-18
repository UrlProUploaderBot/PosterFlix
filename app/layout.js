
import './globals.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0f1a] text-white">{children}</body>
    </html>
  )
}
