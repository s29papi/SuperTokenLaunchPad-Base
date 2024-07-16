import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';

type ActionFrame = {
    type: string;
    frameUrl: string;
}
type ActionMessage = {
    type: string;
    message: string;
}

type Message = {
    message: string;
}

export async function getResponsePOST(req: NextRequest, inputText: string): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const inpurtText = searchParams.get('url');

    if (!inpurtText) {
        return new NextResponse('inputText parameter is required', { status: 400 });
    }

    const decodedUrl = decodeURIComponent(inpurtText);
    const match = decodedUrl.match(/inputText=([^&]*)/);

    if (!match) {
        return new NextResponse('inputText not found in the provided URL', { status: 400 });
    }

    const extractedInputText = match[1];
    

    
    let actionFrame: ActionFrame = {
        type: "frame",
        frameUrl: `https://super-token-launch-pad-base.vercel.app/frames/castActionFirstPage?inputText=${inputText}&&reqUrl=${extractedInputText}`
    }
    // let actionMessage: Message = {
    //     // type: "message",
    //     message: "it works"
    // }


    return NextResponse.json(actionFrame, {status: 200});
}