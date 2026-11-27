import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const mysql = require('c:/Users/pc/Documents/oria.com-Strapi/node_modules/mysql2/promise');

const c = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'oria_strapi'
});

const [totalRows] = await c.query('SELECT COUNT(*) AS cnt FROM products');
const [remaining] = await c.query(
  "SELECT id, slug, name, published_at FROM products WHERE slug NOT LIKE 'mesin-%' AND slug NOT LIKE 'tinta-%' AND slug NOT LIKE 'kertas-%'"
);

console.log('Total rows in products:', totalRows[0].cnt);
console.log('Remaining un-prefixed rows:', remaining.length);
if (remaining.length > 0) console.table(remaining);

await c.end();
