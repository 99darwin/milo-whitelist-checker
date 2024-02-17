import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Check 🐶"
    }
  ],
  image: `${process.env.GATEWAY_URL}/ipfs/QmdHqdPuFrD5LTCtBrf6pio41m53cj54De3LS7qsxyVpNV/wl.jpg`,
  post_url: `${process.env.BASE_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Check if you are on the $MILO whitelist.',
  description: 'A frame that lets you check if you are on the $MILO whitelist.',
  openGraph: {
    title: 'Check if you are on the $MILO whitelist.',
    description: 'A frame that lets you check if you are on the $MILO whitelist.',
    images: [`${process.env.GATEWAY_URL}/ipfs/QmdHqdPuFrD5LTCtBrf6pio41m53cj54De3LS7qsxyVpNV/wl.jpg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Check if you are on the $MILO whitelist.</h1>
    </>
  );
}