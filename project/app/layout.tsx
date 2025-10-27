import "./globals.css";

export const metadata = {
  title: "Conector do Carrinho",
  description: "Interface de conexão com o carrinho",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
