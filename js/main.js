let ProductName = document.getElementById("ProductName");
let ProductPrice = document.getElementById("ProductPrice");
let ProductCategory = document.getElementById("ProductCategory");
let productDescription = document.getElementById("productDescription");
let productImage = document.getElementById("productImage");
let inputSearch = document.getElementById("search");
let addBtn = document.getElementById("addProduct");
let updateBtn = document.getElementById("updateProduct");
let currentIndex = 0;
let userArr = [];

if (localStorage.getItem("products") !== null) {
    userArr = JSON.parse(localStorage.getItem("products"));
    displayData();
}

function addProduct() {
    if (
        validationInputs(ProductName, "nameMsg") &&
        validationInputs(ProductPrice, "priceMsg") &&
        validationInputs(ProductCategory, "categoryMsg") &&
        validationInputs(productDescription, "descriptionMsg")
    ) {
        users = {
            ProductName: ProductName.value.trim(),
            ProductPrice: ProductPrice.value.trim(),
            ProductCategory: ProductCategory.value.trim(),
            productDescription: productDescription.value.trim(),
            productImage: productImage.files[0]
                ? `imgs/${productImage.files[0]?.name}`
                : `imgs/traveling-elements_3.jpg`,
        };
        userArr.push(users);
        console.log(userArr);
        localStorage.setItem("products", JSON.stringify(userArr));
        clearInputs();
        displayData();
    }
}

function clearInputs() {
    ProductName.value = '';
    ProductPrice.value = '';
    ProductCategory.value = '';
    productDescription.value = '';
    productImage.value = '';
}

function deleteProduct(index) {
    userArr.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(userArr));
    displayData();
}

function displayData() {
    let regex = new RegExp(inputSearch.value, 'gi');
    var cartona = "";
    for (let i = 0; i < userArr.length; i++) {
        if (
                userArr[i].ProductName.toLowerCase().includes(
            inputSearch.value.toLowerCase()
            )
        ) {
            cartona += `
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card text-start h-100">
                        <img class="card-img-top height="170px" src="${userArr[i].productImage}" alt="${userArr[i].ProductName}" />
                        <div class="card-body text-center">
                            <h4>productName: ${userArr[i].ProductName.replace(regex, (match)=> `<span class="bg-info">${match}</span>` )}</h4>
                            <p>Price: ${userArr[i].ProductPrice}</p>
                            <p>productCategory: ${userArr[i].ProductCategory}</p>
                            <p>productDescription: ${userArr[i].productDescription}</p>
                        </div>
                        <div class="btns text-center">
                            <button onclick="deleteProduct(${i})" class="btn border border-danger btn-sm"><i class="fa-solid fa-trash text-danger"></i></button>
                            <button onclick="updateInfotProduct(${i})" class="btn border border-warning btn-sm"><i class="fa-solid fa-pen-to-square text-warning"></i></button>
                        </div>
                    </div>
                        
                </div>
            `;
        }
    }
    document.getElementById("row").innerHTML = cartona;
}

function updateInfotProduct(index) {
    currentIndex = index;
    ProductName.value = userArr[index].ProductName;
    ProductPrice.value = userArr[index].ProductPrice;
    ProductCategory.value = userArr[index].ProductCategory;
    productDescription.value = userArr[index].productDescription;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}

function updateProduct() {
    users = {
        ProductName: ProductName.value.trim(),
        ProductPrice: ProductPrice.value.trim(),
        ProductCategory: ProductCategory.value.trim(),
        productDescription: productDescription.value.trim(),
        productImage: productImage.files[0]
        ? `imgs/${productImage.files[0]?.name}`
        : `imgs/traveling-elements_3.jpg`,
    };

    userArr.splice(currentIndex, 1, users);
    localStorage.setItem("products", JSON.stringify(userArr));
    displayData();

    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    clearInputs();
}
console.log("mino");

// function validationName() {
//     let regex = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/;
//     let text = ProductName.value;
//     let nameMsg = document.getElementById("nameMsg");
//     if (regex.test(text)) {
//         nameMsg.classList.add("d-none");
//         ProductName.classList.add("is-valid");
//         ProductName.classList.remove("is-invalid");
//         return true;
//     } else {
//         nameMsg.classList.remove("d-none");
//         ProductName.classList.add("is-invalid");

//         return false;
//     }
// }

// function validationPrice() {
//   let regex = /^\d+(\.\d{1,2})?$/;
//   let text = ProductPrice.value;
//   let priceMsg = document.getElementById("priceMsg");
//   if (regex.test(text)) {
//     priceMsg.classList.add("d-none");
//     ProductPrice.classList.add("is-valid");
//       ProductPrice.classList.remove("is-invalid");
//       return true;
//   } else {
//     priceMsg.classList.remove("d-none");
//       ProductPrice.classList.add("is-invalid");
//       return false;
//   }
// }

// function validationCategory() {
//   let regex = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/;
//   let text = ProductCategory.value;
//   let categoryMsg = document.getElementById("categoryMsg");
//   if (regex.test(text)) {
//     categoryMsg.classList.add("d-none");
//     ProductCategory.classList.add("is-valid");
//       ProductCategory.classList.remove("is-invalid");
//       return true;
//   } else {
//     categoryMsg.classList.remove("d-none");
//       ProductCategory.classList.add("is-invalid");
//       return false;
//   }
// }

// function validationDescription() {
//   let regex = /^[A-Za-z0-9\s.,!?'\-]{10,1000}$/;
//   let text = productDescription.value;
//   let descriptionMsg = document.getElementById("descriptionMsg");
//   if (regex.test(text)) {
//     descriptionMsg.classList.add("d-none");
//     productDescription.classList.add("is-valid");
//       productDescription.classList.remove("is-invalid");
//       return true;
//   } else {
//     descriptionMsg.classList.remove("d-none");
//       productDescription.classList.add("is-invalid");
//       return false;
//   }
// }


function validationInputs(element, Message) {
    let regex = {
        ProductName: /^[A-Za-z0-9\s.,!?'\-]{10,1000}$/,
        ProductPrice: /^\d+(\.\d{1,2})?$/,
        ProductCategory: /^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/,
        productDescription: /^[A-Za-z0-9\s.,!?'\-]{10,1000}$/,
    };
        
    let text = element.value;
    let Msg = document.getElementById(Message);
    if (regex[element.id].test(text)) {
        Msg.classList.add("d-none");
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    } else {
        Msg.classList.remove("d-none");
        element.classList.add("is-invalid");
        return false;
    }
}


