import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Open Source Santiago — Comunidad, Tecnología y Propósito",
    template: "%s — Open Source Santiago",
  },
  description:
    "Comunidad de código abierto iniciada en Chile, abierta al mundo. Tecnología como motor para el desarrollo personal, profesional y comunitario.",
  metadataBase: new URL("https://os-santiago.github.io"),
  alternates: {
    languages: {
      es: "/es",
      en: "/en",
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
