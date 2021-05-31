const express = require('express');
const app = express();
const PORT = 4090;
app.use(express.json());
const plaid = require('plaid');
const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

app.post('/create_link_token', async (req, res) => {
  try {
    // Create the link_token with all of your configurations
    const tokenResponse = await client.createLinkToken({
      user: {
        client_user_id: '123-test-user-id',
      },
      client_name: 'Plaid Test App',
      products: ['auth'],
      country_codes: ['US'],
      language: 'en',
      webhook: 'https://webhook.sample.com',
    });
    res.json(tokenResponse);
  } catch (e) {
    // Display error on client
    return res.send({ error: e.message });
  }
});

app.post('/exchange_public_token', async (req, res) => {
  try {
    const publicToken = req.body.public_token;
    // Exchange the client-side public_token for a server access_token
    const tokenResponse = await client.exchangePublicToken(publicToken);
    // Save the access_token and item_id to a persistent database
    const accessToken = tokenResponse.access_token;
    const itemId = tokenResponse.item_id;

    res.json({ accessToken, itemId });
  } catch (e) {
    // Display error on client
    return res.send({ error: e.message });
  }
});

app.post('/balance', async (req, res) => {
  try {
    const accessToken = req.body.accessToken;
    const balanceRes = await client.getBalance(accessToken);
    const accounts = balanceRes.accounts;

    res.json({ accounts });
  } catch (e) {
    // Display error on client
    return res.send({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});