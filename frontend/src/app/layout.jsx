import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "CourtSide News | Notícias de Basquete",
  description: "Portal de notícias de basquete com cadastro e gerenciamento de publicações."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
