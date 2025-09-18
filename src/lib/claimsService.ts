import { questions } from "@/data/questions";

export interface ClaimResult {
  awarded: boolean;
  position: number | null; // 1..3 if awarded, otherwise null
  code?: string;
  location?: string;
}

export interface UnlockedReward {
  questionId: number;
  code: string;
  location: string;
}

const STORAGE_KEY = "tw_top3_claims";

function getApiBase(): string | null {
  const url = (import.meta as any).env?.VITE_CLAIMS_API_URL as string | undefined;
  return url && url.trim().length > 0 ? url : null;
}

// No Supabase; API-first with local fallback

async function claimViaApi(questionId: number, teamId: string): Promise<ClaimResult> {
  const base = getApiBase();
  if (!base) throw new Error("API not configured");
  const res = await fetch(`${base}/claims`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId, teamId }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

async function getMyClaimsViaApi(teamId: string): Promise<UnlockedReward[]> {
  const base = getApiBase();
  if (!base) throw new Error("API not configured");
  const res = await fetch(`${base}/claims?teamId=${encodeURIComponent(teamId)}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = (await res.json()) as { questionId: number; code: string; location: string }[];
  return data;
}

function readLocalClaims(): Record<number, string[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLocalClaims(claims: Record<number, string[]>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
  } catch {}
}

async function claimLocally(questionId: number, teamId: string): Promise<ClaimResult> {
  const claims = readLocalClaims();
  const current = claims[questionId] ?? [];
  if (current.includes(teamId)) {
    const position = current.indexOf(teamId) + 1;
    const q = questions.find(q => q.id === questionId);
    return { awarded: position <= 3, position: position <= 3 ? position : null, code: q?.code, location: q?.location };
  }
  if (current.length < 3) {
    const updated = { ...claims, [questionId]: [...current, teamId] };
    writeLocalClaims(updated);
    const q = questions.find(q => q.id === questionId);
    return { awarded: true, position: updated[questionId].length, code: q?.code, location: q?.location };
  }
  return { awarded: false, position: null };
}

async function getMyClaimsLocally(teamId: string): Promise<UnlockedReward[]> {
  const claims = readLocalClaims();
  const mine = Object.entries(claims)
    .filter(([, teamIds]) => teamIds.includes(teamId))
    .map(([qid]) => Number(qid));
  return questions
    .filter(q => mine.includes(q.id))
    .map(q => ({ questionId: q.id, code: q.code, location: q.location }));
}

export const claimsService = {
  async claim(questionId: number, teamId: string): Promise<ClaimResult> {
    const base = getApiBase();
    if (base) {
      try {
        return await claimViaApi(questionId, teamId);
      } catch {
        // fall back to local on API failure
      }
    }
    return claimLocally(questionId, teamId);
  },
  async getMyClaims(teamId: string): Promise<UnlockedReward[]> {
    const base = getApiBase();
    if (base) {
      try {
        return await getMyClaimsViaApi(teamId);
      } catch {
        // fall back to local on API failure
      }
    }
    return getMyClaimsLocally(teamId);
  },
};


