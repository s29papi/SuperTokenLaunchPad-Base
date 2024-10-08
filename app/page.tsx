import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';


const FRAMES_URL = process.env.FRAMES_URL || "https://super-token-launch-pad-base.vercel.app"
const imageUrl = new URL("/og/fra1stpage", FRAMES_URL).href
const postUrl = new URL("/frames/FirstPageHandler", FRAMES_URL).href

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'Super Create 🍬', action: 'post'},
      {label: 'Setup Cast Action 💻', action: 'post'},
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