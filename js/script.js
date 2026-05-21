/* =========================
GIỎ HÀNG
========================= */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
THÊM GIỎ HÀNG
========================= */

function addToCart(name, price, image){

    /* đổi giá thành số */

    if(typeof price === "string"){

        price = price.replaceAll(".", "");

        price = price.replace("đ", "");

        price = Number(price);
    }

    /* kiểm tra sản phẩm tồn tại */

    let found =
    cart.find(item => item.name === name);

    if(found){

        found.quantity++;

    }else{

        cart.push({

            name: name,

            price: price,

            image: image,

            quantity: 1

        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();

    if(typeof showCart === "function"){
        showCart();
    }
    /* thông báo */

let message =
document.createElement("div");

message.innerText =
"Đã thêm vào giỏ hàng";

message.style.position = "fixed";

message.style.top = "20px";

message.style.right = "20px";

message.style.background =
"#2e7d32";

message.style.color = "white";

message.style.padding =
"15px 25px";

message.style.borderRadius =
"10px";

message.style.zIndex = "99999";

document.body.appendChild(message);

/* tự mất */

setTimeout(() => {

    message.remove();

}, 2000);
   
}

/* =========================
HIỂN THỊ GIỎ HÀNG MINI
========================= */

function updateCart(){

    let cartItems =
    document.getElementById("cart-items");

    let cartCount =
    document.getElementById("cart-count");

    let cartTotal =
    document.getElementById("cart-total");

    /* nếu không có */

    if(!cartItems || !cartTotal || !cartCount){
        return;
    }

    let total = 0;

    let quantity = 0;

    cartItems.innerHTML = "";

    /* chưa có sản phẩm */

    if(cart.length === 0){

        cartItems.innerHTML =
        "Chưa có sản phẩm";

    }else{

        cart.forEach(item => {

            total +=
            item.price * item.quantity;

            quantity += item.quantity;

            cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    ${item.name}<br>

                    SL: ${item.quantity}

                </div>

                <div>

                    ${(item.price * item.quantity)
                    .toLocaleString()}đ

                    <span
                    onclick="removeItem('${item.name}')"

                    style="
                    color:red;
                    cursor:pointer;
                    margin-left:10px;
                    font-weight:bold;
                    ">

                    X

                    </span>

                </div>

            </div>
            `;
        });
    }

    /* cập nhật số lượng */

    cartCount.innerText = quantity;

    /* cập nhật tổng */

    cartTotal.innerText =
    total.toLocaleString() + "đ";
}

/* =========================
TRANG GIỎ HÀNG
========================= */

function showCart(){

    let cartList =
    document.getElementById("cart-list");

    if(!cartList){
        return;
    }

    let total = 0;

    cartList.innerHTML = "";

    /* cập nhật số icon */

    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
    });

    let cartCount =
    document.getElementById("cart-count");

    if(cartCount){
        cartCount.innerText =
        totalQuantity;
    }

    /* chưa có sản phẩm */

    if(cart.length === 0){

        cartList.innerHTML = `

        <h2 style="text-align:center;">

            Chưa có sản phẩm

        </h2>
        `;

        let totalText =
        document.getElementById("total");

        if(totalText){
            totalText.innerText = "0đ";
        }

        return;
    }

    /* hiện sản phẩm */

    cart.forEach(item => {

        let itemTotal =
        item.price * item.quantity;

        total += itemTotal;

        cartList.innerHTML += `

        <div class="cart-item-page">

            <div class="left-cart">

                <img src="${item.image}">

                <div>

                    <div class="cart-name">

                        ${item.name}

                    </div>

                    <div class="cart-quantity">

                        Số lượng:
                        ${item.quantity}

                    </div>

                </div>

            </div>

            <div class="cart-price">

                ${itemTotal.toLocaleString()}đ

                <span class="remove"

                onclick="removeItem('${item.name}')">

                    X

                </span>

            </div>

        </div>
        `;
    });

    let totalText =
    document.getElementById("total");

    if(totalText){

        totalText.innerText =
        total.toLocaleString() + "đ";
    }
}

/* =========================
XOÁ SẢN PHẨM
========================= */

function removeItem(name){

    cart = cart.filter(
        item => item.name !== name
    );

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();

    showCart();
}

/* =========================
HIỆN DANH MỤC
========================= */

function showCategory(id){

    let sections =
    document.querySelectorAll(
        ".product-section"
    );

    sections.forEach(section => {
        section.style.display = "none";
    });

    let selected =
    document.getElementById(id);

    if(selected){
        selected.style.display = "block";
    }
}

/* =========================
CHẠY KHI LOAD
========================= */

document.addEventListener(
"DOMContentLoaded",

function(){

    /* cập nhật giỏ */

    updateCart();

    showCart();

    /* =========================
    PLACEHOLDER SEARCH
    ========================= */

    let texts = [

        "Bạn muốn tìm gì?",

        "Tìm cây Monstera...",

        "Tìm cây xương rồng...",

        "Tìm cây bonsai..."
    ];

    let input =
    document.getElementById(
        "searchInput"
    );

    if(input){

        let textIndex = 0;

        let charIndex = 0;

        function typeEffect(){

            if(charIndex <
            texts[textIndex].length){

                input.placeholder +=
                texts[textIndex]
                .charAt(charIndex);

                charIndex++;

                setTimeout(typeEffect, 80);

            }else{

                setTimeout(() => {

                    input.placeholder = "";

                    charIndex = 0;

                    textIndex =
                    (textIndex + 1)
                    % texts.length;

                    typeEffect();

                }, 1500);
            }
        }

        input.placeholder = "";

        typeEffect();
    }

    /* =========================
    SLIDER
    ========================= */

    let slides =
    document.querySelector(".slides");

    if(slides){

        let i = 0;

        const totalSlides =
        document.querySelectorAll(".slide")
        .length;

        function show(n){

            i =
            (n + totalSlides)
            % totalSlides;

            slides.style.transform =
            `translateX(-${i * 100}%)`;
        }

        let next =
        document.querySelector(".next");

        let prev =
        document.querySelector(".prev");

        if(next){
            next.onclick =
            () => show(i + 1);
        }

        if(prev){
            prev.onclick =
            () => show(i - 1);
        }

        setInterval(() => {

            show(i + 1);

        }, 10000);
    }
});
/* =========================
TÌM KIẾM SẢN PHẨM
========================= */

const searchInput =
document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener(
    "input",

    function(){

        let keyword =
        searchInput.value.toLowerCase();

        let products =
        document.querySelectorAll(
        ".product-card"
        );

        products.forEach(product => {

            let productName =
            product.querySelector("h3")
            .innerText
            .toLowerCase();

            if(productName.includes(keyword)){

                product.style.display =
                "block";

            }else{

                product.style.display =
                "none";
            }

        });
    });
}
/* =========================
LAB PAGE EFFECT
========================= */

const labCards =
document.querySelectorAll(".lab-card");

if(labCards){

    labCards.forEach(card => {

        card.addEventListener(
        "mouseenter",

        function(){

            card.style.transform =
            "translateY(-8px)";

        });

        card.addEventListener(
        "mouseleave",

        function(){

            card.style.transform =
            "translateY(0px)";

        });

    });
}

/* =========================
CHECKOUT
========================= */

document.addEventListener(
"DOMContentLoaded",

function(){

    let checkoutTotal =
    document.getElementById(
    "checkout-total"
    );

    if(checkoutTotal){

        let total = 0;

        cart.forEach(item => {

            total +=
            item.price * item.quantity;

        });

        checkoutTotal.innerText =
        total.toLocaleString() + "đ";
    }

    let checkoutForm =
    document.getElementById(
    "checkout-form"
    );

    let popup =
    document.getElementById(
    "popup"
    );

    if(checkoutForm){

        checkoutForm.addEventListener(
        "submit",

        function(e){

            e.preventDefault();

            popup.style.display =
            "flex";
        });
    }

    let noBtn =
    document.getElementById(
    "noBtn"
    );

    if(noBtn){

        noBtn.onclick = function(){

            popup.style.display =
            "none";
        };
    }

    let yesBtn =
    document.getElementById(
    "yesBtn"
    );

    if(yesBtn){

        yesBtn.onclick = function(){

            localStorage.removeItem(
            "cart"
            );

            popup.style.display =
            "none";

            window.location.href =
            "index.html";
        };
    }

});