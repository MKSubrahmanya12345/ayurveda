import express from 'express';
import cors from 'cors';
import Redis from 'ioredis';

const app = express();
app.use(cors());
app.use(express.json());

// ENV: REDIS_URL or REDIS_HOST/PORT
const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT || 6379),
    });

// Codes/locations mirror frontend; update locations as needed
const meta = {
  1:{code:'q001',location:'Location 1'},2:{code:'q002',location:'Location 2'},
  3:{code:'q003',location:'Location 3'},4:{code:'q004',location:'Location 4'},
  5:{code:'q005',location:'Location 5'},6:{code:'q006',location:'Location 6'},
  7:{code:'q007',location:'Location 7'},8:{code:'q008',location:'Location 8'},
  9:{code:'q009',location:'Location 9'},10:{code:'q010',location:'Location 10'}
};

// Key helpers
const keyQuestion = (qid) => `claims:q:${qid}`; // list of teamIds in order

// Atomically claim one of top 3 slots for a question
app.post('/claims', async (req, res) => {
  const { questionId, teamId } = req.body || {};
  if (!questionId || !teamId) return res.status(400).json({ error: 'Bad request' });
  const qKey = keyQuestion(questionId);

  try {
    const result = await redis.multi()
      .lrange(qKey, 0, -1)
      .exec();
    const existing = result?.[0]?.[1] || [];
    if (existing.includes(teamId)) {
      const position = existing.indexOf(teamId) + 1;
      const m = meta[questionId] || {};
      return res.json({ awarded: position <= 3, position: position <= 3 ? position : null, code: m.code, location: m.location });
    }
    if (existing.length >= 3) {
      return res.json({ awarded: false, position: null });
    }
    // Attempt to push if still < 3; use WATCH to avoid race
    await redis.watch(qKey);
    const current = await redis.lrange(qKey, 0, -1);
    if (current.includes(teamId)) {
      await redis.unwatch();
      const position = current.indexOf(teamId) + 1;
      const m = meta[questionId] || {};
      return res.json({ awarded: position <= 3, position: position <= 3 ? position : null, code: m.code, location: m.location });
    }
    if (current.length >= 3) {
      await redis.unwatch();
      return res.json({ awarded: false, position: null });
    }
    const tx = redis.multi();
    tx.rpush(qKey, teamId);
    tx.lrange(qKey, 0, -1);
    const execRes = await tx.exec();
    if (!execRes) {
      // transaction aborted, retry quickly once
      await redis.unwatch();
      const cur = await redis.lrange(qKey, 0, -1);
      if (cur.length >= 3) return res.json({ awarded: false, position: null });
      const pos = cur.indexOf(teamId) + 1;
      const m = meta[questionId] || {};
      return res.json({ awarded: pos > 0 && pos <= 3, position: pos > 0 && pos <= 3 ? pos : null, code: m.code, location: m.location });
    }
    const listAfter = execRes[1][1];
    const position = listAfter.indexOf(teamId) + 1;
    const m = meta[questionId] || {};
    return res.json({ awarded: position <= 3, position: position <= 3 ? position : null, code: m.code, location: m.location });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/claims', async (req, res) => {
  const teamId = String(req.query.teamId || '');
  if (!teamId) return res.status(400).json({ error: 'Missing teamId' });
  try {
    const result = [];
    for (let qid = 1; qid <= 10; qid++) {
      const arr = await redis.lrange(keyQuestion(qid), 0, -1);
      if (arr.includes(teamId)) {
        const m = meta[qid] || {};
        result.push({ questionId: qid, code: m.code, location: m.location });
      }
    }
    return res.json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Claims API listening on :${port}`);
});


