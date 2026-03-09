
document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.querySelector('.nav-container');
    const content = document.getElementById('menu-content');

    // 1. 渲染导航与分类
    menuData.categories.forEach(cat => {
        const link = document.createElement('a');
        link.href = `#${cat.id}`;
        link.textContent = cat.name;
        navContainer.appendChild(link);

        const section = document.createElement('section');
        section.id = cat.id;
        section.innerHTML = `<h2 class="category-title">${cat.name} <small style="color:#ccc; font-weight:normal;">${cat.enName}</small></h2><div class="menu-grid" id="grid-${cat.id}"></div>`;
        content.appendChild(section);
    });

    // 2. 填充菜品
    menuData.items.forEach(item => {
        const grid = document.getElementById(`grid-${item.categoryId}`);
        if (grid) {
            grid.innerHTML += `
                <div class="menu-card">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="info">
                        <div><div class="name">${item.name}<br> ${item.enName}</div>
                        <div class="desc">${item.desc1}<br>${item.desc2}</div></div>
                        <div class="price">¥${item.price1} ${item.size1} ${item.price2} ${item.size2}</div>
                    </div>
                </div>`;
        }
    });

    // 3. 动态更新营业状态
    const updateStatus = () => {
        const hour = new Date().getHours();
        const statusTag = document.querySelector('.status-tag');
        if (hour >= 10 && hour < 22) {
            statusTag.textContent = "● Open";
            statusTag.style.background = "#27ae60";
        } else {
            statusTag.textContent = "○ Closed";
            statusTag.style.background = "#95a5a6";
        }
    };
    updateStatus();
});

// 滚动监听：改变导航栏透明度
window.onscroll = () => {
    const nav = document.querySelector('nav');
    nav.style.background = window.pageYOffset > 150 ? "rgba(44, 62, 80, 0.95)" : "rgba(0, 0, 0, 0.3)";
};


// 获取回到顶部按钮
const backToTopBtn = document.getElementById('back-to-top');

// 监听滚动事件
window.addEventListener('scroll', () => {
    // 1. 原有的导航栏变色逻辑（保留）
    const nav = document.querySelector('nav');
    if (window.pageYOffset > 150) {
        nav.style.background = "rgba(44, 62, 80, 0.95)";
    } else {
        nav.style.background = "rgba(0, 0, 0, 0.3)";
    }

    // 2. 回到顶部按钮显示/隐藏逻辑
    // 当滚动超过 400 像素时显示按钮
    if (window.pageYOffset > 400) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// 点击按钮平滑回到顶部
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滚动
    });
});