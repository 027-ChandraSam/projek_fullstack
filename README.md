1. Fungsi Modul

Modul User Management digunakan oleh admin untuk mengelola data pengguna dalam sistem.

Fitur utama modul:

Melihat daftar user

Mengubah role user menjadi admin

Menghapus user

Menampilkan status loading saat request berlangsung

Menampilkan error jika request gagal

Modul ini terdiri dari:

Frontend (React)

Backend (Express.js)

Database (MySQL)

Struktur mengikuti konsep separation of concern:

UI component

service API

controller backend

route backend

database query

2. Alur Frontend → Backend → Database
Mengambil data user (GET)

Alur:

Users.jsx
   ↓
api.get("/users")
   ↓
Express Route
   ↓
Controller getUsers
   ↓
MySQL query
   ↓
Response JSON
   ↓
React state update


Contoh query database:

SELECT id, username, email, role FROM users;


Data dikirim dari backend dalam format JSON lalu disimpan ke state React menggunakan useState.

Update role user (PUT)

Alur:

Button klik
   ↓
updateUserRole()
   ↓
PUT /users/:id/role
   ↓
Controller updateUserRole
   ↓
UPDATE users SET role=?
   ↓
Response sukses
   ↓
fetchUsers()


Query database:

UPDATE users SET role=? WHERE id=?;

Hapus user (DELETE)

Alur:

Klik tombol hapus
   ↓
DELETE /users/:id
   ↓
Controller deleteUser
   ↓
DELETE FROM users
   ↓
Update state React


Query database:

DELETE FROM users WHERE id=?;


