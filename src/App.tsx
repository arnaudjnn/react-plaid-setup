import { useEffect, useState } from "react"
import { Box, Text, Link, VStack, Code, Grid } from "@chakra-ui/react"
import { Logo } from "./Logo"
import { PlaidLink } from "./PlaidLink";

function App() {
  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const totalBalance = bankAccounts?.map(bankAccount => bankAccount.balances.current).reduce((prev, next) => prev + next, 0);

  const generateToken = async () => {
    const linkTokenRes = await fetch('/create_link_token', {
      method: 'POST',
    });
    const linkTokenData = await linkTokenRes.json();
    setLinkToken(linkTokenData.link_token);
  };

  const getBalance = async () => {
    const balanceRes = await fetch('/balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    });
    const balanceData = await balanceRes.json()
    setBankAccounts(balanceData.accounts)
  }

  useEffect(() => {
    generateToken();
  }, []);

  useEffect(() => {
    if(accessToken) {
      getBalance();
    }
  }, [accessToken]);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://qovery.com"
            fontSize="2xl"
            target="_blank"
          >
            Learn Qovery
          </Link>
          {linkToken && 
            <PlaidLink 
              linkToken={linkToken} 
              setAccessToken={setAccessToken}
            />
          }
          {bankAccounts.length > 0 && 
            <Text>{totalBalance}</Text>
          }
        </VStack>
      </Grid>
    </Box>
  )
}

export default App
