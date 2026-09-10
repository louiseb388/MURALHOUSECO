// Web3Forms relays form submissions straight to the business's inbox — this
// site has no backend of its own to send mail from. The access key lives in
// an env var (set in Vercel's project settings, not committed here) rather
// than inline in source.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export async function submitToWeb3Forms(fields: Record<string, string>, images: File[]): Promise<boolean> {
  const formData = new FormData();
  formData.append('access_key', ACCESS_KEY ?? '');
  for (const [key, value] of Object.entries(fields)) formData.append(key, value);
  images.forEach((file) => formData.append('attachment', file));

  try {
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
    const result = await res.json();
    return Boolean(result.success);
  } catch {
    return false;
  }
}
