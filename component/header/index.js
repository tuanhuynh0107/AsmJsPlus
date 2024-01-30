import { formatCurrency } from "../common/index.js";
export function getCartProducts() {
    const existingProductsJSON = sessionStorage.getItem('cartProducts');
    const showCartPreview = $('.showCart');
    const totalView = $$('.totalView');
    const shipView = $$('.shipView');
    const priceAll = $$('.totalViewPrice')
    let lenghCarts = $$('.lenghCarts');
    let htmls = "";
    let total = 0;
    let totalAll = 0;
    let ship = 10000;
    if (existingProductsJSON === null || JSON.parse(existingProductsJSON).length === 0) {
        htmls += `<p class="tb">Không có sản phẩm</p>`;
    } else {
        
        const cartArray = JSON.parse(existingProductsJSON);
        
        cartArray.forEach(function(cart, index) {
            total += cart.price * cart.qty;
            totalAll += total;
            htmls += `
            <div class="col">
                <article class="cart-preview-item">
                    <div class="cart-preview-item__img-wrap">
                        <img
                            src="${cart.image}"
                            alt=""
                            class="cart-preview-item__thumb"
                        />
                    </div>
                    <h3 class="cart-preview-item__title">${cart.name}</h3>
                    <p class="cart-preview-item__price">${cart.price}</p>
                </article>
            </div>
            `;
        });
        totalView.forEach((e) => {
            e.innerHTML = formatCurrency(total);
        })
        lenghCarts.forEach((e) => {
            e.textContent = cartArray.length;
        })
        shipView.forEach((e) => {
            e.innerHTML = formatCurrency(ship);
        })
        priceAll.forEach((e) => {
            e.innerHTML = formatCurrency(totalAll + ship);
        })


    }

    showCartPreview.innerHTML = htmls;
}


function handleLogout() {
    const btnLogout = $('.logout');
    btnLogout.addEventListener('click', function() {
        sessionStorage.removeItem('loggedInUser');

    // Chuyển hướng đến trang đăng nhập hoặc trang khác
        window.location.href = "index.html";
    })
} 
function start() {
    getCartProducts();
    handleLogout();
}

start();