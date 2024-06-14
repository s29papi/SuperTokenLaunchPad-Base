import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
  
const FRAMES_URL = process.env.FRAMES_URL || "https://super-token-launch-pad-base.vercel.app"
async function getResponse(req: NextRequest): Promise<NextResponse> { 
    const body: FrameRequest = await req.json();
    const searchParams = req.nextUrl.searchParams;
    const tokenName:any = searchParams.get("tokenName");
    const ogImageUrl = new URL(`/og/Upgradable`, FRAMES_URL).href
    const tokenSymbol = body.untrustedData.inputText
    const post_Url = new URL(`/frames/Underlying?tokenName=${tokenName}&&tokenSymbol=${tokenSymbol}`, FRAMES_URL).href
    return new NextResponse(`<!DOCTYPE html><html><head>
      <title>Upgradability</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="of:accepts:xmtp" content="2024-02-01" /> 
      <meta property="fc:frame:image" content="${ogImageUrl}"/>
      <meta property="fc:frame:button:1" content="Yes" />
      <meta property="fc:frame:button:1:action" content="post"/>
    
      <meta property="fc:frame:post_url" content="${post_Url}"/>
      </head></html>`)
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
  
export const dynamic = 'force-dynamic';
  