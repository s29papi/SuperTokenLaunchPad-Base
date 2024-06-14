import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
  
const FRAMES_URL = process.env.FRAMES_URL || "https://super-token-launch-pad-base.vercel.app"
async function getResponse(req: NextRequest): Promise<NextResponse> { 
    const body: FrameRequest = await req.json();
    const searchParams = req.nextUrl.searchParams;
    const tokenName:any = searchParams.get("tokenName");
    const tokenSymbol = body.untrustedData.inputText
    const ogImageUrl = new URL(`/og/Underlying`, FRAMES_URL).href
    const deployTxUrl = new URL(`/tx/deploy?tokenName=${tokenName}&&tokenSymbol=${tokenSymbol}`, FRAMES_URL).href
    
    return new NextResponse(`<!DOCTYPE html><html><head>
      <title>Upgradability</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="of:accepts:xmtp" content="2024-02-01" /> 
      <meta property="fc:frame:image" content="${ogImageUrl}"/>
      <meta property="fc:frame:input:text" content="> Underlying Token Address"/>
      <meta property="fc:frame:button:1" content="Deploy" />
      <meta property="fc:frame:button:1:action" content="tx"/>
      <meta
            property="fc:frame:button:1:target"
            content="${deployTxUrl}"
       />
        <meta
            property="fc:frame:button:1:post_url"
            content="/" 
        />
      </head></html>`)
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
  
export const dynamic = 'force-dynamic';
  