export async function onRequest({ request, params }) {
  const backendBase = "https://geotapp-backend.onrender.com/api";
  const url = new URL(request.url);
  const seg = params.path ? "/" + params.path : "";
  const target = backendBase + seg + (url.search || "");

  const init = {
    method: request.method,
    headers: new Headers(request.headers),
    body: ["GET","HEAD","OPTIONS"].includes(request.method) ? undefined : await request.arrayBuffer(),
    redirect: "follow"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "access-control-allow-headers": request.headers.get("access-control-request-headers") || "content-type"
      }
    });
  }

  init.headers.delete("host");

  const res = await fetch(target, init);
  const body = await res.arrayBuffer();
  const out = new Response(body, { status: res.status, headers: new Headers(res.headers) });
  out.headers.set("access-control-allow-origin", "*");
  return out;
}
