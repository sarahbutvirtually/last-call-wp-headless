export function sanitizeHtml(input) {
  if (!input) return "";
  let out = String(input);

  out = out.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

  out = out.replace(/<(iframe|object|embed)[\s\S]*?>[\s\S]*?<\/\1>/gi, "");

  out = out.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  out = out.replace(
    /(href|src)\s*=\s*(?:"|')?\s*javascript:[^"'\s>]*(?:"|'|\s|>)/gi,
    '$1="#"'
  );

  out = out.replace(/<meta[^>]*http-equiv=[\"']?refresh[\"']?[^>]*>/gi, "");

  return out;
}
