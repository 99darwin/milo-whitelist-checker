import { init, useQuery } from "@airstack/airstack-react";

init(process.env.AIRSTACK_API_KEY as string);

export const getDiviDogeBalance = (address: string) => `
    query {
        TokenBalances(
            input: {filter: 
                {owner: 
                    {_in: "${address}"}, 
                    tokenAddress: {_in: "0x027BF54126482b66b0F26A680f03029DB3DE37aa"}, 
                    tokenType: {_eq: ERC20}}, 
                    blockchain: ethereum, 
                    limit: 100}
          ) {
            TokenBalance {
              owner {
                addresses
              }
              tokenAddress
              amount
              blockchain
              tokenType
            }
          }
    }
`

export const getDiviBalance = (address: string) => `
    query {
        TokenBalances(
            input: {filter: 
                {owner: 
                    {_in: "${address}"}, 
                    tokenAddress: {_in: "0x246908BfF0b1ba6ECaDCF57fb94F6AE2FcD43a77"}, 
                    tokenType: {_eq: ERC20}}, 
                    blockchain: ethereum, 
                    limit: 100}
          ) {
            TokenBalance {
              owner {
                addresses
              }
              tokenAddress
              amount
              blockchain
              tokenType
            }
          }
    }
`
