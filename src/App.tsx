import { useEffect, useState } from "react"
import { Box, Text, Link, VStack, Code, Grid } from "@chakra-ui/react"
import { Logo } from "./Logo"
import { PlaidLink } from "./PlaidLink";

function App() {
  const [linkToken, setLinkToken] = useState(null);

  const generateToken = async () => {
    const response = await fetch('/create_link_token', {
      method: 'POST',
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
  }, []);

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
          {linkToken && <PlaidLink linkToken={linkToken}/>}
        </VStack>
      </Grid>
    </Box>
  )
}

export default App
