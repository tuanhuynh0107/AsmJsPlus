import { formatCurrency } from "../../common/index.js";

var callApi = "http://localhost:3000/proDuctNew";

function getCourses(callApi,callback) {
    fetch(callApi)
        .then((response) => {
            return response.json();
        })
        .then(callback);
}


function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE'        
    };

    fetch(callApi + '/' + id, options)
        .then((response) => {
            return response.json(); // Thêm return ở đây
        })
        .then(function() {
            var courseItem = document.querySelector('.course-id-' + id);
            if(courseItem) {
                courseItem.remove();
            }
        });
}
export function handleUpdateCourse(data, callback) {
    var options = {
        method: 'PUT',
        body: JSON.stringify(data)
    }
    fetch(callApi + '/' + data.id, options)
        .then((response) => {
            return response.json();
        })
        .then(callback);
}
export function handleCreateCourse(data, callback) {
    var options = {
        method: 'POST',
        body: JSON.stringify(data)
    }
    fetch(callApi, options)
        .then((response) => {
            response.json();
        })
        .then(callback);
}
function renderItem(products) {
    var listCourseBlock = document.querySelector('.table__item');
    var htmls = products.map((product) => {
        return `<tr class="course-id-${product.id}">
                    <td colspan="3">
                        <a href="" class="item-Product">
                            <span>${product.name} | ${product.masp}</span>
                            <img src="./assets/img/product/${product.image}" alt="" class="img__product">
                        </a>
                    </td>
                    <td>${formatCurrency(product.price)}</td>
                    <td>${product.catagori}</td>
                    <td>Còn hàng <span></span></td>
                    <td colspan="4">
                        <button class="hendel-update-act" data-id="${product.id}">Sửa</button>|
                        <button class="delete-button" data-id="${product.id}">Delete</button>
                    </td>
                </tr>`;
    });
    listCourseBlock.innerHTML = htmls.join('');
}



function togleButton() {
    const itemUpdate = $('.form__updata--product');
    const itemXmask = $('.btnNone');
    itemXmask.addEventListener('click', function() {
        itemUpdate.style.display = "none"; 
    })
    itemUpdate.style.display = "block"; 
}
function handelUpdataProduct(product) {
    const iid = $('#id');
    const iName = $('#name');
    const iPrice = $('#price');
    const iCata = $('#catagori');
    const iImage = $('#image');
    const iMasp = $('#masp');
    iMasp.value= product.masp;
    iName.value= product.name;
    iPrice.value = product.price;
    iCata.value = product.catagori;
    iid.value = product.id;
    iImage.value = product.image;
}


function sleep(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

sleep(100)
    .then(function() {
        getCourses(callApi,renderItem);
        return sleep(1000);
    })
    .then(function() {
        handleProductAdmin();
    })



function handleProductAdmin() {
    document.querySelectorAll('button.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            handleDeleteCourse(this.dataset.id);
        });
    });
    document.querySelector('button.revenue__top--add').addEventListener('click', function() {
            const itemAdd = $('.form__updata--product');
            const btnAdd = $('.form-submit');
            const itemXmask = $('.btnNone');
            itemAdd.style.display = "block";
            itemXmask.addEventListener('click', function() {
                btnAdd.innerText = "Thêm";
                itemAdd.style.display = "none"; 

            })
    });
    document.querySelectorAll('button.hendel-update-act').forEach(button => {
        button.addEventListener('click', function() {
            var product = "http://localhost:3000/proDuctNew/" + this.dataset.id;
            function getProduct(callback) {
                fetch(product)
                    .then((response) => {
                        return response.json();
                    })
                    .then(callback);
            }
            
            function updataProduct(product) {
                togleButton();
                handelUpdataProduct(product);
                
            }
            getProduct(updataProduct);
        });
    });
}


