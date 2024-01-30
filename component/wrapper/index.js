import getData , {renderUi} from "../common/index.js";

// Hàm chạy bất đồng bộ để lấy dữ liệu
 
getData()
    .then((data) => {
        renderUi(data, 'listPro');
    })
    .catch((error) => {
        console.error(error);
    });


