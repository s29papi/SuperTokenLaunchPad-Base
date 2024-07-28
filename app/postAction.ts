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
    
    
    const indexOf = decodedUrl.indexOf('0x')
    const tokenAddr = decodedUrl.substring(indexOf, indexOf + 42)
    const indexOfst = decodedUrl.indexOf('tokenAddress')
    const  st = decodedUrl.substring(indexOfst, indexOfst + 54)

    let actionFrame: ActionFrame = {
        type: "frame",
        frameUrl: `https://super-token-launch-pad-base.vercel.app/frames/castActionFirstPage?inputText=${tokenAddr}&&st=${st.substring(12)}`
    }

    return NextResponse.json(actionFrame, {status: 200});
}


// 0x7290D97A49b71E65188515CA3A21850814678212
// 0xbeB0fd48C2BA0F1AacaD2814605f09e08A96B94E