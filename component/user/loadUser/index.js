
function handelRenderUserInfoShipping(userUI,addressUI) {
    // getItem
    const itemSessionStorage = getItemSessionStorage();
    // getComponent
    const consigneeName = $(userUI);
    const consigneeAddress = $(addressUI);

   if(itemSessionStorage) {
        const itemSessionPase = JSON.parse(itemSessionStorage);
        console.log(itemSessionPase);
        consigneeName.innerText = itemSessionPase.name;
        consigneeAddress.innerText = itemSessionPase.address;
   }

}

function  getItemSessionStorage() {
    return sessionStorage.getItem('loggedInUser');
  
}