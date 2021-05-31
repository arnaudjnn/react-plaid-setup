import { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Button } from "@chakra-ui/react";

interface LinkProps {
  linkToken: string | null;
  setAccessToken: Function;
}

export const PlaidLink = ({ linkToken, setAccessToken }: LinkProps) => {

  const onSuccess = useCallback(async (public_token, metadata) => {
    // send public_token to server
    const accessTokenRes = await fetch('/exchange_public_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token }),
    });
    const accessTokenData = await accessTokenRes.json()
    setAccessToken(accessTokenData.accessToken)

  }, [setAccessToken]);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button
      size="lg"
      onClick={() => open()} 
      disabled={!ready}
    >
      Link account
    </Button>
  );
};