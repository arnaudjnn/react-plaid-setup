import { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Button } from "@chakra-ui/react";

interface LinkProps {
  linkToken: string | null;
}

export const PlaidLink = ({ linkToken }: LinkProps) => {

  const onSuccess = useCallback((public_token, metadata) => {
    // send public_token to server
    const accessTokenRes = fetch('/set_access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token }),
    });
    // Handle response ...
  }, []);

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