require('dotenv').config();
const express = require('express');
const { Account, Aptos, AptosConfig, Network, Ed25519PrivateKey } = require('@aptos-labs/ts-sdk');
const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('Pong!');
});

app.post('/campaign', async (req, res) => {
  try {
    const { campaign_id, eligible_participants, number_of_likes } = req.body;

    const network = (process.env.APTOS_NETWORK || 'testnet').toUpperCase();
    const config = new AptosConfig({ network: Network[network] || Network.TESTNET });
    const aptos = new Aptos(config);

    const pk = process.env.APTOS_PRIVATE_KEY;
    if (!pk) return res.status(400).json({ error: true, message: 'Missing APTOS_PRIVATE_KEY' });

    const privateKey = new Ed25519PrivateKey(pk);
    const alice = Account.fromPrivateKey({ privateKey });

    const moduleAddress = process.env.APTOS_MODULE_ADDRESS;
    if (!moduleAddress) return res.status(400).json({ error: true, message: 'Missing APTOS_MODULE_ADDRESS' });

    const transaction = await aptos.transaction.build.simple({
      sender: alice.accountAddress,
      data: {
        function: `${moduleAddress}::stream::distribute_rewards`,
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
        functionArguments: [campaign_id, eligible_participants, number_of_likes],
      },
    });

    const pendingTransaction = await aptos.signAndSubmitTransaction({ signer: alice, transaction });
    console.log(pendingTransaction);
    res.json({ error: false, data: 'success' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
});

const PORT = process.env.NODE_PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
