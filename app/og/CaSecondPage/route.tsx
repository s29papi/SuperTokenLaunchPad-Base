import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const idx = searchParams.get('idx') || '';
    let question: string = '';
    let actionType: string = '';

    if (parseInt(idx) == 1) {
        question = "Enter Amount to Wrap";
        actionType = "WRAP";
    }
    if (parseInt(idx) == 2) {
        question = "Enter Amount to UnWrap";
        actionType = "UNWRAP";
    }
    if (parseInt(idx) == 3) {
        question = "Enter Amount to Stream";
        actionType = "STREAM";
    }

    const kanitFontData = await fetch(
        new URL('../../../public/Kanit-ExtraBold.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #00E676, #1DE9B6)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Kanit ExtraBold',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(18, 18, 18, 0.85)',
                        borderRadius: '30px',
                        padding: '40px',
                        width: '90%',
                        maxWidth: '1000px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <div style={{ color: '#00E676', fontSize: '36px', marginBottom: '20px' }}>
                        LAUNCHIT
                    </div>
                    <div style={{ color: '#FFFFFF', fontSize: '72px', textAlign: 'center', marginBottom: '20px' }}>
                        {actionType}
                    </div>
                    <div style={{ color: '#00E676', fontSize: '36px', textAlign: 'center' }}>
                        {question}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'Kanit ExtraBold',
                    data: kanitFontData,
                    style: 'normal'
                },
            ]
        }
    );
}