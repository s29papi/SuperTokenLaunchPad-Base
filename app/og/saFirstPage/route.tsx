import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { parseAbi } from 'viem';
import { publicClient } from '@/client';

export const runtime = 'edge';     

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const t = searchParams.get('t') || '';
    const st = searchParams.get('st') || '';
    const tokenName = await getTokenName(st);
    const imgVal = tokenName.toUpperCase();

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
                        {imgVal}
                    </div>
                    <div style={{ color: '#00E676', fontSize: '24px', textAlign: 'center' }}>
                        Super Token Address: {st.substring(0, 6)}
                    </div>
                </div>
            </div>
        ),
    );
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