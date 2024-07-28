import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, parseEther, parseUnits  } from 'viem';
import { base } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';
import { parseAbi } from 'viem';
import { publicClient } from '@/client';


async function getResponse(req: NextRequest): Promise<NextResponse | Response> { 
    const body: FrameRequest = await req.json();
    const { searchParams } = new URL(req.url);
    const st = searchParams.get('st')
    const amount = searchParams.get('amount') || ''
    const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
    
    

    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }

    let data = encodeFunctionData({
        abi: parseAbi(['function downgrade(uint256) external']),
        functionName: 'downgrade',
        args: [parseUnits(amount, 18)]
    })

    const txData: FrameTransactionResponse = {
        chainId: `eip155:${base.id}`,
        method: 'eth_sendTransaction',   
        params: {
            abi: [],
            data,
            to: `0x${st?.slice(2)}`,
            value: parseEther('0.00000').toString(),
        },
    };

    return NextResponse.json(txData);
}



export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
  
export const dynamic = 'force-dynamic';