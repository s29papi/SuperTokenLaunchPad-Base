import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, formatEther, parseEther, parseUnits  } from 'viem';
import { base } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';
import { parseAbi } from 'viem';
import { publicClient } from '@/client';


async function getResponse(req: NextRequest): Promise<NextResponse | Response> { 
    const body: FrameRequest = await req.json();
    const { searchParams } = new URL(req.url);
    const tokenAddress = searchParams.get('tokenAddress')

    // const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
    // const amount = body.untrustedData.inputText
    const amount = '23'


    // if (!isValid) {
    //     return new NextResponse('Message not valid', { status: 500 });
    //   }

    const decimals: string = await publicClient.readContract({
        abi: parseAbi(['function decimals() view returns (string)']),
        functionName: 'decimals',
        address: `0x${tokenAddress?.substring(2)}`,
        args: [],
    });
    let data = encodeFunctionData({
        abi: parseAbi(['function upgrade(uint256) view returns (string)']),
        functionName: 'upgrade',
        args: [parseUnits(amount, parseInt(decimals))]
    })

    const txData: FrameTransactionResponse = {
        chainId: `eip155:${base.id}`,
        method: 'eth_sendTransaction',   
        params: {
            abi: [],
            data,
            to: `0x${tokenAddress?.slice(2)}`,
            value: parseEther('0.00000').toString(),
        },
    };

    return NextResponse.json(txData);
}



export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
  
export const dynamic = 'force-dynamic';