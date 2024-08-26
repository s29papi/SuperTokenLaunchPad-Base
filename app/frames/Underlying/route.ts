import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
  
const FRAMES_URL = process.env.FRAMES_URL || "https://super-token-launch-pad-base.vercel.app"
async function getResponse(req: NextRequest): Promise<NextResponse> { 
    const body: FrameRequest = await req.json();
    const searchParams = req.nextUrl.searchParams;
    const tokenName:any = searchParams.get("tokenName");
    const tokenSymbol:any = searchParams.get("tokenSymbol");
    const idx = body.untrustedData.buttonIndex
    const ogImageUrl = new URL(`/og/underlying`, FRAMES_URL).href
    const deployTxUrl = new URL(`/tx/deploy?tokenName=${tokenName}&&tokenSymbol=${tokenSymbol}&&idx=${idx}`, FRAMES_URL).href
    const postUrl = new URL(`/frames/Success`, FRAMES_URL).href
         
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
            content="${postUrl}" 
        />
      </head></html>`)
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
  
export const dynamic = 'force-dynamic';
  