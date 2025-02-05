import type { Metadata } from "next";
import Navbar from "@/components/Shared/Client/Navbar";
import Footer from "@/components/Shared/Client/Footer";
import { AuthProvider } from "@/provider/ContextProvider";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "PROTIPPZ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <NextTopLoader />
        <AuthProvider>
          <Navbar />
          <div className="min-h-[72vh] flex flex-col justify-center items-center">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
