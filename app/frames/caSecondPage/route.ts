import { NextRequest, NextResponse } from "next/server";
import { FrameRequest } from '@coinbase/onchainkit/frame';

         
export async function POST(req: NextRequest) {
    const body: FrameRequest = await req.json();
    const idx = body.untrustedData.buttonIndex;
    const { searchParams } = new URL(req.url);
    const tokenAddress = searchParams.get('tokenAddress');

    let IMG_URL:string = '';
    let TX_URL:string = '';
    let BTN:string = '';
    let postUrl = "https://super-token-launch-pad-base.vercel.app/frames/caSecondPage";

    if (idx == 1) {        
        IMG_URL = `https://super-token-launch-pad-base.vercel.app/og/caSecondPage?idx=1`;
        BTN = 'Wrap ➡️'
        
    }

    if (idx == 2) {        
        IMG_URL = `https://super-token-launch-pad-base.vercel.app/og/caSecondPage?idx=2`;
        BTN = 'UnWrap ➡️'
    }
    if (idx == 3) {        
        IMG_URL = `https://super-token-launch-pad-base.vercel.app/og/caSecondPage?idx=3`;
        BTN = 'Stream ➡️'
    }
    
    return new NextResponse(
            `<!DOCTYPE html><html><head>     
            <title>View on Drakula</title>
            <meta property="fc:frame" content="vNext" />
            <meta property="of:accepts:xmtp" content="2024-02-01" /> 
            <meta property="og:image" content="${IMG_URL}"/>
            <meta property="fc:frame:image" content="${IMG_URL}"/>
            <meta property="fc:frame:button:1" content="${BTN}" />
            <meta property="fc:frame:button:1:action" content="post"/>
            <meta property="fc:frame:post_url" content="${postUrl}"/>
            </head></html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
}

export const GET = POST;