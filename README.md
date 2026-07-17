# FE Skripsi - CassavaGuard

Frontend project berbasis React + Vite untuk aplikasi prediksi penyakit tanaman singkong.

## Requirement yang perlu diinstal

Sebelum menjalankan proyek, pastikan perangkat Anda sudah memiliki:

- Node.js 18+ (disarankan Node.js 20 LTS)
- npm (biasanya sudah ikut terinstall saat menginstal Node.js)
- Git (opsional, tapi disarankan untuk clone project)
- VS Code (opsional, tapi direkomendasikan)

## Cara install Node.js di Windows

1. Buka situs resmi Node.js: https://nodejs.org/
2. Unduh versi LTS.
3. Jalankan installer yang sudah diunduh.
4. Ikuti langkah instalasi sampai selesai.
5. Setelah selesai, buka Terminal/PowerShell lalu cek versi:

```bash
node -v
npm -v
```

Jika keluar versi Node dan npm, berarti instalasi berhasil.

## Cara clone dan install project

Buka terminal di folder yang diinginkan, lalu jalankan:

```bash
git clone https://github.com/Alvarizqi09/fe-skripsi-sandya.git
cd fe-skripsi-sandya
npm install
```

## Cara menjalankan project

Untuk menjalankan aplikasi dalam mode development:

```bash
npm run dev
```

Setelah perintah berjalan, biasanya Vite akan menampilkan URL seperti:

```bash
http://localhost:5173/
```

Buka URL tersebut di browser.

## Cara build project

Untuk membuat versi production:

```bash
npm run build
```

Hasil build akan berada di folder `dist`.

## Cara cek linting

```bash
npm run lint
```

## Troubleshooting

- Jika port 5173 sudah dipakai, Vite biasanya akan otomatis memilih port lain.
- Jika ada error terkait dependency, coba hapus folder `node_modules` dan install ulang:

```bash
rm -rf node_modules
npm install
```

- Jika menggunakan Windows PowerShell, perintah `rm -rf` bisa diganti dengan:

```bash
Remove-Item -Recurse -Force node_modules
npm install
```

## Struktur singkat project

- `src/` berisi source code React
- `public/` berisi file statis
- `package.json` berisi daftar dependency dan script
