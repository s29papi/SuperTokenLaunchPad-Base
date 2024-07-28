import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, parseEther, parseUnits  } from 'viem';
import { base } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';
import { parseAbi } from 'viem';

 



async function getResponse(req: NextRequest): Promise<NextResponse | Response> { 
    
    const body: FrameRequest = await req.json();
    const { searchParams } = new URL(req.url);
    const st = searchParams.get('st')
    const t = searchParams.get('t')
    const { isValid,  } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
    const amount = body.untrustedData.inputText;
    
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }

    let data = encodeFunctionData({
        abi: parseAbi(['function setFlowrate(ISuperToken,address,int96) external']),
        functionName: 'setFlowrate',
        args: [`0x${st?.substring(2)}`, `0x${t?.substring(2)}`, parseUnits(amount, 0)]
    })

    const txData: FrameTransactionResponse = {
        chainId: `eip155:${base.id}`,
        method: 'eth_sendTransaction',   
        params: {
            abi: [],
            data,
            to: `0xcfA132E353cB4E398080B9700609bb008eceB125`,
            value: parseEther('0.00000').toString(),
        },
    };

    return NextResponse.json(txData);
}



export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
  
export const dynamic = 'force-dynamic';