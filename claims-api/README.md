Claims API (Redis-backed)

Endpoints:
- POST /claims { questionId, teamId } → { awarded, position, code, location }
- GET /claims?teamId=... → [{ questionId, code, location }]

Run locally:
```
cd tradewisdom-hunt/claims-api
npm install
# Needs Redis. Use Docker:
docker run -p 6379:6379 --name redis -d redis:7-alpine
npm start
```

Env vars:
- PORT (default 3000)
- REDIS_URL (e.g., redis://default:pass@host:port)
- or REDIS_HOST, REDIS_PORT

Deploy (Render):
- New Web Service → repo path tradewisdom-hunt/claims-api
- Build command: npm install
- Start command: npm start
- Add a Redis instance and set REDIS_URL in service env.

Frontend setup:
- Set VITE_CLAIMS_API_URL to the deployed URL (e.g., https://your-api.onrender.com)
- Rebuild and redeploy the frontend.

