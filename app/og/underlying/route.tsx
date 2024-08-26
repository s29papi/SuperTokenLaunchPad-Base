import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {

    const question = "4. Input Underlying Token Address ? ";
    
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#00E676', // Vibrant green background
                    width: '100%',
                    height: '100%',
                    display: 'flex',
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
                        backgroundColor: 'rgba(18, 18, 18, 0.9)', // Dark overlay
                        borderRadius: '40px',
                        padding: '40px',
                        width: '80%',
                        maxWidth: '1000px',
                    }}
                >
                    <div style={{ color: '#FFFFFF', fontSize: '24px', marginBottom: '20px' }}>
                        LAUNCHIT
                    </div>
                    <div style={{ color: '#FFFFFF', fontSize: '48px', textAlign: 'center' }}>
                        {question}
                    </div>
                </div>
            </div>
        ),

    );
}