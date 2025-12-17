// Portfolio Data Module
import { openImagePopup, initImagePopup } from './imagePopup.js';

export async function loadPortfolioData() {
    try {
        const response = await fetch('/js/data/portfolio.json');
        if (!response.ok) {
            throw new Error('Failed to load portfolio data');
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        return [];
    }
}

// Fungsi untuk mendapatkan gambar dari item portofolio
function getItemImage(item) {
    // Jika item memiliki gambar, gunakan gambar tersebut
    if (item.image && item.image.trim() !== '') {
        return item.image;
    }
    
    // Jika tidak ada gambar tapi ada link website, gunakan Screenshot Machine API
    if (item.link && item.link.trim() !== '') {
        // API key untuk Screenshot Machine
        const apiKey = 'dfffbf';
        
        // Parameter untuk Screenshot Machine API
        const dimension = '800x600'; // Ukuran screenshot
        const format = 'jpg';        // Format gambar
        const cacheLimit = '14';     // Cache selama 14 hari
        const delay = '200';         // Delay 200ms sebelum screenshot
        
        // Buat URL untuk Screenshot Machine API
        return `https://api.screenshotmachine.com?key=${apiKey}&url=${encodeURIComponent(item.link)}&dimension=${dimension}&format=${format}&cache_limit=${cacheLimit}&delay=${delay}`;
    }
    
    // Jika tidak ada gambar dan tidak ada link, gunakan gambar placeholder
    return '/assets/images/portfolio/placeholder.jpg';
}

export function renderPortfolioItems(items) {
    const workGrid = document.getElementById('work-grid');
    if (!workGrid) return;
    
    // Initialize image popup
    initImagePopup();
    
    // Clear existing items
    workGrid.innerHTML = '';
    
    // Render each item
    items.forEach(item => {
        const workItem = document.createElement('div');
        workItem.className = `work-item ${item.category}`;
        
        // Dapatkan gambar yang sesuai
        const imageUrl = getItemImage(item);
        
        // Tentukan apakah item memiliki link atau tidak
        const hasLink = item.link && item.link.trim() !== '' && item.link !== '#';
        
        // Buat konten HTML
        let contentHTML = `
            <div class="work-img">
                <img src="${imageUrl}" alt="${item.title}" loading="lazy">
            </div>
            <div class="work-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
        `;
        
        // Tambahkan link atau tombol view detail sesuai kondisi
        if (hasLink) {
            contentHTML += `<a href="${item.link}" class="read-more" target="_blank">View Details</a>`;
        } else {
            contentHTML += `<a href="javascript:void(0)" class="read-more view-image">View Image</a>`;
        }
        
        contentHTML += `</div>`;
        workItem.innerHTML = contentHTML;
        
        // Tambahkan event listener untuk tombol view image
        if (!hasLink) {
            const viewButton = workItem.querySelector('.view-image');
            if (viewButton) {
                viewButton.addEventListener('click', () => {
                    openImagePopup(imageUrl, item.title, item.description);
                });
            }
            
            // Tambahkan event listener untuk gambar
            const image = workItem.querySelector('.work-img img');
            if (image) {
                image.addEventListener('click', () => {
                    openImagePopup(imageUrl, item.title, item.description);
                });
                image.style.cursor = 'pointer'; // Ubah cursor menjadi pointer
            }
        }
        
        workGrid.appendChild(workItem);
    });
}