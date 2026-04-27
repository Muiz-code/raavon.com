const ICON_B64 =
  "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";

/* ── Shared wrapper ───────────────────────────────────────────────── */
export const wrapper = (content: string) => `
<!DOCTYPE html>
<html lang="en" bgcolor="#000000" style="background:#000000; margin:0; padding:0;"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light" />
  <style>
    html, body { margin:0 !important; padding:0 !important; width:100% !important; background:#000000 !important; }
    * { box-sizing:border-box; }
    @media (prefers-color-scheme: dark) {
      html, body, table, td { background:#000000 !important; }
    }
  </style>
</head>
<body bgcolor="#000000" style="margin:0; padding:0; width:100%; background:#000000 !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">

  <!-- 100% wide bleed wrapper — no padding so black covers all edges -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#000000"
    style="width:100%; min-width:100%; background:#000000 !important; border-collapse:collapse;">
    <tr>
      <td bgcolor="#000000" align="center" style="background:#000000 !important; padding:48px 0;">

        <!-- Centered content column — max 560px -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:560px; width:100%; background:#000000;">
          <tr><td style="padding:0 24px;">

            <!-- Top rule -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
              <tr><td bgcolor="#000000" style="height:1px; background:linear-gradient(90deg,transparent 0%,#C19A6B 50%,transparent 100%); font-size:1px; line-height:1px;">&nbsp;</td></tr>
            </table>

            <!-- Logo — inline icon + wordmark -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom:36px;">
              <tr>
                <td style="vertical-align:middle; padding-right:14px;">
                  <img src="data:image/png;base64,${ICON_B64}"
                       alt="R" width="48" height="48"
                       style="display:block; width:48px; height:48px; border:0;" />
                </td>
                <td style="vertical-align:middle;">
                  <span style="font-family:Arial,sans-serif; font-weight:800; font-size:22px; letter-spacing:6px; color:#FAF7F2; text-transform:uppercase;">RAA</span><span style="font-family:Arial,sans-serif; font-weight:800; font-size:22px; letter-spacing:6px; color:#7A4A35; text-transform:uppercase;">VON</span>
                </td>
              </tr>
            </table>

            <!-- Content -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${content}
            </table>

            <!-- Bottom rule -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:40px; margin-bottom:24px;">
              <tr><td style="height:1px; background:linear-gradient(90deg,transparent 0%,rgba(193,154,107,0.3) 50%,transparent 100%); font-size:1px; line-height:1px;">&nbsp;</td></tr>
            </table>

            <!-- Footer -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td align="center" style="padding-bottom:8px;">
                <p style="font-family:Arial,sans-serif; font-size:11px; color:rgba(250,247,242,0.2); letter-spacing:3px; text-transform:uppercase; margin:0;">
                  RAAVON GROUP &nbsp;&middot;&nbsp; RAAVON.COM
                </p>
              </td></tr>
              <tr><td align="center">
                <p style="font-family:Georgia,serif; font-size:11px; color:rgba(193,154,107,0.3); font-style:italic; margin:0;">
                  The spirit behind every brand.
                </p>
              </td></tr>
            </table>

          </td></tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;

/* ── Contact confirmation → sent to the person who filled the form ── */
export function contactConfirmationEmail(name: string) {
  return wrapper(`
    <tr><td style="background:#0A0A08; border:1px solid rgba(193,154,107,0.15); padding:36px;">

      <!-- Label -->
      <p style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#C19A6B; margin:0 0 20px;">
        Message received
      </p>

      <!-- Heading -->
      <h1 style="font-family:Georgia,serif; font-size:26px; font-weight:400; color:#FAF7F2; margin:0 0 20px; line-height:1.35; font-style:italic;">
        Thanks, ${name}.
      </h1>

      <p style="font-family:Arial,sans-serif; font-size:15px; color:rgba(250,247,242,0.55); line-height:1.75; margin:0 0 16px;">
        Your message has been received by the Raavon team.
        We typically respond within 1&ndash;2 business days.
      </p>

      <p style="font-family:Arial,sans-serif; font-size:15px; color:rgba(250,247,242,0.55); line-height:1.75; margin:0 0 32px;">
        In the meantime, explore what we are building at
        <a href="https://raavon.com" style="color:#C19A6B; text-decoration:none;">raavon.com</a>.
      </p>

      <!-- Divider -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr>
        <td style="height:1px; background:rgba(193,154,107,0.12); line-height:1px; font-size:1px;">&nbsp;</td>
      </tr></table>

      <!-- CTA -->
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="border:1px solid rgba(193,154,107,0.35);">
          <a href="https://raavon.com"
             style="display:block; padding:12px 28px; font-family:Arial,sans-serif; font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#C19A6B; text-decoration:none;">
            Explore Raavon &rarr;
          </a>
        </td></tr>
      </table>

    </td></tr>
  `);
}

/* ── Contact notification → sent to contact@raavon.com ─────────── */
export function contactNotificationEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return wrapper(`
    <tr><td style="background:#0A0A08; border:1px solid rgba(193,154,107,0.15); padding:36px;">

      <!-- Label -->
      <p style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#C19A6B; margin:0 0 20px;">
        New contact form submission
      </p>

      <!-- Subject -->
      <h1 style="font-family:Arial,sans-serif; font-size:20px; font-weight:700; color:#FAF7F2; margin:0 0 28px;">
        ${data.subject || "New enquiry"}
      </h1>

      <!-- Meta table -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid rgba(193,154,107,0.1);">
            <span style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:rgba(250,247,242,0.3);">From</span>
          </td>
          <td align="right" style="padding:10px 0; border-bottom:1px solid rgba(193,154,107,0.1);">
            <span style="font-family:Arial,sans-serif; font-size:14px; color:#FAF7F2;">${data.name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0; border-bottom:1px solid rgba(193,154,107,0.1);">
            <span style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:rgba(250,247,242,0.3);">Email</span>
          </td>
          <td align="right" style="padding:10px 0; border-bottom:1px solid rgba(193,154,107,0.1);">
            <a href="mailto:${data.email}" style="font-family:Arial,sans-serif; font-size:14px; color:#C19A6B; text-decoration:none;">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;">
            <span style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:rgba(250,247,242,0.3);">Subject</span>
          </td>
          <td align="right" style="padding:10px 0;">
            <span style="font-family:Arial,sans-serif; font-size:14px; color:#FAF7F2;">${data.subject}</span>
          </td>
        </tr>
      </table>

      <!-- Message body -->
      <div style="padding:20px; background:rgba(193,154,107,0.04); border-left:2px solid #C19A6B; margin-bottom:28px;">
        <p style="font-family:Arial,sans-serif; font-size:14px; color:rgba(250,247,242,0.7); line-height:1.8; margin:0; white-space:pre-wrap;">${data.message}</p>
      </div>

      <!-- Reply CTA -->
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="border:1px solid rgba(193,154,107,0.45);">
          <a href="mailto:${data.email}?subject=Re:%20${encodeURIComponent(data.subject)}"
             style="display:block;  font-family:Arial,sans-serif; font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#C19A6B; text-decoration:none;">
            Reply to ${data.name} &rarr;
          </a>
        </td></tr>
      </table>

    </td></tr>
  `);
}

/* ── Newsletter welcome → sent to subscriber ─────────────────────── */
export function newsletterWelcomeEmail(email: string) {
  return wrapper(`
    <tr><td style="background:#0A0A08; border:1px solid rgba(193,154,107,0.15); padding:36px;">

      <!-- Label -->
      <p style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#C19A6B; margin:0 0 20px;">
        The Inside Track
      </p>

      <!-- Heading -->
      <h1 style="font-family:Georgia,serif; font-size:26px; font-weight:400; color:#FAF7F2; margin:0 0 20px; line-height:1.35; font-style:italic;">
        You&rsquo;re in. Welcome.
      </h1>

      <p style="font-family:Arial,sans-serif; font-size:15px; color:rgba(250,247,242,0.55); line-height:1.75; margin:0 0 16px;">
        You are now subscribed to updates from Raavon Group &mdash; new ventures,
        ideas, and insights delivered directly to <span style="color:#FAF7F2;">${email}</span>.
      </p>

      <p style="font-family:Arial,sans-serif; font-size:15px; color:rgba(250,247,242,0.55); line-height:1.75; margin:0 0 32px;">
        We do not send noise. Only things that matter.
      </p>

      <!-- CTA -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
        <tr><td style="border:1px solid rgba(193,154,107,0.45);">
          <a href="https://raavon.com"
             style="display:block; padding:12px 28px; font-family:Arial,sans-serif; font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#C19A6B; text-decoration:none;">
            Explore Raavon &rarr;
          </a>
        </td></tr>
      </table>

      <!-- Divider -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;"><tr>
        <td style="height:1px; background:rgba(193,154,107,0.12); line-height:1px; font-size:1px;">&nbsp;</td>
      </tr></table>

      <p style="font-family:Arial,sans-serif; font-size:11px; color:rgba(250,247,242,0.25); margin:0;">
        You subscribed at raavon.com. &nbsp;
        <a href="https://raavon.com/api/unsubscribe?email=${encodeURIComponent(email)}"
           style="color:rgba(193,154,107,0.45); text-decoration:underline;">Unsubscribe</a>
      </p>

    </td></tr>
  `);
}

/* ── Newsletter broadcast → sent to all subscribers ─────────────── */
export function newsletterBroadcastEmail(
  subject: string,
  body: string,
  recipientEmail = "",
) {
  return wrapper(`
    <tr><td style="background:#0A0A08; border:1px solid rgba(193,154,107,0.15); padding:36px;">

      <!-- Label -->
      <p style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#C19A6B; margin:0 0 20px;">
        The Inside Track
      </p>

      <!-- Subject as heading -->
      <h1 style="font-family:Georgia,serif; font-size:24px; font-weight:400; color:#FAF7F2; margin:0 0 24px; line-height:1.4; font-style:italic;">
        ${subject}
      </h1>

      <!-- Body (supports basic HTML) -->
      <div style="font-family:Arial,sans-serif; font-size:15px; color:rgba(250,247,242,0.65); line-height:1.8; margin:0 0 32px;">
        ${body}
      </div>

      <!-- CTA -->
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="border:1px solid rgba(193,154,107,0.45);">
          <a href="https://raavon.com"
             style="display:block; padding:12px 28px; font-family:Arial,sans-serif; font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#C19A6B; text-decoration:none;">
            Visit Raavon &rarr;
          </a>
        </td></tr>
      </table>

      <!-- Divider -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px; margin-bottom:16px;"><tr>
        <td style="height:1px; background:rgba(193,154,107,0.12); line-height:1px; font-size:1px;">&nbsp;</td>
      </tr></table>

      <p style="font-family:Arial,sans-serif; font-size:11px; color:rgba(250,247,242,0.25); margin:0;">
        You subscribed at raavon.com. &nbsp;
        <a href="https://raavon.com/api/unsubscribe?email=${encodeURIComponent(recipientEmail)}"
           style="color:rgba(193,154,107,0.45); text-decoration:underline;">Unsubscribe</a>
      </p>

    </td></tr>
  `);
}
