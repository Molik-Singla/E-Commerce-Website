// below we extract all changable Divs 
let allMainDivsInmain = document.querySelectorAll("main>div")
let [pageHome, pageProduct, pageProductItself, pageCart, pageLogin] = allMainDivsInmain;

function onEffect(on){
    on.style.backgroundColor = "grey"
    on.style.color = "white"
    on.style.transform = "scale(1.1) !important"
}
function offEffect(on){
    on.style.backgroundColor = "var(--primary-color)"
    on.style.color = "white"
    on.style.transform = "scale(1)"
}
let headerBtns = document.querySelectorAll("header button")
function switchToOnOff(on, ...off) {
    let cataP = document.querySelector(".category>p")
    on.style.display = "flex"  
    whichPage.push(on.className)
    for (let oneOff of off) {
        oneOff.style.display = "none"
    }
    let cata = document.querySelector(".category")
    let profDiv = document.querySelector(".insideProfile1")
    if(on.className === "HomePage"){
        onEffect(headerBtns[1])
        offEffect(headerBtns[2])
        offEffect(headerBtns[3])
        offEffect(cata)
        offEffect(profDiv)
        document.querySelector("footer").style.display = "flex"
    }
    else if(on.className === "CartItself"){
        onEffect(headerBtns[3])
        offEffect(headerBtns[1])
        offEffect(headerBtns[2])
        offEffect(cata)
        offEffect(profDiv)
        window.scrollTo(0 , 0)
        document.querySelector("footer").style.display = "none"
    }
    else if(on.className === "ProductsPage"){
        // cataP.textContent = "Category"
        onEffect(cata)
        offEffect(headerBtns[1])
        offEffect(headerBtns[2])
        offEffect(headerBtns[3])
        offEffect(profDiv)
        document.querySelector("footer").style.display = "none"
    }
    else if(on.className === "LoginPage"){
        offEffect(headerBtns[1])
        offEffect(headerBtns[2])
        offEffect(headerBtns[3])
        offEffect(cata)
        onEffect(profDiv)
        document.querySelector("footer").style.display = "none"
    }
    else if(on.className === "SingleProductItself"){
        offEffect(headerBtns[1])
        window.scrollTo(0 , 0)
        document.querySelector("footer").style.display = "none"
    }
    if(on.className != "ProductsPage"){
        cataP.textContent = "Category"
    }
}
// #1: function for create Products on HomePage
function createSingleHomePageProduct(imgSrc, productName, IdNumber) {
    let nameSlice
    if(window.innerWidth <= 480){
        nameSlice = productName.slice(0, 16)
    }else{
        nameSlice = productName.slice(0, 19)
    }
    nameSlice += "..."
    let createDiv = document.createElement("div")
    createDiv.className = "singleHomePageProduct"

    let priced = IdNumber.split(" ")
    priced[1] = parseInt(priced[1])

    createDiv.innerHTML =
        `<p id="IDNUMBER">${IdNumber}</p>
    <div class="productImg">
    <img
      src= ${imgSrc}
      alt="">
  </div>
  <div class="homePageProductInfo">
    <p>${nameSlice}</p>
    <p>${offPriceArray[priced[0]][priced[1]]}% off</p>
    <button>Add to Cart</button>
  </div>`
    return createDiv
}

let dealsOfTheDay = document.querySelector(".dealsofTheDayJS")
let allMobiles = document.querySelector(".allMobilesJS")
let divCreated;
// generates 5 - 5 products on HomePage
for (let i = 0; i < 5 ; i++) {
    divCreated = createSingleHomePageProduct(productImgSrc.topDeals[i], productName.topDeals[i] , `topDeals ${i}`);
    dealsOfTheDay.insertAdjacentElement("beforeend", divCreated)
}
for (let i = 0; i < productImgSrc.allMobiles.length ; i++) {
    divCreated = createSingleHomePageProduct(productImgSrc.allMobiles[i], productName.allMobiles[i] , `allMobiles ${i}`);
    allMobiles.insertAdjacentElement("beforeend", divCreated)
}

// #2 : functions for generate product on ProductsPage
function filterThePrice(price) {
    let str = price.toString()
    if (price < 10000) {
        let str2 = parseInt(str.slice(2))
        price = price - str2
    } else if (price >= 10000 && price < 100000) {
        let str2 = parseInt(str.slice(3))
        price = price - str2
    } else {
        let str2 = parseInt(str.slice(4))
        price = price - str2
    }
    return parseInt(price) - 1
}

function addCommaToPrice(price) {
    if (price < 10000) {
        let str = price.toString()
        str = str.slice(0, 1) + "," + str.slice(1)
        return str
    } else if (price >= 10000 && price < 100000) {
        let str = price.toString()
        str = str.slice(0, 2) + "," + str.slice(2)
        return str
    } else {
        let str = price.toString()
        str = str.slice(0, 1) + "," + str.slice(1, 3) + "," + str.slice(3)
        return str
    }
}
var mind = 0

//  (1) we could not generate product simple with for loops , we can do it in MainLogic.js according to user choice
function createSingleSortedProduct(imgSrc, proName, proPrice, hightlights, IdNumber) {
    let correctName = proName.slice(0, 19) + "..."

    let priced = IdNumber.split(" ")
    priced[1] = parseInt(priced[1])

    let generatedOffPrice = offPriceArray[priced[0]][priced[1]]

    let calcPrice = proPrice - (proPrice / 100 * generatedOffPrice)

    let str = `   <div class="singleSortedProduct">
                    <p id="IDNUMBER">${IdNumber}</p>
                    <div class="sortedProductImg">
                        <img
                            src=${imgSrc}
                            alt="">
                    </div>
                    <div class="sortedProductInfo">
                        <div class="insideSortedProductInfo">
                            <p>${correctName}</p>
                            <ul class="hightlights">
                            </ul>
                            <div class="addToCartOverImg">
                                <button>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div class="sortedProductPrice">
                    <div class="insideSortedProductPrice">
                        <p><i class="fa fa-rupee "></i>${addCommaToPrice(filterThePrice(calcPrice))}</p>
                        <span><i class="fa fa-inr" aria-hidden="true"></i>${addCommaToPrice(proPrice)}</span>
                        <span>${generatedOffPrice}% off</span>
                    </div>
                </div>
            </div>
            <hr>`

    toAppend.insertAdjacentHTML("beforeend", str)

    let highlightsDiv = document.querySelectorAll(".hightlights")
    hightlights = hightlights.split("\n")

    let flg = 0
    for (let item of hightlights) {
        item = item.trim()
        if (item.length >= 22) {
            item = item.slice(0, 22) + "..."
        }
        let li = document.createElement("li")
        li.textContent = item
        // highlightsDiv[priced[1]].append(li)
        highlightsDiv[mind].append(li)
        
        if (flg == 3) { break; }
        flg++;
    }
    mind++;
}

function addToCartOnSortedProductUpdate() {
    let selectSingleProduct = document.querySelectorAll(".singleSortedProduct")
    let btnToAction = document.querySelectorAll(".addToCartOverImg button")

    for (let i = 0; i < selectSingleProduct.length; i++) {
        btnToAction[i].style.width = "50%"
    }
}