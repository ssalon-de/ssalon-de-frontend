export async function logout() {
  try {
    const { status } = await fetch("/api/logout", {
      method: "POST",
    });
    return status;
  } catch (error) {
    console.log(error);
  }
}
