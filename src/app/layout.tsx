import "./globals.css";
import { DevicesProvider } from "./context/DeviceContext";
import ToastProvider from "./components/ToastProvider";

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
      <body>
        <DevicesProvider>
          <ToastProvider>
          {children}
          </ToastProvider>
        </DevicesProvider>
      </body>
    </html>
  );
}
