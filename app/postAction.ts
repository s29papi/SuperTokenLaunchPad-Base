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
    
    const body: FrameRequest = await req.json();
    const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
    

    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
    }


    // let actionFrame: ActionFrame = {
    //     type: "frame",
    //     frameUrl: `https://super-token-launch-pad-base.vercel.app/frames/castActionFirstPage?inputText=rrkrkrk`
    // }
    let actionMessage: ActionMessage = {
        type: "message",
        message: "it works"
    }


    return NextResponse.json(actionMessage, {status: 200});
}