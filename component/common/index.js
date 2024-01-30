export default async function getData(item = "") {
    let globalData;
    try {
        const response = await fetch("http://localhost:3000/proDuctNew/" + item);
        const data = await response.json();
        
        globalData = data;
        // console.log(globalData);
        return data; // Trả về dữ liệu để sử dụng trong khối .then tiếp theo
    } catch (error) {
        console.log(error); // Ném lỗi để bắt trong khối .catch tiếp theo
    }
}

export function renderUi(data, item) {
    const items = $('.' + item); // Sử dụng document.querySelector thay vì $
    let htmls = "";
    data.reverse();
    data.forEach(function(e) {
        htmls += `
            <div class="col">
                <article class="product-card">
                    <div class="product-card__img-wrap">
                        <a href="product-detail.html?masp=${e.masp}">
                            <img src="${e.image}" alt="" class="product-card__thumb" />
                        </a>
                        <button class="like-btn product-card__like-btn">
                            <img src="./assets/icons/heart.svg" alt="" class="like-btn__icon icon" />
                            <img src="./assets/icons/heart-red.svg" alt="" class="like-btn__icon--liked" />
                        </button>
                    </div>
                    <h3 class="product-card__title">
                        <a href="./product-detail.html">${e.name}</a>
                    </h3>
                    <p class="product-card__brand">${e.catagori}Ư</p>
                    <div class="product-card__row">
                        <span class="product-card__price">${formatCurrency(e.price)}</span>
                        <img src="./assets/icons/star.svg" alt="" class="product-card__star" />
                        <span class="product-card__score">${e.start}</span>
                    </div>
                </article>
            </div>`;
    });
    items.innerHTML += htmls;
}

export function layGiaTriThamSo(params) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(params);

}

export function formatCurrency(amount) {
    
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const result = `<span class="tiente">đ</span><span class="mainTienTe">${formattedAmount}</span>`;

    return result;
}

