import { NextRequest, NextResponse } from "next/server";
import { NeynarAPIClient, FeedType, FilterType } from "@neynar/nodejs-sdk"; 
import { getDiviBalance, getDiviDogeBalance } from "../gql/tokenBalance";
import whitelistedAddresses from '../../whitelist.json';

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY as string);

async function fetchGraphQLData(query: any, variables = {}) {
    const response = await fetch('https://api.airstack.xyz/gql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AIRSTACK_API_KEY}`
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return await response.json();
}

async function getResponse(req: NextRequest): Promise<NextResponse> {

    // validate frame request
    const data = await req.json();
    const result = await client.validateFrameAction(data.trustedData.messageBytes);
    const fid = await data.untrustedData.fid;
    // get token balances
    const getDiviDogeBalanceQuery = getDiviDogeBalance(result.action?.interactor.verifications[0] ?? "");
    const getDiviBalanceQuery = getDiviBalance(result.action?.interactor.verifications[0] ?? "");
    const diviData = await fetchGraphQLData(getDiviBalanceQuery);
    const diviBalance = await diviData.data.TokenBalances?.TokenBalance ? diviData.data.TokenBalances?.TokenBalance[0].amount : 0;
    const diviDogeData = await fetchGraphQLData(getDiviDogeBalanceQuery);
    const diviDogeBalance = await diviDogeData.data.TokenBalances?.TokenBalance[0] ? diviDogeData.data.TokenBalances?.TokenBalance[0].amount : 0;
    // use payload to verify if user is on whitelist
    const isWhitelisted = whitelistedAddresses.includes(result.action?.interactor.verifications[0] ?? "");    
    if (isWhitelisted || diviBalance > 0 || diviDogeBalance > 0 || fid <= 30000) {
    // if user is on whitelist, return the success frame
        return new NextResponse(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>Congrats you are on the $MILO whitelist.</title>
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="${process.env.GATEWAY_URL}/ipfs/QmdHqdPuFrD5LTCtBrf6pio41m53cj54De3LS7qsxyVpNV/ur_in.jpg" />
                <meta property="fc:frame:button:1" content="Visit dividoge.com" />
                <meta property="fc:frame:button:1:action" content="post_redirect" />
                <meta property="fc:frame:button:2" content="Join the $MILO channel" />
                <meta property="fc:frame:button:2:action" content="post_redirect" />
                <meta property="fc:frame:post_url" content="${process.env.BASE_URL}/api/end" />
            </head>
        </html>
                `);
    } else {
    // if user is not on whitelist, return the failure frame
        return new NextResponse(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>Sorry, you are not on the $MILO whitelist.</title>
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="${process.env.GATEWAY_URL}/ipfs/QmdHqdPuFrD5LTCtBrf6pio41m53cj54De3LS7qsxyVpNV/ur_out.jpg" />
                <meta property="fc:frame:button:1" content="Visit dividoge.com" />
                <meta property="fc:frame:button:1:action" content="post_redirect" />
                <meta property="fc:frame:button:2" content="Join the $MILO channel" />
                <meta property="fc:frame:button:2:action" content="post_redirect" />
                <meta property="fc:frame:post_url" content="${process.env.BASE_URL}/api/end" />
            </head>
        </html>
                `);
    }
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
};

export const dynamic = 'force-dynamic';