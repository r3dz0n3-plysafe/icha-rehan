import type { Metadata } from "next";
import { Amiri, Bitter, Cormorant, Cormorant_Upright, Geist, Geist_Mono, Plus_Jakarta_Sans, Roboto } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const cormorantUpright = Cormorant_Upright({
  variable: "--font-upright",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["latin"],
  weight: ["400"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://r3dz0n3-plysafe.github.io/icha-rehan"),
  title: {
    default: "The Wedding of Icha & Rehan",
    template: "%s | The Wedding of Icha & Rehan",
  },
  description:
    "The Wedding of Icha & Rehan - Minggu, 08 November 2026 di GRHA TARUM BARAT, Bekasi. Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Anda berkenan hadir.",
  applicationName: "Icha & Rehan Wedding",
  keywords: [
    "Icha Rehan Wedding",
    "Undangan Pernikahan Icha Rehan",
    "Wedding Invitation",
    "The Wedding of Icha and Rehan",
    "GRHA TARUM BARAT",
  ],
  authors: [{ name: "Icha & Rehan" }],
  creator: "Icha & Rehan",
  icons: {
    icon: "/icha-rehan/sites/icha-rehan/Dwika-WO.webp",
    apple: "/icha-rehan/sites/icha-rehan/Dwika-WO.webp",
  },
  openGraph: {
    title: "The Wedding of Icha & Rehan",
    description:
      "Minggu, 08 November 2026 - We invite you to celebrate our wedding day at GRHA TARUM BARAT, Bekasi.",
    url: "https://r3dz0n3-plysafe.github.io/icha-rehan/",
    siteName: "The Wedding of Icha & Rehan",
    images: [
      {
        url: "https://r3dz0n3-plysafe.github.io/icha-rehan/sites/icha-rehan/Salinan-FGM-8-Zah-05.webp",
        width: 1200,
        height: 630,
        alt: "The Wedding of Icha & Rehan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Icha & Rehan",
    description:
      "Minggu, 08 November 2026 - We invite you to celebrate our wedding day.",
    images: [
      "https://r3dz0n3-plysafe.github.io/icha-rehan/sites/icha-rehan/Salinan-FGM-8-Zah-05.webp",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "The Wedding of Icha & Rehan",
  startDate: "2026-11-08T08:00:00+07:00",
  endDate: "2026-11-08T14:00:00+07:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "GRHA TARUM BARAT",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bekasi",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
  },
  image: [
    "https://r3dz0n3-plysafe.github.io/icha-rehan/sites/icha-rehan/Salinan-FGM-8-Zah-05.webp",
  ],
  description:
    "The Wedding of Icha & Rehan - Minggu, 08 November 2026 di GRHA TARUM BARAT, Bekasi",
  organizer: {
    "@type": "Person",
    name: "Icha & Rehan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${cormorantUpright.variable} ${roboto.variable} ${bitter.variable} ${amiri.variable} ${jakarta.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
