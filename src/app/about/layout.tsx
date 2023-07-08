export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en font-sans"> 
      <body>{children}</body> 
    </html>
  )
}