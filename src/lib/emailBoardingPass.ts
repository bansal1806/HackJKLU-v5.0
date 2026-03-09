/**
 * Generates email-safe HTML for a boarding pass ticket.
 * Uses ONLY email-compatible HTML: nested tables, inline styles, no position:absolute,
 * no object-fit, no CSS gradients on divs, no flex/grid.
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

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(ticketId)}`;

    // For the poster center cell, use background attribute (supported by most email clients)
    const posterBg = posterUrl
        ? `background="${posterUrl}" style="background-image:url('${posterUrl}');background-size:cover;background-position:center;"`
        : `style="background-color:#0c0702;"`;

    return `
    <div style="max-width:800px;margin:24px auto;font-family:Georgia,'Times New Roman',serif;">
        <!-- Outer golden border table -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:800px;margin:0 auto;">
            <tr>
                <td style="background:#b8860b;padding:4px;border-radius:16px;">
                    <!-- Inner dark card table -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0c0702;border-radius:12px;">
                        <!-- Inner golden frame row -->
                        <tr>
                            <td style="padding:6px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid rgba(212,175,55,0.4);border-radius:8px;">
                                    <tr>
                                        <!-- ===== LEFT: QR STUB (22%) ===== -->
                                        <td width="22%" valign="top" style="padding:12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg, #f8ecd2, #ebd9b2);border-radius:12px;border:1px solid rgba(168,130,67,0.5);">
                                                <tr>
                                                    <td style="padding:10px;" align="center">
                                                        <!-- Inner decorative border -->
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid rgba(168,130,67,0.3);border-radius:10px;">
                                                            <tr>
                                                                <td style="padding:10px;" align="center">
                                                                    <!-- QR Code -->
                                                                    <table cellpadding="0" cellspacing="0" border="0" style="background:#fff;border-radius:6px;border:2px solid rgba(203,161,101,0.5);">
                                                                        <tr>
                                                                            <td style="padding:6px;">
                                                                                <img src="${qrUrl}" alt="QR Code" width="100" style="display:block;max-width:100%;" />
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <!-- Scan label -->
                                                                    <p style="color:#5c4022;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:2px;margin:8px 0 2px 0;font-family:Georgia,serif;">SCAN TO VERIFY</p>
                                                                    <p style="color:#6b5133;font-size:8px;font-family:monospace;font-weight:bold;letter-spacing:1px;margin:0 0 6px 0;">FT...${shortId}</p>
                                                                    <!-- Separator -->
                                                                    <p style="color:rgba(179,143,86,0.8);font-size:10px;margin:4px 0;letter-spacing:3px;">&mdash; &#10070; &mdash;</p>
                                                                    <!-- Tear line -->
                                                                    <div style="border-top:2px dashed rgba(163,128,83,0.4);margin:4px 8px;"></div>
                                                                    <!-- MT Code -->
                                                                    <table width="80%" cellpadding="0" cellspacing="0" border="0" style="margin:6px auto 0 auto;background:rgba(222,185,129,0.2);border-radius:4px;">
                                                                        <tr>
                                                                            <td align="center" style="padding:4px 0;">
                                                                                <p style="color:#3b2512;font-size:11px;font-weight:bold;font-family:monospace;letter-spacing:2px;margin:0;">MT-2026-XQ</p>
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

                                        <!-- ===== CENTER: POSTER (48%) ===== -->
                                        <td width="48%" valign="middle" ${posterBg}>
                                            <!-- Event title watermark -->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td align="center" style="padding:20px 10px;">
                                                        <h1 style="font-family:Georgia,serif;font-size:32px;font-weight:900;text-transform:uppercase;letter-spacing:5px;color:#ffd700;margin:0;text-shadow:0 2px 10px rgba(0,0,0,0.9),0 0 30px rgba(255,215,0,0.3);">${mainTitle}</h1>
                                                    </td>
                                                </tr>
                                                ${posterUrl ? `<tr><td style="height:180px;">&nbsp;</td></tr>` : ''}
                                            </table>
                                        </td>

                                        <!-- ===== RIGHT: INFO PANEL (30%) ===== -->
                                        <td width="30%" valign="top" style="background:#0c0702;border-left:2px solid rgba(212,175,55,0.3);padding:14px 16px;">

                                            <!-- Official Entry Pass badge -->
                                            <p style="color:#d4af37;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px 0;font-family:Georgia,serif;">&#10022; OFFICIAL ENTRY PASS</p>

                                            <!-- Event Title -->
                                            <h2 style="color:#fdf6e3;font-size:17px;font-weight:900;text-transform:uppercase;letter-spacing:1px;line-height:1.15;margin:0;font-family:Georgia,serif;">${mainTitle}</h2>
                                            <p style="color:#e3cf9d;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:4px 0 12px 0;font-family:Georgia,serif;">${subTitle}</p>

                                            <!-- Attendee -->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid rgba(212,175,55,0.2);margin-bottom:8px;">
                                                <tr>
                                                    <td style="padding-bottom:8px;">
                                                        <p style="color:#d4af37;font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:0 0 2px 0;font-family:Georgia,serif;">ATTENDEE</p>
                                                        <p style="color:#fff;font-size:13px;font-weight:900;margin:0;font-family:Georgia,serif;">${attendeeName}</p>
                                                    </td>
                                                </tr>
                                            </table>

                                            <!-- Venue -->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid rgba(212,175,55,0.2);margin-bottom:8px;">
                                                <tr>
                                                    <td style="padding-bottom:8px;">
                                                        <p style="color:#d4af37;font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:0 0 2px 0;font-family:Georgia,serif;">VENUE</p>
                                                        <p style="color:#fff;font-size:11px;font-weight:900;margin:0;font-family:Georgia,serif;">${venue}</p>
                                                    </td>
                                                </tr>
                                            </table>

                                            <!-- Schedule -->
                                            <p style="color:#d4af37;font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:0 0 2px 0;font-family:Georgia,serif;">SCHEDULE</p>
                                            <p style="color:#fff;font-size:11px;font-weight:900;margin:0 0 2px 0;font-family:Georgia,serif;">${datePart}</p>
                                            ${timePart ? `<p style="color:rgba(255,255,255,0.7);font-size:10px;font-style:italic;margin:0 0 10px 0;font-family:Georgia,serif;">&#8226; ${timePart}</p>` : '<div style="margin-bottom:10px;"></div>'}

                                            <!-- Bottom badges -->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td valign="middle">
                                                        <span style="color:#a09476;font-size:7px;font-family:monospace;letter-spacing:1px;border:1px solid rgba(160,148,118,0.3);padding:2px 5px;">MT-2026-XQ</span>
                                                    </td>
                                                    <td align="right" valign="middle">
                                                        <span style="color:#22c55e;font-size:7px;font-weight:900;text-transform:uppercase;letter-spacing:1px;padding:2px 6px;border:1px solid #16a34a;background:#14532d;border-radius:3px;font-family:Georgia,serif;">VERIFIED</span>
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
