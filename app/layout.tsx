import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Déclaration des polices Geist
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

// Métadonnées de l'application
export const metadata: Metadata = {
  title: "EVRC - Évaluation du Risque Chimique",
  description: "Outil d'évaluation et de gestion des risques chimiques en laboratoire",
  authors: [{ name: "Brag" }],
  keywords: ["risque chimique", "évaluation", "laboratoire", "sécurité", "INRS"],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  creator: "Brag",
  publisher: "Brag",
  robots: {
    index: false,
    follow: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="fr" 
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased">
        {/* Effets de fond */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 animate-gradient" />
        <div className="fixed inset-0 bg-grid" />
        <div className="fixed inset-0 bg-noise" />

        {/* Conteneur principal */}
        <main className="relative z-10 flex min-h-screen flex-col">
          <div className="flex-1 w-full">
            {children}
          </div>
        </main>

        {/* Désactiver le zoom sur mobile */}
        <script dangerouslySetInnerHTML={{ 
          __html: `
            document.addEventListener('gesturestart', function(e) {
              e.preventDefault();
            });
          ` 
        }} />
      </body>
    </html>
  );
}