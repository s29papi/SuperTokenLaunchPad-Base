import { NextRequest, NextResponse } from "next/server";
import { FrameRequest } from '@coinbase/onchainkit/frame';

         
export async function POST(req: NextRequest) {
    const body: FrameRequest = await req.json();
    const idx = body.untrustedData.buttonIndex;
    const { searchParams } = new URL(req.url);
    const t = searchParams.get('t');
    const st = searchParams.get('st');
    const amount = body.untrustedData.inputText;

    let IMG_URL:string = '';         
    let TX_URL:string = '';
    let BTN:string = '';
    // should be success and return
    let postUrl = `https://super-token-launch-pad-base.vercel.app/frames/castActionFirstPage?st=${st}&&t=${t}`;

    if (idx == 1) {        
        IMG_URL = `https://super-token-launch-pad-base.vercel.app/og/CaThirdPage?idx=1`;
       
        TX_URL = `https://super-token-launch-pad-base.vercel.app/tx/wrap?st=${st}&&t=${t}&&amount=${amount}`;

        return new NextResponse(
            `<!DOCTYPE html><html><head>     
            <title>View on Drakula</title>
            <meta property="fc:frame" content="vNext" />
            <meta property="of:accepts:xmtp" content="2024-02-01" /> 
            <meta property="og:image" content="${IMG_URL}"/>
            <meta property="fc:frame:image" content="${IMG_URL}"/>
            <meta property="fc:frame:button:1" content="Wrap" />
            <meta property="fc:frame:button:1:action" content="tx"/>
            <meta
                    property="fc:frame:button:1:target"
                    content="${TX_URL}"
            />
            <meta
                property="fc:frame:button:1:post_url"
                content="${postUrl}" 
            />
            </head></html>`,
        {
            status: 200,
            headers: {
            "Content-Type": "text/html",
            },
        },
    );
    }   

    if (idx == 2) {        
        IMG_URL = `https://super-token-launch-pad-base.vercel.app/og/CaSecondPage?idx=2`;
        BTN = 'UnWrap ➡️'
        TX_URL = `https://super-token-launch-pad-base.vercel.app/tx/unwrap?st=${st}&&t=${t}`;
    }
    if (idx == 3) {        
        IMG_URL = `https://super-token-launch-pad-base.vercel.app/og/CaSecondPage?idx=3`;
        BTN = 'Stream ➡️'
    }
    
    return new NextResponse(
            `<!DOCTYPE html><html><head>     
            <title>View on Drakula</title>
            <meta property="fc:frame" content="vNext" />
            <meta property="of:accepts:xmtp" content="2024-02-01" /> 
            <meta property="og:image" content="${IMG_URL}"/>
            <meta property="fc:frame:image" content="${IMG_URL}"/>
            <meta property="fc:frame:input:text" content="Enter Amount ..."/>
            <meta property="fc:frame:button:1" content="${BTN}" />
            <meta property="fc:frame:button:1:action" content="tx"/>
            <meta
                    property="fc:frame:button:1:target"
                    content="${TX_URL}"
            />
            <meta
                property="fc:frame:button:1:post_url"
                content="${postUrl}" 
            />
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