// Time module

// Update Jakarta time in footer
export function updateJakartaTime() {
    const jakartaTimeElement = document.getElementById('jakarta-time');
    
    if (jakartaTimeElement) {
        // Function to update time
        function updateTime() {
            const options = {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            
            const jakartaTime = new Date().toLocaleTimeString('en-US', options);
            jakartaTimeElement.textContent = jakartaTime;
        }
        
        // Update immediately and then every second
        updateTime();
        setInterval(updateTime, 1000);
    }
}