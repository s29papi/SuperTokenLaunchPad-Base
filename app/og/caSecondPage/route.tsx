import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

     

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const idx = searchParams.get('idx') || '';
    let question:string = '';
    if (parseInt(idx) == 1) {
        question = "Enter Amount to Wrap";
    }
    if (parseInt(idx) == 2) {
        question = "Enter Amount to UnWrap";
    }
    if (parseInt(idx) == 3) {
        question = "Enter Amount to Stream";
    }
    const kanitFontData = await fetch(
        new URL('../../../public/Kanit-ExtraBold.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div tw='flex w-full h-full justify-center items-center text-6xl text-white bg-blue-500' style={{fontFamily: 'Kanit ExtraBold'}}>
                {question}
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