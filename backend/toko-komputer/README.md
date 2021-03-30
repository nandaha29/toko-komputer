# Backend Toko Komputer
Repository ini berisi source code untuk membuat API pada project "Toko Komputer"

## Getting Started
Berikut ini adalah langkah untuk copy project ini pada local machine

### Clone the repository
Buka terminal (command prompt) dan arahkan ke direktory project ini akan disimpan.
Setelah itu jalankan perintah berikut ini untuk clone repository ini.

```
git clone https://github.com/zakaria29/toko-komputer.git
```

### Install Dependencies
Setelah proses clone selesai, masuk direktori projectnya dengan perintah berikut.

```
cd toko-komputer
```

Setelah itu jalankan perintah berikut untuk install semua library project ini.

```
npm install
```

### Create and Import Database
* Pastikan service Apache dan MySQL sudah dijalankan.
* Buka [PhpMyAdmin](http://localhost/phpmyadmin) dan buat database baru dengan nama "toko_komputer".
* Import toko_komputer.sql pada database "toko_komputer".

### Run Project
Jika semua step di atas telah dilakukan, jalankan perintah berikut untuk memulai project ini.

```
npm start
```
