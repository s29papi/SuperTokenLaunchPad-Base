'use client';

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import { Suspense } from 'react'

export default function RedirectPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const txhash = searchParams.get('txhash');

    useEffect(() => {
            const warpcastUrl = `https://warpcast.com/~/compose?text=Just%20deployed!&embeds[]=https://basescan.org/tx/${txhash}`;

            
            window.location.href = warpcastUrl;
  
    }, [router, txhash]);

    return (
            <div></div>
    );
}