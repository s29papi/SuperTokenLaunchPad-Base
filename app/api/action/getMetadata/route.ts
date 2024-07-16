import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { getResponseGET } from '@/app/getAction';
import { getResponsePOST } from '@/app/postAction';
type ActionFrame = {
    type: string;
    frameUrl: string;
}

type Message = {
    message: string;
}

/**
 * 
 * url_add_castAction: https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Fdrakula-view.vercel.app%2Fapi%2Faction%2FgetMetadata
 * 
*/
async function getResponse(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const inputText = searchParams.get('inputText');
    const body: FrameRequest = await req.json();

    if (!inputText) {
        return new NextResponse('inputText parameter is required', { status: 400 });
    }
  
    return getResponsePOST(req, inputText) 
}


export async function GET(req: NextRequest): Promise<Response> {
    return getResponseGET(req)
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
  
export const dynamic = 'force-dynamic';






