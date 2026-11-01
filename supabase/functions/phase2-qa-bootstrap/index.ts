// Retired after real provider QA. No privileged actions remain.
Deno.serve(() => new Response("QA completed; endpoint retired.", { status: 410 }));
