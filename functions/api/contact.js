export async function onRequestPost({ request }) {
  const res = await fetch("https://geotapp-backend.onrender.com/api/contact/", {
    method: "POST",
    headers: { "content-type": request.headers.get("content-type") || "application/json" },
    body: await request.text()
  });
  return new Response(await res.text(), {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") || "application/json" }
  });
}
