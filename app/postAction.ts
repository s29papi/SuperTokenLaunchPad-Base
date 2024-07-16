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

export async function getResponsePOST(req: NextRequest): Promise<NextResponse> {


    const decodedUrl = decodeURIComponent(req.url);
    // const pattern2Match = '%3FinputText=' + 
    const match = decodedUrl.match(/0x/);


    if (!match) {
        return new NextResponse('inputText not found in the provided URL', { status: 400 });
    }

    const extractedInputText = match.toString();
    

    const inputText = "dkdk"
    let actionFrame: ActionFrame = {
        type: "frame",
        frameUrl: `https://super-token-launch-pad-base.vercel.app/frames/castActionFirstPage?inputText=${inputText}&&reqUrl=${extractedInputText}`
    }

    return NextResponse.json(actionFrame, {status: 200});
}