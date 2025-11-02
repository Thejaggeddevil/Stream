# Stream

A modern, Aptos-powered tweet promotion platform: Next.js client, Flask API, Node service for on-chain actions, and Move smart contracts.

## Stack
- Client: Next.js 14 (React 18, TypeScript, Tailwind)
- API: Flask (Python 3.11, MongoEngine)
- On-chain service: Node.js + @aptos-labs/ts-sdk
- Contracts: Aptos Move

## Prerequisites
- Node.js 18+ and npm
- Python 3.10+ and pip
- MongoDB (local or hosted)
- Aptos CLI (https://aptos.dev/install-cli/) for contract ops

## Quick start (Dev)
1) Install dependencies
- Client
  - `npm install --prefix client`
- Flask API
  - `python -m pip install -r backend/requirements.txt`
- Node service
  - `npm install --prefix node-backend`

2) Environment variables
- Copy examples and fill in values:
  - `backend/.env.example` -> `backend/.env`
  - `node-backend/.env.example` -> `node-backend/.env`
  - `client/.env.local.example` -> `client/.env.local`

3) Run services
- API (port 5002 by default)
  - PowerShell: `$env:FLASK_MONGODB_URI="mongodb://127.0.0.1:27017/streamad"; $env:PORT="5002"; python backend/app.py`
- Node service (port 5003 by default)
  - `npm run start --prefix node-backend`
- Client (port 3000)
  - `npx --yes --prefix client next dev -p 3000`

## Environment
- backend/.env
  - FLASK_MONGODB_URI=mongodb://127.0.0.1:27017/streamad
  - PORT=5002
  - CORS_ORIGINS=http://localhost:3000
  - APTOS_CONSUMER_KEY=your_twitter_consumer_key
  - APTOS_CONSUMER_SECRET=your_twitter_consumer_secret
  - APTOS_BEARER_TOKEN=your_twitter_bearer
  - APTOS_ACCESS_TOKEN=your_twitter_access_token
  - APTOS_ACCESS_TOKEN_SECRET=your_twitter_access_secret
- node-backend/.env
  - NODE_PORT=5003
  - APTOS_NETWORK=testnet
  - APTOS_PRIVATE_KEY=0x...
- client/.env.local
  - NEXT_PUBLIC_API_BASE_URL=http://localhost:5002
  - NEXT_PUBLIC_NODE_BACKEND_URL=http://localhost:5003
  - NEXT_PUBLIC_APTOS_NETWORK=testnet

## Contracts (Aptos)
- Set your account in `contract/.aptos/config.yaml` (do NOT commit secrets)
- Publish to testnet:
  - `cd contract`
  - `aptos move compile`
  - `aptos move publish --profile default`

## Deploy (Docker)
- Fill `backend/.env`, `node-backend/.env`, `client/.env.local` as described below.
- Then run:
  - `docker compose up -d --build`
- Services:
  - Web: http://localhost:3000
  - API: http://localhost:5002
  - Chain (Node): http://localhost:5003

## Production notes
- Do not commit secrets (.env, Aptos keys)
- Flask: run behind a production WSGI (gunicorn on Linux, waitress on Windows) with FLASK_DEBUG=0
- Restrict CORS via CORS_ORIGINS
- Use HTTPS in front of services
- Configure logging, monitoring, and rate limiting

## Security
- Removed hard-coded private keys and sanitized Aptos config
- Externalized all credentials to .env files

## License
MIT

