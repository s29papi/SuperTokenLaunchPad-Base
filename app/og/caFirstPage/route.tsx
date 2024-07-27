import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { parseAbi } from 'viem';
import { publicClient } from '@/client';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const kanitFontData = await fetch(
        new URL('../../../public/Kanit-ExtraBold.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());
    const tokenName = await getTokenName("0x1efF3Dd78F4A14aBfa9Fa66579bD3Ce9E1B30529");
    const imgVal = "Super Degen"
    return new ImageResponse(
        (
            <div tw='flex w-full h-full justify-center items-center text-6xl text-white bg-blue-500' style={{fontFamily: 'Kanit ExtraBold'}}>
                {imgVal}
            </div>
        ),
        {
            fonts: [
                {
                    name: 'Kanit ExtraBold',
                    data: kanitFontData,
                    style: 'normal'
                },
            ]
        }
    )
}    

async function getTokenName(ca: string): Promise<string> {
    const data: string = await publicClient.readContract({
        abi: parseAbi(['function name() view returns (string)']),
        functionName: 'name',
        address: `0x${ca.substring(2)}`,
        args: [],
    });
    
    return data;
}