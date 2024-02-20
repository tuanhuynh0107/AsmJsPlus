
import { formatCurrency } from "../../common/index.js";
var callApi = "http://localhost:3000/catagori";

function getCourses(callApi,callback) {
    fetch(callApi)
        .then((response) => {
            return response.json();
        })
        .then(callback);
}

getCourses(callApi,function(product){
        console.log(product);
    } 
)

getCourses(callApi,renderItem)
function renderItem(catagoris) {
    var listCourseBlock = document.querySelector('.table__item');
    var htmls = catagoris.map((catagori) => {
        return `<tr class="catagori-id-${catagori.id}" >
                    <td>
                        <a href="" class="item-Product">
                            <span>${catagori.name} | </span>
                            <img src="./assets/img/product/${catagori.image}" alt="" class="img__product">
                        </a>
                    </td>
                    
                    <td>
                        <button class="hendel-update-act" data-id="${catagori.id}">Sửa</button>|
                        <button class="delete-button" data-id="${catagori.id}">Delete</button>
                    </td>
                </tr>`;
    });
    listCourseBlock.innerHTML = htmls.join('');
}
