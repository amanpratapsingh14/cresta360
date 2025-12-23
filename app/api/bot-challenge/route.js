import { NextResponse } from "next/server";
import { issueChallenge } from "../../../lib/bot-challenge-service";
	export async function GET() {
  try {
    const challenge = issueChallenge();
    return NextResponse.json(challenge, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Bot challenge error:", error);
    return NextResponse.json({ error: "Challenge unavailable" }, { status: 500 });
  }
}
