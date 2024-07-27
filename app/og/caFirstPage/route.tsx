import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';



export async function GET(req: NextRequest) {
    const kanitFontData = await fetch(
        new URL('../../../public/Kanit-ExtraBold.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());
    return new ImageResponse(
        (
            <div tw='flex w-full h-full justify-center items-center text-6xl text-white bg-blue-500' style={{fontFamily: 'Kanit ExtraBold'}}>
                2. Input Token Symbol ?
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

// async function getTokenName(ca: string): Promise<string> {
//     const data: string = await publicClient.readContract({
//         abi: parseAbi(['function name() view returns (string)']),
//         functionName: 'name',
//         address: `0x${ca.substring(2)}`,
//         args: [],
//     });
    
//     return data;
// }