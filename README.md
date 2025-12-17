# Modern Portfolio Website

## Overview
This is a modern, responsive portfolio website with a dark theme. It features smooth animations, interactive elements, and a clean design to showcase your work effectively.

## Features
- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Dark Theme**: Modern dark color scheme with accent colors
- **Interactive Elements**: Custom cursor, hover effects, and animations
- **Portfolio Categories**: Filter work by Articles, Websites, Analysis, and Design
- **Animated Transitions**: Smooth transitions between sections
- **Typing Animation**: Dynamic text animation on the homepage
- **Moving Emoji**: Interactive waving hand emoji
- **Contact Form**: Functional contact form (requires backend implementation for actual submission)
- **Social Media Integration**: Links to your social media profiles

## Technologies Used
- HTML5
- CSS3 (with custom animations and transitions)
- JavaScript (vanilla, no frameworks)
- SVG graphics for illustrations

## Structure
- `index.html` - Main HTML file
- `styles.css` - All styling and animations
- `script.js` - JavaScript functionality
- `assets/` - Contains all images and resources

## Customization
To personalize this portfolio:

1. Replace "Your Name" with your actual name throughout the HTML
2. Update the self-introduction and about sections
3. Replace portfolio items with your actual work
4. Update social media links with your profiles
5. Replace contact information with your details
6. Customize colors in the CSS variables if desired

## Menambahkan Portofolio Baru

Untuk menambahkan portofolio baru ke website Anda, ikuti langkah-langkah berikut:

### 1. Tambahkan Gambar Portofolio

1. Siapkan gambar untuk portofolio baru Anda (sebaiknya dalam format SVG untuk konsistensi)
2. Simpan gambar tersebut di folder `assets/images/portfolio/`

### 2. Tambahkan Item Portofolio di HTML

Buka file `index.html` dan cari bagian `<div class="work-grid" id="work-grid">`. Di dalam div ini, tambahkan kode untuk item portofolio baru Anda sesuai dengan kategorinya (article, website, analysis, atau design).

Contoh untuk menambahkan portofolio website baru:

```html
<!-- Item Website Baru -->
<div class="work-item website">
    <div class="work-img">
        <img src="assets/images/portfolio/website3.svg" alt="Website 3">
    </div>
    <div class="work-info">
        <h3>Nama Proyek Anda</h3>
        <p>Deskripsi singkat tentang proyek website baru Anda.</p>
        <a href="#" class="read-more">View Project</a>
    </div>
</div>
```

### 3. Menambahkan Kategori Baru (Opsional)

Jika Anda ingin menambahkan kategori baru:

1. Tambahkan tombol filter baru di bagian `work-filter`:

```html
<button class="filter-btn" data-filter="kategori-baru">Kategori Baru</button>
```

2. Tambahkan item dengan kelas kategori baru:

```html
<div class="work-item kategori-baru">
    <!-- Konten item -->
</div>
```

### 4. Uji Tampilan

Setelah menambahkan item portofolio baru:

1. Refresh halaman website Anda
2. Periksa apakah item baru muncul di bagian Work
3. Uji filter untuk memastikan item baru muncul di kategori yang benar
4. Periksa tampilan di berbagai ukuran layar untuk memastikan responsivitas

## Running Locally
Simply open the `index.html` file in a web browser, or use a local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## License
Feel free to use this template for your personal portfolio.

---

Created with ❤️ for showcasing your amazing work!