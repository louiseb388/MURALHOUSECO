// Web3Forms relays form submissions straight to the business's inbox — this
// site has no backend of its own to send mail from. The access key is meant
// to be used client-side like this (it's not a secret; Web3Forms's own docs
// embed it directly in a plain HTML form), so there's nothing to hide here.
const ACCESS_KEY = '7f8f15db-eaef-4644-8fa0-b5af2d4b06d0';

export async function submitToWeb3Forms(fields: Record<string, string>, images: File[]): Promise<boolean> {
  const formData = new FormData();
  formData.append('access_key', ACCESS_KEY);
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
