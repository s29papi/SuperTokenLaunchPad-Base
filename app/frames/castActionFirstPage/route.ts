import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';


export async function POST(req: NextRequest) {
    const body: FrameRequest = await req.json();
    const tokenAddress = body.untrustedData.inputText;
    // const { searchParams } = new URL(req.url);
    // const tokenAddress = searchParams.get('inputText');
    let postUrl = "https://0x-check-price-cast-action.vercel.app";
    let imageUrl = "https://super-token-launch-pad-base.vercel.app/og/NameInput";
    let buytxUrl = "https://0x-check-price-cast-action.vercel.app/api/buy-tx"
    let approvebuyTxUrl = "https://0x-check-price-cast-action.vercel.app/api/approve-buyTx"
    


    return new NextResponse(
            `<!DOCTYPE html><html><head>
            <title>View on Drakula</title>
            <meta property="fc:frame" content="vNext" />
            <meta property="of:accepts:xmtp" content="2024-02-01" /> 
            <meta property="og:image" content="${imageUrl}"/>
            <meta property="fc:frame:image" content="${imageUrl}"/>
            <meta property="fc:frame:input:text" content="${tokenAddress}"/>
            <meta property="fc:frame:button:1" content="Approve Buy From 0x ✅" />
            <meta property="fc:frame:button:1:action" content="tx"/>
            <meta property="fc:frame:button:1:target" content="${approvebuyTxUrl}"/>
            <meta property="fc:frame:button:2" content="Buy 🚀" />
            <meta property="fc:frame:button:2:action" content="tx"/>
            <meta property="fc:frame:button:2:target" content="${buytxUrl}"/>
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