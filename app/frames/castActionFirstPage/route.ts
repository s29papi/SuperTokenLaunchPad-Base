import { NextRequest, NextResponse } from "next/server";
import { FrameRequest } from '@coinbase/onchainkit/frame';

         
export async function POST(req: NextRequest) {
    const body: FrameRequest = await req.json();
    
    const { searchParams } = new URL(req.url);
    const tokenAddress = searchParams.get('inputText');
    const st = searchParams.get('st');
    let postUrl = `https://super-token-launch-pad-base.vercel.app/frames/caSecondPage?tokenAddress=${tokenAddress}`;
    let imageUrl = `https://super-token-launch-pad-base.vercel.app/og/caFirstPage?tokenAddress=${tokenAddress}`;
    
    return new NextResponse(
            `<!DOCTYPE html><html><head>
            <title>View on Drakula</title>
            <meta property="fc:frame" content="vNext" />
            <meta property="of:accepts:xmtp" content="2024-02-01" /> 
            <meta property="og:image" content="${imageUrl}"/>
            <meta property="fc:frame:image" content="${imageUrl}"/>
            <meta property="fc:frame:button:1" content="Wrap ${st?.length} 🍬" />
            <meta property="fc:frame:button:1:action" content="post"/>
            <meta property="fc:frame:button:2" content="UnWrap 🍭" />
            <meta property="fc:frame:button:2:action" content="post"/>
            <meta property="fc:frame:button:3" content="Stream 🚀" />
            <meta property="fc:frame:button:3:action" content="post"/>
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