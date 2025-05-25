// app/layout.tsx

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './globals.css';
export default function MainLayout({ children }: { children: React.ReactNode }) {


  // login, register гэх мэт хуудсан дээр header/footer харуулахгүй

  return (
    <html lang="en">
<body className=" pt-[100px] flex flex-col min-h-screen">
  <Header />
  <main className="flex-1 px-4 py-8">
    {children}
  </main>
  <Footer />
</body>
    </html>
  )
}

