import crypto from "crypto";
const CHALLENGE_TTL_MS = 2 * 60 * 1000; // 2 minutes
const challengeStore = new Map();

const hashAnswer = (value) =>
  crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createMathChallenge = () => {
  const operations = ["+", "-", "×", "÷"];
  const op = operations[getRandomInt(0, operations.length - 1)];
  let a = getRandomInt(10, 99);
  let b = getRandomInt(2, 9);
  let answer;

  switch (op) {
    case "+":
      b = getRandomInt(10, 99);
      answer = a + b;
      break;
    case "-":
      if (b > a) [a, b] = [b, a];
      answer = a - b;
      break;
    case "×":
      b = getRandomInt(2, 12);
      answer = a * b;
      break;
    case "÷":
      b = getRandomInt(2, 9);
      answer = a;
      a = answer * b;
      break;
    default:
      answer = a + b;
  }

  return {
    prompt: `What is ${a} ${op} ${b}?`,
    answer: String(answer),
  };
};

const createCodeChallenge = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const length = 6;
  let code = "";
  for (let i = 0; i < length; i += 1) {
    code += chars.charAt(getRandomInt(0, chars.length - 1));
  }

  return {
    prompt: `Type this code exactly: ${code}`,
    answer: code,
  };
};

const challengeFactories = [createMathChallenge, createCodeChallenge];

const generateChallenge = () => {
  const factory = challengeFactories[getRandomInt(0, challengeFactories.length - 1)];
  return factory();
};

export function issueChallenge() {
  const selected = generateChallenge();

  const token = crypto.randomUUID();
  challengeStore.set(token, {
    answerHash: hashAnswer(selected.answer),
    expiresAt: Date.now() + CHALLENGE_TTL_MS,
  });

  return { token, prompt: selected.prompt };
}

export function validateChallenge(token, answer) {
  if (!token || typeof answer === "undefined") {
    return false;
  }

  const entry = challengeStore.get(token);
  if (!entry) {
    return false;
  }

  if (Date.now() > entry.expiresAt) {
    challengeStore.delete(token);
    return false;
  }

  const matches = entry.answerHash === hashAnswer(answer);
  challengeStore.delete(token);
  return matches;
}
