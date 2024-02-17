import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const data = await req.json();
    const buttonId = data.untrustedData.buttonIndex;

    let path: string;
    if (buttonId ===1) {
        path = "/dividoge";
    } else if (buttonId === 2) {
        path = "/milo";
    } else {
        path = '';
    };
    const headers = new Headers();
    headers.set('Location', `${process.env.BASE_URL}`);
    const response = NextResponse.redirect(`${process.env.BASE_URL}${path}`, { 
        headers: headers, 
        status: 302 
    });
    return response;
};

export const dynamic = 'force-dynamic';