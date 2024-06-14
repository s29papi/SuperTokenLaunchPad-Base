import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, formatEther, parseEther, parseUnits  } from 'viem';
import { base } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

import abi from '@/stf-abi';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> { 
    const body: FrameRequest = await req.json();
    const { searchParams } = new URL(req.url);
    const tokenName = searchParams.get('tokenName')
    const tokenSymbol = searchParams.get('tokenSymbol')

    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
    const _underlyingTokenAddress = body.untrustedData.inputText
    const _upgradability = 1
    const _name = tokenName
    const _symbol = tokenSymbol 

    const superTokenFactory = "0xe20B9a38E0c96F61d1bA6b42a61512D56Fea1Eb3"; // proxyAddress
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }

    let data = encodeFunctionData({
        abi: abi,
        functionName: 'createERC20Wrapper',
        args: [_underlyingTokenAddress, _upgradability, _name, _symbol]
    })

    const txData: FrameTransactionResponse = {
        chainId: `eip155:${base.id}`,
        method: 'eth_sendTransaction',
        params: {
            abi: [],
            data,
            to: `0x${superTokenFactory?.slice(2)}`,
            value: parseEther('0.00000').toString(),
        },
    };

    return NextResponse.json(txData);
}



export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
  
export const dynamic = 'force-dynamic';