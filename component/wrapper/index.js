import getData , {renderUi,renderUiCatagori} from "../common/index.js";

// Hàm chạy bất đồng bộ để lấy dữ liệu
 
getData("proDuctNew")
    .then((data) => {
        renderUi(data, 'listPro');
    })
    .catch((error) => {
        console.error(error);
    });

getData("catagori")
    .then((data) => {
        renderUiCatagori(data,"listCatagori");
    })
    .catch((error) => {
        console.error(error);
    });
