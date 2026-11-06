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
				<title>XML Sitemap - oria.co.id</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/png" href="/favicon.png" />
				<style type="text/css">
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
						color: #222;
						background-color: #f7f9fa;
						margin: 0;
						padding: 40px 20px;
					}
					.container {
						max-width: 1080px;
						margin: 0 auto;
						background: #fff;
						padding: 32px;
						border-radius: 8px;
						box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
					}
					.header-title {
						display: flex;
						align-items: center;
						gap: 12px;
						margin-bottom: 8px;
					}
					h1 {
						color: #0A0A0C;
						font-size: 28px;
						margin: 0;
						font-weight: 800;
						letter-spacing: -0.02em;
					}
					.badge {
						background: #0A0A0C;
						color: #FFE500;
						font-size: 11px;
						font-weight: 700;
						padding: 4px 10px;
						border-radius: 4px;
						text-transform: uppercase;
						letter-spacing: 0.1em;
					}
					p {
						font-size: 14px;
						line-height: 1.6;
						color: #555;
						margin-bottom: 24px;
					}
					p.expl {
						background: #fafafa;
						padding: 16px 20px;
						border-left: 4px solid #FFE500;
						border-radius: 4px;
						color: #444;
					}
					a {
						color: #0A0A0C;
						font-weight: 500;
						text-decoration: none;
					}
					a:hover {
						color: #d1b800;
						text-decoration: underline;
					}
					table {
						width: 100%;
						border-collapse: collapse;
						margin-top: 20px;
					}
					th {
						background-color: #0A0A0C;
						color: #fff;
						text-align: left;
						padding: 12px 16px;
						font-size: 13px;
						font-weight: 700;
						text-transform: uppercase;
						letter-spacing: 0.05em;
					}
					th.text-center, td.text-center {
						text-align: center;
					}
					th.text-right, td.text-right {
						text-align: right;
						white-space: nowrap;
					}
					td {
						padding: 12px 16px;
						border-bottom: 1px solid #eee;
						font-size: 13.5px;
						word-break: break-all;
					}
					tr:hover td {
						background-color: #fdfdfd;
					}
					tr:nth-child(even) td {
						background-color: #fafbfc;
					}
					tr:nth-child(even):hover td {
						background-color: #f5f7f9;
					}
					.priority-tag {
						display: inline-block;
						background: #f0f0f0;
						padding: 2px 8px;
						border-radius: 3px;
						font-size: 12px;
						font-weight: 600;
					}
					.footer {
						margin-top: 36px;
						padding-top: 18px;
						border-top: 1px solid #eee;
						font-size: 12px;
						color: #888;
						text-align: center;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header-title">
						<h1>XML Sitemap</h1>
						<span class="badge">oria.co.id</span>
					</div>
					<p class="expl">
						Sitemap XML ini dihasilkan secara dinamis untuk mengoptimalkan pengindeksan oleh mesin pencari seperti Google. Format ini diselaraskan sepenuhnya dengan standar sitemap XML global untuk memaksimalkan performa SERP dan perayapan halaman produk maupun artikel.
					</p>
					
					<xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
						<p>Sitemap indeks ini merujuk ke sub-sitemap berikut:</p>
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
						<p>Jumlah URL dalam sitemap ini: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></p>
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
											<xsl:value-of select="sitemap:changefreq"/>
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
						oria.co.id — Headless SvelteKit &amp; Strapi XML Sitemap
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
