// Work filter module
import { loadPortfolioData, renderPortfolioItems } from './portfolioData.js';

// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
let workItems = [];
let portfolioData = [];

// Work filter and pagination functionality
export async function initWorkFilter() {
    const workGrid = document.getElementById('work-grid');
    const paginationContainer = document.getElementById('work-pagination');
    
    if (!filterBtns.length || !workGrid || !paginationContainer) return;
    
    // Load portfolio data from JSON
    portfolioData = await loadPortfolioData();
    
    // Render all items initially
    renderPortfolioItems(portfolioData);
    
    // Get updated work items after rendering
    workItems = document.querySelectorAll('.work-item');
    
    const itemsPerPage = 6; // Show 6 items per page (2 rows of 3 items)
    let currentPage = 1;
    let currentFilter = 'all';
    let filteredItems = [];
    
    // Filter work items based on category
    function filterItems(filterValue) {
        currentFilter = filterValue;
        currentPage = 1; // Reset to first page when filter changes
        
        // Filter items from the data source
        const filteredData = filterValue === 'all' 
            ? portfolioData 
            : portfolioData.filter(item => item.category === filterValue);
            
        // Render filtered items
        renderPortfolioItems(filteredData);
        
        // Update work items reference after rendering
        workItems = document.querySelectorAll('.work-item');
        filteredItems = Array.from(workItems);
        
        updatePagination();
        displayItems();
    }
    
    // Update pagination buttons
    function updatePagination() {
        const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
        paginationContainer.innerHTML = '';
        
        // Only show pagination if we have more than one page
        if (pageCount <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }
        
        paginationContainer.style.display = 'flex';
        
        // Add previous button
        if (pageCount > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.classList.add('pagination-btn');
            prevBtn.innerHTML = '&lt;';
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayItems();
                    updateActivePaginationBtn();
                }
            });
            paginationContainer.appendChild(prevBtn);
        }
        
        // Add page buttons
        for (let i = 1; i <= pageCount; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.classList.add('pagination-btn');
            if (i === currentPage) pageBtn.classList.add('active');
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                displayItems();
                updateActivePaginationBtn();
            });
            paginationContainer.appendChild(pageBtn);
        }
        
        // Add next button
        if (pageCount > 1) {
            const nextBtn = document.createElement('button');
            nextBtn.classList.add('pagination-btn');
            nextBtn.innerHTML = '&gt;';
            nextBtn.addEventListener('click', () => {
                if (currentPage < pageCount) {
                    currentPage++;
                    displayItems();
                    updateActivePaginationBtn();
                }
            });
            paginationContainer.appendChild(nextBtn);
        }
    }
    
    // Update active pagination button
    function updateActivePaginationBtn() {
        const paginationBtns = document.querySelectorAll('.pagination-btn');
        paginationBtns.forEach((btn, index) => {
            // Skip first and last buttons (prev/next)
            if (index === 0 || index === paginationBtns.length - 1) return;
            
            if (index === currentPage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Display items for current page
    function displayItems() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToShow = filteredItems.slice(startIndex, endIndex);
        
        // Hide all items first
        workItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        });
        
        // Show filtered items for current page
        setTimeout(() => {
            itemsToShow.forEach((item, index) => {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50 * index); // Staggered animation
            });
        }, 350);
    }
    
    // Add event listeners to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            filterItems(filterValue);
        });
    });
    
    // Set initial filter
    filterItems('all');
    filterBtns[0].classList.add('active');
}