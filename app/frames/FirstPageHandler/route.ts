import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
     
const FRAMES_URL = process.env.FRAMES_URL || "https://super-token-launch-pad-base.vercel.app";

async function getResponse(req: NextRequest): Promise<NextResponse> { 
    const body: FrameRequest = await req.json();
    const idx = body.untrustedData.buttonIndex;
          
    if (idx == 1) {
        const ogImageUrl = new URL(`/og/namedInput`, FRAMES_URL).href;
        const NameInputResp = `<!DOCTYPE html><html><head>
                    <title>Input Token Name</title>
                    <meta property="fc:frame" content="vNext" />
                    <meta property="of:accepts:xmtp" content="2024-02-01" /> 
                    <meta property="fc:frame:image" content="${ogImageUrl}"/>
                    <meta property="fc:frame:input:text" content="> Token Name"/>
                    <meta property="fc:frame:button:1" content="Next ➡️" />
                    <meta property="fc:frame:button:1:action" content="post"/>
                    <meta property="fc:frame:post_url" content="${FRAMES_URL}/frames/SymbolInput"/>
                    </head></html>`
        return new NextResponse(NameInputResp)
    }
    
    if (idx == 2) {       
        const castActionInstallationPageUrl = new URL(`/frames/SecondPageHandler`, FRAMES_URL).href;
        const ogImageUrl = new URL(`/og/superTokenInput`, FRAMES_URL).href;
        const SuperTokenInputResp = `<!DOCTYPE html><html><head>
                    <title>Input Token Address</title>
                    <meta property="fc:frame" content="vNext" />
                    <meta property="of:accepts:xmtp" content="2024-02-01" /> 
                    <meta property="fc:frame:image" content="${ogImageUrl}"/>
                    <meta property="fc:frame:input:text" content="> Token Address"/>
                    <meta property="fc:frame:button:1" content="Next ➡️" />
                    <meta property="fc:frame:button:1:action" content="post"/>
                    <meta property="fc:frame:post_url" content="${castActionInstallationPageUrl}/"/>
                    </head></html>`
        return new NextResponse(SuperTokenInputResp)
    }

    return new NextResponse(``)
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
  
export const dynamic = 'force-dynamic';
  