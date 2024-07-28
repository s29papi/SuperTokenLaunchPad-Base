import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
  
const FRAMES_URL = process.env.FRAMES_URL || "https://super-token-launch-pad-base.vercel.app";

async function getResponse(req: NextRequest): Promise<NextResponse> { 
    const body: FrameRequest = await req.json();
    const inputText = body.untrustedData.inputText.substring(2);
    const { searchParams } = new URL(req.url);
    const supertoken = searchParams.get('st');
    const actionUrl = `https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Fsuper-token-launch-pad-base.vercel.app%2Fapi%2Faction%2FgetMetadata%3FinputText%3D${supertoken}%3FtokenAddress${inputText}`;
    const ogImageUrl = new URL(`/og/caInstallation`, FRAMES_URL).href; 
    
    const SuperTokenInputResp = `<!DOCTYPE html><html><head>
        <title>Input Token Name</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="of:accepts:xmtp" content="2024-02-01" /> 
        <meta property="fc:frame:image" content="${ogImageUrl}"/>
        <meta property="fc:frame:button:1" content="Proceed" />
        <meta property="fc:frame:button:1:action" content="link"/>
        <meta property="fc:frame:button:1:target" content="${actionUrl}"/>
        <meta property="fc:frame:post_url" content="${FRAMES_URL}/"/>
        </head></html>`
        return new NextResponse(SuperTokenInputResp)
   
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
  
export const dynamic = 'force-dynamic';
  