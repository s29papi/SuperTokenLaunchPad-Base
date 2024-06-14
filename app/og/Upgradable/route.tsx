import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';



export async function GET(req: NextRequest) {
    const kanitFontData = await fetch(
        new URL('../../../public/Kanit-ExtraBold.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());
    return new ImageResponse(
        (
            <div tw='flex w-full h-full justify-center items-center text-4xl text-white bg-blue-500' style={{fontFamily: 'Kanit ExtraBold'}}>
                3. Give SuperFluid Upgradeable Powers Over your Token ? 
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