import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';


const FRAMES_URL = process.env.FRAMES_URL || "https://3dns-domain-register-frame.vercel.app"
const imageUrl = new URL("/og", FRAMES_URL).href
const postUrl = new URL("/api/frame", FRAMES_URL).href

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'Create!', action: 'post'},
  ],
  image: imageUrl,
  post_url: postUrl,

});

export const metadata: Metadata = {
  title: 'Super Token Launchpad Base.',
  description: 'A frame to Launch Super Tokens on Base',
  openGraph: {
    title: 'Super Token Launchpad Base.',
    description: 'A frame to Launch Super Tokens on Base',
    images: [imageUrl],
  },
  other: {
    'of:accepts:xmtp': '2024-02-01',
    ...frameMetadata,
  },
};

export default async function Page() {
   return (
    <div>supertokenlaunchpad-base </div>
   )
}