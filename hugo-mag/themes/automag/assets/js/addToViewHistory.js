function addToViewHistory(url, product_title, imageUrl) {
    let viewedItems = JSON.parse(localStorage.getItem('viewedItems')) || [];
                        
    const existingIndex = viewedItems.findIndex(item => item.url === url);
                
    if (existingIndex === -1) {
        viewedItems.push({
            url,
            product_title,
            imageUrl
        });
    }   

    while (viewedItems.length > 7) {
        viewedItems.shift(); 
    }   
        
    localStorage.setItem('viewedItems', JSON.stringify(viewedItems));
} 
