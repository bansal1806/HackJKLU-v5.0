/**
 * Generates email-safe HTML for a boarding pass ticket.
 * Layout: Full-width poster banner on top → QR stub + Info panel below.
 * Uses ONLY email-compatible HTML: nested tables, inline styles, direct <img> tags.
 * No position:absolute, no background-image, no object-fit, no flex/grid.
 * Works in Gmail, Outlook, Yahoo Mail, Apple Mail.
 */

interface BoardingPassEmailParams {
    ticketId: string;
    eventTitle: string;
    attendeeName: string;
    venue: string;
    time: string;
    posterUrl?: string;
}

export function generateBoardingPassHTML({
    ticketId,
    eventTitle,
    attendeeName,
    venue,
    time,
    posterUrl,
}: BoardingPassEmailParams): string {
    const shortId = ticketId.length > 10
        ? ticketId.slice(0, 6) + '...' + ticketId.slice(-4)
        : ticketId;

    const mainTitle = eventTitle.toUpperCase().includes('LIVE')
        ? eventTitle.substring(0, eventTitle.toUpperCase().indexOf('LIVE')).trim()
        : eventTitle;

    const isMaanPanu = eventTitle.toLowerCase().includes('maan panu');
    const subTitle = eventTitle.toUpperCase().includes('LIVE')
        ? eventTitle.substring(eventTitle.toUpperCase().indexOf('LIVE')).trim()
        : isMaanPanu
            ? 'LIVE PERFORMANCE'
            : 'EVENT PASS';

    const timeParts = time.split('&#8226;');
    const datePart = timeParts[0]?.trim() || time;
    const timePart = timeParts[1]?.trim() || '';

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ticketId)}`;

    return `
    <div style="max-width:600px;margin:24px auto;font-family:Georgia,'Times New Roman',serif;">
        <!-- Outer golden border -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;">
            <tr>
                <td style="background:#b8860b;padding:3px;border-radius:12px;">
                    <!-- Inner dark card -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0c0702;border-radius:10px;">
                        <tr>
                            <td>
                                <!-- ============ TOP: POSTER BANNER ============ -->
                                ${posterUrl ? `
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <td style="padding:0;line-height:0;">
                                            <img src="${posterUrl}" alt="${eventTitle}" width="600" style="display:block;width:100%;max-width:600px;border-radius:10px 10px 0 0;" />
                                        </td>
                                    </tr>
                                </table>
                                ` : ''}

                                <!-- ============ TITLE BAR ============ -->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0500;border-top:2px solid #b8860b;border-bottom:2px solid #b8860b;">
                                    <tr>
                                        <td align="center" style="padding:12px 20px;">
                                            <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:900;text-transform:uppercase;letter-spacing:6px;color:#ffd700;margin:0;text-shadow:0 2px 8px rgba(0,0,0,0.9);">${mainTitle}</h1>
                                            <p style="color:#e3cf9d;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:3px;margin:4px 0 0 0;font-family:Georgia,serif;">${subTitle}</p>
                                        </td>
                                    </tr>
                                </table>

                                <!-- ============ BOTTOM: QR + INFO ============ -->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <!-- QR STUB (left) -->
                                        <td width="35%" valign="top" style="padding:16px;">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ebd9b2;border-radius:10px;border:1px solid #a88243;">
                                                <tr>
                                                    <td style="padding:12px;" align="center">
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #c9a65c;border-radius:8px;">
                                                            <tr>
                                                                <td style="padding:10px;" align="center">
                                                                    <!-- QR Code -->
                                                                    <table cellpadding="0" cellspacing="0" border="0" style="background:#fff;border-radius:6px;border:2px solid #c9a65c;">
                                                                        <tr>
                                                                            <td style="padding:6px;">
                                                                                <img src="${qrUrl}" alt="QR Code" width="120" style="display:block;max-width:100%;" />
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <p style="color:#5c4022;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:2px;margin:8px 0 2px 0;font-family:Georgia,serif;">SCAN TO VERIFY</p>
                                                                    <p style="color:#6b5133;font-size:8px;font-family:monospace;font-weight:bold;letter-spacing:1px;margin:0 0 4px 0;">${shortId}</p>
                                                                    <p style="color:#b38f56;font-size:10px;margin:4px 0;letter-spacing:3px;">&mdash; &#10070; &mdash;</p>
                                                                    <div style="border-top:2px dashed #c9a65c;margin:4px 8px;"></div>
                                                                    <table width="80%" cellpadding="0" cellspacing="0" border="0" style="margin:6px auto 0 auto;background:#d4c4a0;border-radius:4px;">
                                                                        <tr>
                                                                            <td align="center" style="padding:4px 0;">
                                                                                <p style="color:#3b2512;font-size:10px;font-weight:bold;font-family:monospace;letter-spacing:2px;margin:0;">MT-2026-XQ</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>

                                        <!-- INFO PANEL (right) -->
                                        <td width="65%" valign="top" style="padding:16px 16px 16px 8px;">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <!-- Logos -->
                                                <tr>
                                                    <td style="padding-bottom:12px;">
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                            <tr>
                                                                <td align="center" valign="middle">
                                                                    <img src="https://hackjklu.tech/events/HackJKLU.webp" alt="HackJKLU" height="24" style="display:inline-block;vertical-align:middle;" />
                                                                    <span style="font-family:Georgia,serif;font-weight:bold;font-size:12px;color:#d4af37;padding:0 6px;vertical-align:middle;">X</span>
                                                                    <img src="https://hackjklu.tech/events/JkLU_Logo.webp" alt="JKLU" height="38" style="display:inline-block;vertical-align:middle;" />
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <!-- Official badge -->
                                                <tr>
                                                    <td style="padding-bottom:10px;">
                                                        <span style="color:#d4af37;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:2px;font-family:Georgia,serif;">&#10022; OFFICIAL ENTRY PASS</span>
                                                    </td>
                                                </tr>
                                                <!-- Attendee -->
                                                <tr>
                                                    <td style="border-bottom:1px solid #3d3520;padding-bottom:10px;">
                                                        <p style="color:#d4af37;font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:0 0 2px 0;font-family:Georgia,serif;">ATTENDEE</p>
                                                        <p style="color:#fff;font-size:16px;font-weight:900;margin:0;font-family:Georgia,serif;">${attendeeName}</p>
                                                    </td>
                                                </tr>
                                                <!-- Venue -->
                                                <tr>
                                                    <td style="border-bottom:1px solid #3d3520;padding:10px 0;">
                                                        <p style="color:#d4af37;font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:0 0 2px 0;font-family:Georgia,serif;">VENUE</p>
                                                        <p style="color:#fff;font-size:13px;font-weight:900;margin:0;font-family:Georgia,serif;">${venue}</p>
                                                    </td>
                                                </tr>
                                                <!-- Schedule -->
                                                <tr>
                                                    <td style="padding:10px 0;">
                                                        <p style="color:#d4af37;font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:0 0 2px 0;font-family:Georgia,serif;">SCHEDULE</p>
                                                        <p style="color:#fff;font-size:13px;font-weight:900;margin:0;font-family:Georgia,serif;">${datePart}</p>
                                                        ${timePart ? `<p style="color:#ccc;font-size:11px;font-style:italic;margin:2px 0 0 0;font-family:Georgia,serif;">&#8226; ${timePart}</p>` : ''}
                                                    </td>
                                                </tr>
                                                <!-- Bottom badges -->
                                                <tr>
                                                    <td>
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                            <tr>
                                                                <td valign="middle">
                                                                    <span style="color:#a09476;font-size:7px;font-family:monospace;letter-spacing:1px;border:1px solid #5c5340;padding:2px 5px;">MT-2026-XQ</span>
                                                                </td>
                                                                <td align="right" valign="middle">
                                                                    <span style="color:#22c55e;font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:1px;padding:2px 8px;border:1px solid #16a34a;background:#14532d;border-radius:3px;font-family:Georgia,serif;">VERIFIED</span>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>`;
}
