import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { address } = await req.json();
    const apiKey = process.env.GEOAPIFY_API_KEY;

    if (!apiKey || !address) {
        return NextResponse.json({ error: 'Missing API key or address' }, { status: 400 });
    }

    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const location = data?.features?.[0]?.properties;

        if (!location) {
            return NextResponse.json({ error: 'No results found' }, { status: 404 });
        }

        return NextResponse.json({ lat: location.lat, lon: location.lon });
    } catch {
        return NextResponse.json({ error: 'Geocoding failed' }, { status: 500 });
    }
}
