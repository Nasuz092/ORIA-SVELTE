#!/bin/bash
# ==============================================================================
# Cron Runner Script: Autonomous Article Bot (oria.co.id)
# Jadwal Eksekusi: Senin, Rabu, Jumat (Pukul 08:00 WIB) — Cron: 0 8 * * 1,3,5
# Path Server: /home/mesinpri/domains/oria.co.id/public_html
# ==============================================================================

# Aktifkan virtual environment Node.js server
source /home/mesinpri/nodevenv/domains/oria.co.id/public_html/24/bin/activate

# Pindah ke direktori utama website Svelte
cd /home/mesinpri/domains/oria.co.id/public_html

# Pastikan folder logs tersedia
mkdir -p logs

# Eksekusi Autonomous Bot generator (1 artikel per jadwal)
node scripts/autonomous_article_bot.js --count=1 >> logs/autonomous_bot.log 2>&1
