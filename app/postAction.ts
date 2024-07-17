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
    
    const indexOf = decodedUrl.indexOf('0x')
    const tokenAddr = decodedUrl.substring(indexOf + 2, indexOf + 4)
   

    const extractedInputText = tokenAddr
    

    const inputText = "dkdk"
    let actionFrame: ActionFrame = {
        type: "frame",
        frameUrl: `https://super-token-launch-pad-base.vercel.app/frames/castActionFirstPage?inputText=${inputText}&&reqUrl=${extractedInputText}`
    }

    return NextResponse.json(actionFrame, {status: 200});
}