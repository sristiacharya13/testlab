import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        const { url, method, headers, body } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
        }

        const axiosResponse = await axios({
            url,
            method,
            headers: headers.reduce((acc: Record<string, string>, { key, value }: { key: string, value: string }) => {
                if (key && value) acc[key] = value;
                return acc;
            }, {}),
            data: method !== 'GET' ? body : undefined,
        });

        return NextResponse.json(axiosResponse.data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
    }
}
