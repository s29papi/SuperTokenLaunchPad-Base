import { NextRequest, NextResponse } from 'next/server';

type Action = {
    type: string;
    postUrl: string;
}

type ActionDefination = {
    name: string;
    icon: string;
    description: string;
    maboutUrl?: string;
    action: Action;
};

export async function getResponseGET(req: NextRequest): Promise<NextResponse> {
    const actionDefination: ActionDefination = {
        name: 'Based Super Token Launchpad Cast Action',
        icon: 'graph',
        description: 'Farcaster Action to wrap, unwrap and stream super tokens',
        action: <Action> {
            type: 'post'
        } 
    }
    return NextResponse.json(actionDefination, { status: 200 });
}