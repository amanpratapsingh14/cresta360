export function buildContactEmail(payload) {
  const {
    name,
    phone,
    email,
    city,
    service,
    message,
  } = payload;

  const rows = [
    { label: "Full name", value: name },
    { label: "Phone", value: phone },
    { label: "Email", value: email },
    { label: "City", value: city },
    { label: "Service", value: service },
    { label: "Message", value: message },
  ];

  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0c0f;padding:40px 0;font-family:'Manrope',Helvetica,Arial,sans-serif;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#11131b;border-radius:28px;padding:40px;border:1px solid rgba(212,176,106,.35);color:#e9ecf2;">
          <tr>
            <td align="center" style="font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:600;padding-bottom:10px;">
              New design request
            </td>
          </tr>
          <tr>
            <td align="center" style="color:#b4bac7;font-size:14px;padding-bottom:30px;">
              Crafted via cresta360 interiors website
            </td>
          </tr>
          ${rows
            .map(
              (row) => `
              <tr>
                <td style="padding:14px 18px;background:rgba(255,255,255,.03);border-radius:18px;margin-bottom:12px;border:1px solid rgba(255,255,255,.08);color:#e9ecf2;">
                  <div style="text-transform:uppercase;letter-spacing:.14em;font-size:11px;color:#b88f43;font-weight:800;margin-bottom:6px;">
                    ${row.label}
                  </div>
                  <div style="font-size:15px;line-height:1.45;color:#e9ecf2;">
                    ${row.value ? sanitize(row.value) : "<span style='color:#8e95a6;'>Not provided</span>"}
                  </div>
                </td>
              </tr>`
            )
            .join("")}
          <tr>
            <td align="center" style="padding-top:24px;font-size:12px;color:#8e95a6;">
              Sent ${new Date().toLocaleString()}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}

function sanitize(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
