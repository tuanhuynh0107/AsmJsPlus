import { getCartProducts } from "../header/index.js";
import { formatCurrency } from "../common/index.js";


getCartProducts();
renderViewCart();

function renderViewCart() {
    const existingProductsJSON = sessionStorage.getItem('cartProducts');
    let htmls = "";
    let htmlCartInfo = "";
    const showCartPreview = $('.cart-info__list');
    const cartInfo = $('.cart-info');
    const TotalItem = $('.subTotalItem');
    const priceAllItems = $('.totalAllItems');
    const priceShip = $('.priceShip');
    const Etotal = $('.Etotal');
    let subTotalItem;
    if (existingProductsJSON === null || JSON.parse(existingProductsJSON).length === 0) {
        htmls += `<p class="tb">Không có sản phẩm</p>`;
    } else {
        let total = 0;
        let totalAll = 0;
        let ship = 10000;
        const cartArray = JSON.parse(existingProductsJSON);
        subTotalItem = cartArray.length;
        cartArray.forEach(function(cart, index) {
            total = cart.qty * cart.price;
            totalAll += total;
            htmls += `
            <article class="cart-item" data-masp="${cart.masp}">
                <a href="./product-detail.html">
                    <img src="./assets/img/product/${cart.image}" alt="" class="cart-item__thumb" />
                </a>
                <div class="cart-item__content">
                    <div class="cart-item__content-left">
                        <h3 class="cart-item__title">
                            <a href="./product-detail.html">
                            ${cart.name}
                            </a>
                        </h3>
                        <p class="cart-item__price-wrap">
                            ${formatCurrency(cart.price)} | <span class="cart-item__status">In Stock</span>
                        </p>
                        <div class="cart-item__ctrl cart-item__ctrl--md-block">
                            <div class="cart-item__input">
                            ${cart.catagori}
                                <img class="icon" src="./assets/icons/arrow-down-2.svg" alt="" />
                            </div>
                            <button class="cart-item__input-btn" id="giam" data-masp="${cart.masp}">
                                <img class="icon" src="./assets/icons/minus.svg" alt="" />
                            </button>
                            <span class="qtyCart">${cart.qty}</span>
                            <button class="cart-item__input-btn" id="tang" data-masp="${cart.masp}">
                                <img class="icon" src="./assets/icons/plus.svg" alt="" />
                            </button>

                        </div>
                    </div>
                    <div class="cart-item__content-right">
                        <p class="cart-item__total-price total-price">${formatCurrency(total)}</p>
                        <div class="cart-item__ctrl">
                            <button class="cart-item__ctrl-btn">
                                <img src="./assets/icons/heart-2.svg" alt="" />
                                Save
                            </button>
                            <button class="cart-item__ctrl-btn js-toggle"
                                toggle-target="#delete-confirm" data-masp="${cart.masp}">
                                <img src="./assets/icons/trash.svg" alt="" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </article>
            `;
        });

        if(cartArray.length > 0) {
            htmlCartInfo += `
            <div class="cart-info__bottom d-md-none">
                <div class="row">
                    <div class="col-8 col-xxl-7">
                        <div class="cart-info__continue">
                            <a href="./" class="cart-info__continue-link">
                                <img class="cart-info__continue-icon icon"
                                    src="./assets/icons/arrow-down-2.svg" alt="" />
                                Continue Shopping
                            </a>
                        </div>
                    </div>
                    <div class="col-4 col-xxl-5">
                        <div class="cart-info__row">
                            <span>Subtotal:</span>
                            <span>${formatCurrency(totalAll)}</span>
                        </div>
                        <div class="cart-info__row">
                            <span>Shipping:</span>
                            <span>10.00đ</span>
                        </div>
                        <div class="cart-info__separate"></div>
                        <div class="cart-info__row cart-info__row--bold">
                            <span>Total:</span>
                            <span>${formatCurrency(totalAll + ship)}</span>
                        </div>
                    </div>
                </div>
            </div>`;
        }   
        priceAllItems.innerHTML = formatCurrency(totalAll);      
        priceShip.innerHTML = formatCurrency(ship);      
        Etotal.innerHTML = formatCurrency(totalAll + ship);
            
    }

    TotalItem.innerText= subTotalItem;
    showCartPreview.innerHTML = htmls;
    cartInfo.innerHTML += htmlCartInfo;
}

function handleDecreaseButtonClick(btn) {
    const cartItem = btn.closest('.cart-item');
    const masp = cartItem.getAttribute('data-masp');
    const qtyElement = cartItem.querySelector('.qtyCart');
    let qty = parseInt(qtyElement.innerText);

    if (qty > 1) {
        qty--;
        qtyElement.innerText = qty;
        updateCartItemTotal(cartItem, qty);
        updateSessionStorageQty(masp, qty);

        setTimeout(function() {
            location.reload();
        }, 1500);
    }

   
}

// Hàm xử lý sự kiện khi nút tăng được nhấp
function handleIncreaseButtonClick(btn) {
    const cartItem = btn.closest('.cart-item');
    const masp = cartItem.getAttribute('data-masp');
    const qtyElement = cartItem.querySelector('.qtyCart');
    let qty = parseInt(qtyElement.innerText);

    qty++;
    qtyElement.innerText = qty;
    updateSessionStorageQty(masp, qty);
    updateCartItemTotal(cartItem, qty);
    setTimeout(function() {
        location.reload();
    }, 1500);
  
}

const decreaseButtons = document.querySelectorAll('#giam');
decreaseButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        handleDecreaseButtonClick(this);
       
    });
});

// Gắn sự kiện click cho nút tăng
const increaseButtons = document.querySelectorAll('#tang');
increaseButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        handleIncreaseButtonClick(this);
    
    });
});

function updateCartItemTotal(cartItem, qty) {
    const priceElement = cartItem.querySelector('.mainTienTe');
    const mainTienTe = cartItem.querySelector('.total-price .mainTienTe')
    const priceString = priceElement.innerText; // Lấy giá từ chuỗi và loại bỏ kí tự không mong muốn
    const price = parseFloat(priceString);
    const qtyNew = parseFloat(qty);
    const newTotal = qtyNew * price;
    
    // console.log(newTotal);
    
 
}


function updateSessionStorageQty(masp, newQty) {
    const existingProductsJSON = sessionStorage.getItem('cartProducts');
    
    if (existingProductsJSON) {

        const cartArray = JSON.parse(existingProductsJSON);


        const updatedCartArray = cartArray.map(product => {
            if (product.masp === masp) {
                product.qty = newQty;
            }
            return product;
        });

        // Lưu mảng đã cập nhật trở lại vào sessionStorage
        sessionStorage.setItem('cartProducts', JSON.stringify(updatedCartArray));
    }
    

}


function updateTotal() {
    const existingProductsJSON = sessionStorage.getItem('cartProducts');
    const cartArray = JSON.parse(existingProductsJSON);

    let totalAll = 0;
    let ship = 10000;

    cartArray.forEach(function(cart) {
        const cartItem = document.querySelector(`[data-masp="${cart.masp}"]`);
        const qtyElement = cartItem.querySelector('.qtyCart');
        const priceElement = cartItem.querySelector('.total-price .mainTienTe');

        const qty = parseInt(qtyElement.innerText);
        const price = parseFloat(priceElement.innerText);
        console.log(qty,price);
        const newTotal = qty * price;
        priceElement.innerHTML = formatCurrency(newTotal);
        totalAll += newTotal;
    });

    // Cập nhật tổng giá trị và hiển thị
    const priceAllItems = $('.totalAllItems');
    const priceShip = $('.priceShip');
    const Etotal = $('.Etotal');

    priceAllItems.innerHTML = formatCurrency(totalAll);
    priceShip.innerHTML = formatCurrency(ship);
    Etotal.innerHTML = formatCurrency(totalAll + ship);
}

// Thêm sự kiện click cho nút xóa
const deleteButtons = document.querySelectorAll('.js-toggle');
deleteButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        handleDeleteButtonClick(this);
    });
});

// Hàm xử lý sự kiện khi nút xóa được nhấp
function handleDeleteButtonClick(btn) {
    const masp = btn.getAttribute('data-masp');
    
    // Xóa sản phẩm khỏi sessionStorage
    removeFromSessionStorage(masp);
    
    // Cập nhật lại view giỏ hàng
    setTimeout(function() {
        location.reload();
    }, 500);
}

function removeFromSessionStorage(masp) {
    const existingProductsJSON = sessionStorage.getItem('cartProducts');

    if (existingProductsJSON) {
        const cartArray = JSON.parse(existingProductsJSON);
        const updatedCartArray = cartArray.filter(product => product.masp !== masp);

        // Lưu mảng đã cập nhật trở lại vào sessionStorage
        sessionStorage.setItem('cartProducts', JSON.stringify(updatedCartArray));
    }
}
