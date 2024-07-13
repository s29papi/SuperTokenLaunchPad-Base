import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { getResponseGET } from '@/app/getAction';
import { getResponsePOST } from '@/app/postAction';

/**
 * 
 * url_add_castAction: https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Fdrakula-view.vercel.app%2Fapi%2Faction%2FgetMetadata
 * 
*/
async function getResponse(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();
    const inputText = body.untrustedData.inputText;
   if (req.method == 'GET') {
        return getResponseGET(req)
   }
   if (req.method == 'POST') {
        return getResponsePOST(req, inputText)
   }

   return getResponsePOST(req, inputText) 
}


export async function GET(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
  
export const dynamic = 'force-dynamic';