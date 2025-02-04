export function signOut() {
  document.cookie = "accessToken=; Max-Age=0"; // 쿠키 삭제
  window.location.href = "/login";
}
