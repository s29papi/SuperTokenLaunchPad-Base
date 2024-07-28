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
    const indexOfst = decodedUrl.indexOf('0x')
    const st = decodedUrl.substring(indexOfst, indexOfst + 42)
    const indexOft = decodedUrl.indexOf('tokenAddress')
    const  t = decodedUrl.substring(indexOft, indexOft + 54)

    let actionFrame: ActionFrame = {
        type: "frame",
        frameUrl: `https://super-token-launch-pad-base.vercel.app/frames/castActionFirstPage?st=${st}&&t=${t.substring(12)}`
    }

    return NextResponse.json(actionFrame, {status: 200});
}


// 0x7290D97A49b71E65188515CA3A21850814678212
// 0xbeB0fd48C2BA0F1AacaD2814605f09e08A96B94E