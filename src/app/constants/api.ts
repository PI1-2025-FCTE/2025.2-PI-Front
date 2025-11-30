export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    "A variável de ambiente NEXT_PUBLIC_API_URL não está definida. " +
    `Usando fallback: ${API_URL}. ` +
    "Defina NEXT_PUBLIC_API_URL no seu .env se quiser alterar a URL da API."
  );
}
