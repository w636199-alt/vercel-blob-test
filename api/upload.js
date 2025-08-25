import { upload } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false, // important for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    const formData = await upload(req); // handles file upload
    // formData contains info like: { url, name, size, type }
    res.status(200).json({ url: formData.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
}
