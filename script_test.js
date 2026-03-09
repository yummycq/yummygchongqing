document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('category-nav');
    const menuContent = document.getElementById('menu-content');

    // 1. 渲染导航栏 (中上英下)
    menuData.categories.forEach(cat => {
        const link = document.createElement('a');
        link.href = `#${cat.id}`;
        link.innerHTML = `
            <span class="nav-cn">${cat.name}</span>
            <span class="nav-en">${cat.enName || cat.id.toUpperCase()}</span>
        `;
        navContainer.appendChild(link);

        // 2. 创建分类 Section
        const section = document.createElement('section');
        section.id = cat.id;
        
        // 3. 过滤出属于当前分类的 items
        const categoryItems = menuData.items.filter(item => item.categoryId === cat.id);
        
        let itemsHtml = '';
        categoryItems.forEach(item => {
            // 顺序：中文 -> 英文 -> 描述 -> 价格
            itemsHtml += `
                <div class="menu-card">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <div class="info">
                        <div class="info-top-stack">
                            <div class="name">${item.name}</div>
                            <div class="en-name">${item.enName || ''}</div>
                            <div class="desc">${item.desc1}${item.desc2}</div>
                        </div>
                        <div class="price">¥${item.price1}${item.size1}${item.price2}${item.size2}</div>
                    </div>
                </div>
            `;
        });

        section.innerHTML = `
            <h2 class="category-title">${cat.name} <small style="color:#ccc; font-weight:normal;">${cat.enName}</small></h2>
            <div class="menu-grid">${itemsHtml}</div>
        `;
        menuContent.appendChild(section);
    });

    // 回到顶部按钮逻辑
    setupBackToTop();
});

function setupBackToTop() {
    const btn = document.getElementById('back-to-top');
    window.onscroll = () => btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}