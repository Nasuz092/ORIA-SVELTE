<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap — ORIA Industrial Printing</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/png" href="/favicon.png" />
				<style type="text/css">
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", Inter, sans-serif;
						color: #e4e4e7;
						background-color: #050508;
						margin: 0;
						padding: 40px 20px;
					}
					.container {
						max-width: 1100px;
						margin: 0 auto;
						background: #0d0d12;
						padding: 36px 40px;
						border-radius: 12px;
						border: 1px solid #1c1c26;
						box-shadow: 0 20px 48px rgba(0, 0, 0, 0.7);
					}
					.header-wrap {
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1px solid #1c1c26;
						padding-bottom: 22px;
						margin-bottom: 24px;
					}
					.brand-title {
						display: flex;
						align-items: center;
						gap: 12px;
					}
					h1 {
						color: #ffffff;
						font-size: 26px;
						font-weight: 800;
						letter-spacing: 0.08em;
						text-transform: uppercase;
						margin: 0;
					}
					h1 span.gold {
						color: #FFE500;
					}
					.badge {
						background: rgba(255, 229, 0, 0.08);
						color: #FFE500;
						border: 1px solid rgba(255, 229, 0, 0.3);
						font-size: 11px;
						font-weight: 700;
						padding: 5px 12px;
						border-radius: 4px;
						text-transform: uppercase;
						letter-spacing: 0.15em;
					}
					p.expl {
						background: #12121a;
						padding: 16px 20px;
						border-left: 3px solid #FFE500;
						border-radius: 6px;
						color: #a1a1aa;
						font-size: 13.5px;
						line-height: 1.6;
						margin-bottom: 26px;
					}
					p.count {
						font-size: 13.5px;
						color: #a1a1aa;
						margin-bottom: 14px;
					}
					p.count strong {
						color: #FFE500;
						font-weight: 700;
					}
					table {
						width: 100%;
						border-collapse: separate;
						border-spacing: 0;
						margin-top: 12px;
						border: 1px solid #1f1f2d;
						border-radius: 8px;
						overflow: hidden;
					}
					th {
						background-color: #14141e;
						color: #ffffff;
						text-align: left;
						padding: 14px 18px;
						font-size: 12px;
						font-weight: 700;
						text-transform: uppercase;
						letter-spacing: 0.1em;
						border-bottom: 2px solid #FFE500;
					}
					th.text-center, td.text-center {
						text-align: center;
					}
					th.text-right, td.text-right {
						text-align: right;
						white-space: nowrap;
					}
					td {
						padding: 13px 18px;
						border-bottom: 1px solid #181824;
						font-size: 13px;
						word-break: break-all;
						color: #d4d4d8;
					}
					tr:last-child td {
						border-bottom: none;
					}
					tr:hover td {
						background-color: #171724;
					}
					tr:nth-child(even) td {
						background-color: #0f0f17;
					}
					tr:nth-child(even):hover td {
						background-color: #171724;
					}
					a {
						color: #ffffff;
						font-weight: 500;
						text-decoration: none;
						transition: color 0.15s ease;
					}
					a:hover {
						color: #FFE500;
						text-decoration: underline;
					}
					.priority-tag {
						display: inline-block;
						background: #181824;
						color: #FFE500;
						border: 1px solid rgba(255, 229, 0, 0.25);
						padding: 2px 8px;
						border-radius: 4px;
						font-size: 11px;
						font-weight: 700;
						font-family: monospace;
					}
					.freq-tag {
						display: inline-block;
						background: #14141e;
						color: #a1a1aa;
						border: 1px solid #222232;
						padding: 2px 8px;
						border-radius: 4px;
						font-size: 11px;
						text-transform: uppercase;
						letter-spacing: 0.05em;
					}
					.footer {
						margin-top: 32px;
						padding-top: 20px;
						border-top: 1px solid #1c1c26;
						font-size: 12px;
						color: #71717a;
						text-align: center;
						letter-spacing: 0.05em;
					}
					.footer span {
						color: #FFE500;
						font-weight: 600;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header-wrap">
						<div class="brand-title">
							<h1>ORIA<span class="gold">.</span> XML SITEMAP</h1>
						</div>
						<span class="badge">oria.co.id</span>
					</div>
					
					<p class="expl">
						Sitemap XML ini dihasilkan secara dinamis untuk mengoptimalkan perayapan oleh mesin pencari Google. Diselaraskan khusus dengan struktur arsitektur <strong>ORIA Industrial Printing</strong> agar seluruh katalog mesin industri, spesifikasi teknis, serta artikel edukasi terindeks dengan cepat dan presisi.
					</p>
					
					<xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
						<p class="count">Sitemap indeks ini merujuk ke <strong><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></strong> sub-sitemap:</p>
						<table>
							<thead>
								<tr>
									<th>Sitemap URL</th>
									<th class="text-right">Waktu Modifikasi Terakhir</th>
								</tr>
							</thead>
							<tbody>
								<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
									<tr>
										<td>
											<a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
										</td>
										<td class="text-right">
											<xsl:value-of select="sitemap:lastmod"/>
										</td>
									</tr>
								</xsl:for-each>
							</tbody>
						</table>
					</xsl:if>
					
					<xsl:if test="count(sitemap:urlset/sitemap:url) &gt; 0">
						<p class="count">Total URL terindeks dalam sitemap ini: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></p>
						<table>
							<thead>
								<tr>
									<th>URL Halaman</th>
									<th class="text-center">Prioritas</th>
									<th class="text-center">Frekuensi</th>
									<th class="text-right">Terakhir Dimodifikasi</th>
								</tr>
							</thead>
							<tbody>
								<xsl:for-each select="sitemap:urlset/sitemap:url">
									<tr>
										<td>
											<a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
										</td>
										<td class="text-center">
											<span class="priority-tag"><xsl:value-of select="sitemap:priority"/></span>
										</td>
										<td class="text-center">
											<span class="freq-tag"><xsl:value-of select="sitemap:changefreq"/></span>
										</td>
										<td class="text-right">
											<xsl:value-of select="sitemap:lastmod"/>
										</td>
									</tr>
								</xsl:for-each>
							</tbody>
						</table>
					</xsl:if>
					
					<div class="footer">
						oria.co.id — <span>ORIA Industrial Printing</span> &middot; Precision Engineering SEO Sitemap
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
