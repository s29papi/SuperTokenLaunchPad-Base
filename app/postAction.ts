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
    const { searchParams } = new URL(req.url);
    const st = searchParams.get('st');
    
    const indexOf = decodedUrl.indexOf('0x')
    const tokenAddr = decodedUrl.substring(indexOf, indexOf + 42)

    let actionFrame: ActionFrame = {
        type: "frame",
        frameUrl: `https://super-token-launch-pad-base.vercel.app/frames/castActionFirstPage?inputText=${tokenAddr}&&st=${st}`
    }

    return NextResponse.json(actionFrame, {status: 200});
}