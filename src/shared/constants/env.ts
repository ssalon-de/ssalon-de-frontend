const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const NEXT_SERVER = process.env.NEXTAUTH_URL ?? "";
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY ?? ""; // 서버와 공유하는 키

export { BASE_URL, SECRET_KEY, NEXT_SERVER };
