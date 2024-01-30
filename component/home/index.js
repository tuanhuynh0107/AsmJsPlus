import { layGiaTriThamSo,formatCurrency } from "../common/index.js";
import { getCartProducts } from "../header/index.js";

const newUrl = layGiaTriThamSo('masp');
 
function getItemProduct(newUrl) {
    
    if (newUrl) {
        // Gửi yêu cầu GET đến đường dẫn "http://localhost:3000/proDuctNew?masp=..."
        fetch(`http://localhost:3000/proDuctNew?masp=${newUrl}`)
        .then(response => response.json())
        .then(data => {
            // Kiểm tra xem có sản phẩm nào không
            if (data.length > 0) {
            // Lấy thông tin của sản phẩm
            const product = data[0];
            showItemInHome(product);
            addToCart(product);
            // In thông tin của sản phẩm ra console
            console.log("Thông tin sản phẩm:", product);
            } else {
            console.log("Không có sản phẩm nào với mã sản phẩm là", maspParam);
            }
        })
        .catch(error => {
            console.error("Lỗi khi lấy dữ liệu:", error);
        });
    } else {
        console.log("Không có tham số masp trong URL.");
    }
}

function showItemInHome(product) {
    const proImg= $('.prod-preview__img');
    const proHeanding = $('.prod-info__heading');
    const proPrice = $('.price');
    const proCata = $('.breadcrumbs__link--current');
    proImg.src = product.image;
    proHeanding.innerText = product.name;
    proCata.innerText = product.catagori;
    proPrice.innerHTML = formatCurrency(product.price);
}

let addToCart = function(product) {
    const btnAddCart = $('.prod-info__add-to-cart'); // hoặc $('.prod-info__add-to-cart').get(0);
    let newProduct = {
        masp: product.masp,
        name: product.name,
        catagori: product.catagori,
        image: product.image,
        price: product.price,
        qty: 1
    }

    btnAddCart.addEventListener('click', function(event) {
        event.preventDefault();
        console.log("Thành công");
        
        // Lấy danh sách sản phẩm từ sessionStorage (nếu có)
        const existingProductsJSON = sessionStorage.getItem('cartProducts');
        
        // Nếu chưa tồn tại, tạo một mảng rỗng
        const existingProducts = existingProductsJSON ? JSON.parse(existingProductsJSON) : [];
        
        // Tìm sản phẩm trong danh sách đã có
        const existingProductIndex = existingProducts.findIndex(item => item.masp === newProduct.masp);

        // Nếu sản phẩm đã có, tăng số lượng
        if (existingProductIndex !== -1) {
            existingProducts[existingProductIndex].qty++;
        } else {
            // Nếu sản phẩm chưa có, thêm vào danh sách
            existingProducts.push(newProduct);
        }

        // Lưu lại danh sách sản phẩm vào sessionStorage
        sessionStorage.setItem('cartProducts', JSON.stringify(existingProducts));
        getCartProducts();
    });
}


getCartProducts();
function start() {
    getItemProduct(newUrl);
}


start();