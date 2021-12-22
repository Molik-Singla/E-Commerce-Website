let cancelProfilePage = document.querySelector(".acctInfo button")
let cancelBtn = document.querySelector(".crossBtnh button i")



var idForProductItself = ""
var whichPage = []
//  #1 : generate addToCart , (set) removeBtns for SingleProductItself  
function removalTemporary(productSet) {
    document.querySelector(".emptyCart").style.display = "none"
    removeItem = document.getElementsByClassName("removeItem")
    for (let ri of removeItem) {
        ri.addEventListener("click", function () {
            let topMost = ri.closest(".singleCartItem")
            let p = topMost.querySelector("#IDNUMBER").textContent
            let homePageAddToCart2 = document.querySelectorAll(".homePageProductInfo button")
            for (let oneAdd2 of homePageAddToCart2) {
                if (oneAdd2.closest(".singleHomePageProduct").querySelector("#IDNUMBER").textContent === p) {
                    oneAdd2.textContent = "Add to Cart"
                    oneAdd2.style.textAlign = "center"
                    oneAdd2.style.fontSize = "17.3px"
                    oneAdd2.style.backgroundColor = "var(--primary-color)"
                }
            }

            let newOne = localStorage.getItem(productSet)

            if (newOne.includes(`,${topMost.children[0].textContent}`)) {
                newOne = newOne.replace(`,${topMost.children[0].textContent}`, "")
            }
            else if (newOne.includes(`${topMost.children[0].textContent},`)) {
                newOne = newOne.replace(`${topMost.children[0].textContent},`, "")
            }
            else if (newOne.includes(`,${topMost.children[0].textContent},`)) {
                newOne = newOne.replace(`,${topMost.children[0].textContent},`, ",")
            }
            else {
                newOne = newOne.replace(topMost.children[0].textContent, "")
            }
            localStorage.removeItem(productSet)
            localStorage.setItem(productSet, newOne)
            topMost.remove(1)
            addToCartTemp = [...newOne.split(",")]
            updatePlaceOrderValus()
        })
    }
}
function changeAllInformationOfProductItself([productNameToFind, id]) {

    // select all div which needs to change according to product
    let changeSrc = document.querySelector(".itImg img")
    let changeName = document.querySelector(".insideItselfInfo p:first-child")
    let changePrice = document.querySelector(".price1")
    let changeTotalPrice = document.querySelector(".price2")
    let changeDiscount = document.querySelector(".disPrice")
    let changeHighlights = document.querySelector(".itselfUl")

    // change products info according to product
    changeSrc.src = productImgSrc[productNameToFind][id]
    changeName.textContent = productName[productNameToFind][id]

    // logic for changing highlights part
    let whatChange = productHighlights[productNameToFind][id]
    whatChange = whatChange.split("\n")

    changeHighlights.innerHTML = "<p>About this item : </p>"

    for (let change of whatChange) {
        change = change.trim()
        let li = document.createElement("li")
        li.textContent = change;

        changeHighlights.append(li)
    }

    changeTotalPrice.innerHTML = `<i class="fa fa-rupee "></i>${addCommaToPrice(productPrice[productNameToFind][id])}`
    changeDiscount.textContent = `${offPriceArray[productNameToFind][id]}% off`

    changePrice.innerHTML = `<i class="fa fa-rupee "></i>
    ${addCommaToPrice(filterThePrice((productPrice[productNameToFind][id] - (productPrice[productNameToFind][id] / 100 * offPriceArray[productNameToFind][id]))))}`

    // generating rating stars
    let rateStartDiv = document.querySelector(".rateStar")
    rateStartDiv.innerHTML = ""
    let rates = productRating[productNameToFind][id]

    for (let i = 1; i <= rates; i++)
        rateStartDiv.insertAdjacentHTML("beforeend", `<i class="fa fa-star" aria-hidden="true"></i>`)

    if (!Number.isInteger(rates)) {
        rateStartDiv.insertAdjacentHTML("beforeend", `<i class="fa fa-star halfStar" aria-hidden="true"></i>`)
    }

    let atc = document.querySelector(".aTCItself")
    if (addToCartTemp.includes(`${productNameToFind} ${id}`) === true) {
        atc.style.backgroundColor = "green"
        atc.innerHTML = `<i class="fas fa-shopping-cart" aria-hidden="true"></i> Added to Cart `

    } else {
        atc.style.backgroundColor = "var(--btn-color)"
        atc.innerHTML = `<i class="fas fa-shopping-cart" aria-hidden="true"></i> Add to Cart `
    }
    let tableDataTD = document.querySelector("td:nth-of-type(2)")
    let extractName = productName[productNameToFind][id].split(" ")[0]
    tableDataTD.textContent = extractName[0] + extractName.slice(1).toLowerCase()
}
let atc = document.querySelector(".aTCItself")
atc.addEventListener("click", function () {
    let atc = document.querySelector(".aTCItself")
    if (localStorage.getItem("isLogin")) {
        if (idForProductItself && !atc.textContent.includes("Added to Cart")) {
            atc.innerHTML = `<div class="loaderBlue"></div>`
            setTimeout(() => {
                atc.style.backgroundColor = "green"
                atc.innerHTML = `<i class="fas fa-shopping-cart" aria-hidden="true"></i> Added to Cart `
            }, 2400);

            let spl = idForProductItself.split(" ")
            let arg1 = spl[0]
            let arg2 = parseInt(spl[1])
            putIntoCart(arg1, arg2)

            if (arg1 == "topDeals") {
                removalTemporary("ProductSet1")
                let oldValues = localStorage.getItem("ProductSet1")
                if (oldValues) {
                    let con = oldValues + "," + `${arg1} ${arg2}`
                    localStorage.setItem("ProductSet1", con)
                }
                else {
                    localStorage.setItem("ProductSet1", `${arg1} ${arg2}`)
                }
            } else {
                removalTemporary("ProductSet2")
                let oldValues = localStorage.getItem("ProductSet2")
                if (oldValues) {
                    let con = oldValues + "," + `${arg1} ${arg2}`
                    localStorage.setItem("ProductSet2", con)
                }
                else {
                    localStorage.setItem("ProductSet2", `${arg1} ${arg2}`)
                }
            }
        }
    }
    else {
        areYouSureDiv.style.display = "flex"
    }
})
let singleProductFromHomePage = document.querySelectorAll(".singleHomePageProduct")
for (let single of singleProductFromHomePage) {
    single.addEventListener("click", function () {
        let getIdNumber = single.querySelector("#IDNUMBER").textContent;
        idForProductItself = getIdNumber
        getIdNumber = getIdNumber.split(" ")
        getIdNumber[1] = parseInt(getIdNumber[1])

        switchToOnOff(pageProductItself, loginSigninPage, pageHome, pageProduct, pageCart)
        changeAllInformationOfProductItself(getIdNumber)
    })
}

function sortedToItselfDiv(singleSortedProduct) {
    // console.log(singleSortedProduct);
    for (let single of singleSortedProduct) {
        single.addEventListener("click", function () {
            let getIdNumber = single.querySelector("#IDNUMBER").textContent;
            idForProductItself = getIdNumber
            getIdNumber = getIdNumber.split(" ")
            getIdNumber[1] = parseInt(getIdNumber[1])

            switchToOnOff(pageProductItself, loginSigninPage, pageHome, pageCart, pageProduct)
            changeAllInformationOfProductItself(getIdNumber)
        })
    }
}

let connectCartBtn = document.querySelector(".cart button")
let cartItself = document.querySelector(".CartItself")
let cartBtnAtMenu = document.querySelector(".cartAtMenu")
// 2..............................
connectCartBtn.addEventListener("click", function () {
    switchToOnOff(pageCart, pageHome, pageProduct, pageProductItself, pageLogin)
    updatePlaceOrderValus()
})
cartBtnAtMenu.addEventListener("click", function () {
    switchToOnOff(pageCart, pageHome, pageProduct, pageProductItself, pageLogin)
    updatePlaceOrderValus()
})

let cartItems = document.querySelector(".cartItems")

// go to logIn Page 
let loginSinginPageBtn = document.querySelectorAll(".logInJS")
let loginSigninPage = document.querySelector(".LoginPage")

for (let i = 0; i < 2; i++) {
    loginSinginPageBtn[i].addEventListener("click", () => {
        switchToOnOff(loginSigninPage, pageHome, pageProduct, pageProductItself, pageCart)
    })
}

// go to HomePage
let homePageBtn = document.querySelectorAll(".homeBtnJS")
for (let i = 0; i < 2; i++) {
    homePageBtn[i].addEventListener("click", () => {
        switchToOnOff(pageHome, pageProduct, pageProductItself, pageCart, loginSigninPage)
    })
}

// below : this function add products into the carts
function putIntoCart(productNameToFind, id) {
    addToCartTemp.push(`${productNameToFind} ${id}`)
    let totPriced = filterThePrice((productPrice[productNameToFind][id] - (productPrice[productNameToFind][id] / 100 * offPriceArray[productNameToFind][id])))
    totPriced -= roundOffInteger(totPriced)

    let shortenName
    if ((productName[productNameToFind][id].length >= 52)) {
        shortenName = productName[productNameToFind][id].slice(0, 52) + "..."
    }
    else {
        shortenName = productName[productNameToFind][id]
    }
    let putHtml = `
    <div class="singleCartItem">
            <p id="IDNUMBER">${productNameToFind} ${id}</p>
            <div class="cartImg">
              <img src=${productImgSrc[productNameToFind][id]} alt="">
            </div>
            <div class="cartInform">
              <p>${shortenName}</p>
              <p>In stock</p>
              <div class="singleCartPrice">
                <p><i class="fa fa-rupee "></i> ${addCommaToPrice(totPriced)}</p>
                <p><i class="fa fa-rupee "></i> ${addCommaToPrice(productPrice[productNameToFind][id])}</p>
                <span>${offPriceArray[productNameToFind][id]}% off</span>
                <div class="qtyAndRemove">
                  <label for="quantity">Quantity : </label>
                  <select name="quantity" id="quantity">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button class="removeItem">Remove item</button>
                </div>
              </div>
            </div>
            <hr>
          </div>`

    cartItems.insertAdjacentHTML("beforeend", putHtml)
}
// below : checks if cart is empty , then enable emptyCart div ( which tells the user that ur cart is empty )
function ifCartIsEmpty() {
    let aa = document.querySelector(".emptyCart")

    aa.style.display = "flex"
    let placeItem = document.querySelector(".placeItemJS")
    let placeTotal = document.querySelector(".placeTotalJS")
    let placeDiscount = document.querySelector(".placeDiscountJS")
    let priceToPay = document.querySelector(".placePriceToPayJS")

    placeItem.innerHTML = `0`
    placeTotal.innerHTML = `<i class="fa fa-rupee"></i> 0`
    placeDiscount.innerHTML = `<i class="fa fa-rupee"></i> 0`
    priceToPay.innerHTML = `<i class="fa fa-rupee"></i> 0`
    return true

}

function removeFromaddToCartTempVar(id) {
    let index = addToCartTemp.indexOf(id)
    if (index >= 0) {
        addToCartTemp.splice(id, 1)
    }
    console.log("After : ", addToCartTemp);
}
var removeItem;
let ct = 0;

// below : function put products in cart from HomePage
function funcForAddToCartHome(oneAdd, evt) {
    evt.stopPropagation()

    let emptyCart = document.querySelector(".emptyCart").style.display = "none"
    if (oneAdd.textContent == "Add to Cart") {
        oneAdd.innerHTML = `<div class="loader loaderSmall"></div>`
        setTimeout(() => {
            oneAdd.innerHTML = `Added to Cart <i class="fa fa-check doneCls" aria-hidden="true"></i>`
            oneAdd.style.textAlign = "left"
            oneAdd.style.fontSize = "16.5px"
            oneAdd.style.backgroundColor = "green"
        }, 1800)
        let oldValuesInLs = oneAdd.closest(".singleHomePageProduct").querySelector("#IDNUMBER")

        oldValuesInLs = oldValuesInLs.textContent
        let splitting = oldValuesInLs.split(" ")
        let arg1 = splitting[0]
        let arg2 = parseInt(splitting[1])
        putIntoCart(arg1, arg2)

        let oldValues = localStorage.getItem("ProductSet1")
        if (oldValues) {
            let con = oldValues + "," + oldValuesInLs
            localStorage.setItem("ProductSet1", con)
        }
        else {
            localStorage.setItem("ProductSet1", oldValuesInLs)
        }
    }
    // edit / set remove btns for those products which come from Homepage to cart
    removeItem = document.getElementsByClassName("removeItem")
    for (let ri of removeItem) {
        ri.addEventListener("click", function () {
            let topMost = ri.closest(".singleCartItem")
            let p = topMost.querySelector("#IDNUMBER").textContent

            let homePageAddToCart2 = document.querySelectorAll(".homePageProductInfo button")
            for (let oneAdd2 of homePageAddToCart2) {
                if (oneAdd2.closest(".singleHomePageProduct").querySelector("#IDNUMBER").textContent === p) {
                    oneAdd2.textContent = "Add to Cart"
                    oneAdd2.style.textAlign = "center"
                    oneAdd2.style.fontSize = "17.3px"
                    oneAdd2.style.backgroundColor = "var(--primary-color)"
                }
            }

            let newOne = localStorage.getItem("ProductSet1")

            if (newOne.includes(`,${topMost.children[0].textContent}`)) {
                newOne = newOne.replace(`,${topMost.children[0].textContent}`, "")
            }
            else if (newOne.includes(`${topMost.children[0].textContent},`)) {
                newOne = newOne.replace(`${topMost.children[0].textContent},`, "")
            }
            else if (newOne.includes(`,${topMost.children[0].textContent},`)) {
                newOne = newOne.replace(`,${topMost.children[0].textContent},`, ",")
            }
            else {
                newOne = newOne.replace(topMost.children[0].textContent, "")
            }
            localStorage.removeItem("ProductSet1")
            localStorage.setItem("ProductSet1", newOne)
            topMost.remove(1)
            addToCartTemp = [...newOne.split(",")]
            updatePlaceOrderValus()
        })
    }
    ct++;
}


let yesBtn = document.querySelector(".doYouBtn button:nth-of-type(1)")
let noBtn = document.querySelector(".doYouBtn button:nth-of-type(2)")
let areYouSureDiv = document.querySelector(".areYouSure")

function removeLaterHomeFunc(oneAdd, evt) {
    evt.stopPropagation()
    if (!localStorage.getItem("isLogin")) {
        if (oneAdd.textContent == "Add to Cart") {
            areYouSureDiv.style.display = "flex"
            wannaOffCategory()
            wannaOffProfileName()
            wannaOffProfilePage()
        }

    }
}
// sets HomePage addToCart btns
let homePageAddToCart = document.querySelectorAll(".homePageProductInfo button")
for (let oneAdd of homePageAddToCart) {
    if (localStorage.getItem("isLogin") === "true")
        oneAdd.addEventListener("click", funcForAddToCartHome.bind(null, oneAdd))
    else {
        oneAdd.addEventListener("click", removeLaterHomeFunc.bind(null, oneAdd))
    }
}

// below : function put products into cart from ProductPage
function funcForAddToCartProductPage(oneAdd, evt) {
    evt.stopPropagation()

    document.querySelector(".emptyCart").style.display = "none"
    let a = localStorage.getItem("ProductSet1")
    let oldValuesInLs = oneAdd.closest(".singleSortedProduct").querySelector("#IDNUMBER")

    oldValuesInLs = oldValuesInLs.textContent
    if (a && a.includes(oldValuesInLs)) {
        oneAdd.innerHTML = `<div class="loader loaderSmall"></div>`
        setTimeout(() => {
            oneAdd.innerHTML = `Added to Cart <i class="fa fa-check doneCls" aria-hidden="true"></i>`
            oneAdd.style.textAlign = "left"
            oneAdd.style.fontSize = "16.5px"
            oneAdd.style.backgroundColor = "green"
        }, 1800)
    }
    if (oneAdd.textContent == "Add to Cart") {

        if ((a == null || a) || (!a && !a.includes(oldValuesInLs))) {
            oneAdd.innerHTML = `<div class="loader loaderSmall"></div>`

            setTimeout(() => {
                oneAdd.innerHTML = `Added to Cart <i class="fa fa-check doneCls" aria-hidden="true"></i>`
                oneAdd.style.textAlign = "left"
                oneAdd.style.fontSize = "16.5px"
                oneAdd.style.backgroundColor = "green"
            }, 1800)

            let splitting = oldValuesInLs.split(" ")
            let arg1 = splitting[0]
            let arg2 = parseInt(splitting[1])
            putIntoCart(arg1, arg2)

            // stored in local storage
            let oldValues = localStorage.getItem("ProductSet2")
            if (oldValues) {
                let con = oldValues + "," + oldValuesInLs
                localStorage.setItem("ProductSet2", con)
            }
            else {
                localStorage.setItem("ProductSet2", oldValuesInLs)
            }

            // edit removeItem for products who comes from ProductPage to cart
            removeItem = document.getElementsByClassName("removeItem")
            for (let ri of removeItem) {
                ri.addEventListener("click", function () {
                    let topMost = ri.closest(".singleCartItem")
                    let p = topMost.querySelector("#IDNUMBER").textContent

                    let sortedProductPageAddToCart = document.querySelectorAll(".addToCartOverImg button")
                    for (let oneAdd2 of sortedProductPageAddToCart) {
                        if (oneAdd2.closest(".singleSortedProduct").querySelector("#IDNUMBER").textContent === p) {
                            oneAdd2.textContent = "Add to Cart"
                            oneAdd2.style.textAlign = "center"
                            oneAdd2.style.fontSize = "17.3px"
                            oneAdd2.style.backgroundColor = "var(--primary-color)"
                        }
                    }
                    let newOne = localStorage.getItem("ProductSet2")

                    if (newOne.includes(`,${topMost.children[0].textContent}`)) {
                        console.log("in 1");
                        newOne = newOne.replace(`,${topMost.children[0].textContent}`, "")
                    }
                    else if (newOne.includes(`${topMost.children[0].textContent},`)) {
                        console.log("in 2");
                        newOne = newOne.replace(`${topMost.children[0].textContent},`, "")
                    }
                    else if (newOne.includes(`,${topMost.children[0].textContent},`)) {
                        console.log("in 3");
                        newOne = newOne.replace(`,${topMost.children[0].textContent},`, ",")
                    }
                    else {
                        console.log("else");
                        localStorage.removeItem("CartProducts")
                        newOne = newOne.replace(topMost.children[0].textContent, "")
                    }
                    localStorage.removeItem("ProductSet2")
                    localStorage.setItem("ProductSet2", newOne)
                    topMost.remove(1)
                    addToCartTemp = [...newOne.split(",")]
                    updatePlaceOrderValus()
                })
            }
        }
    }
}

// below : set remove btn for products which are into cart after reload
var sortedProductPageAddToCart = document.querySelectorAll(".addToCartOverImg button")
function removeForAllSorted(button, closer, page, productSet) {
    removeItem = document.getElementsByClassName("removeItem")
    for (let ri of removeItem) {
        ri.addEventListener("click", function () {
            let topMost = ri.closest(closer)
            let p = topMost.querySelector("#IDNUMBER").textContent

            let homePageAddToCart2 = document.querySelectorAll(button)
            for (let oneAdd2 of homePageAddToCart2) {
                if (oneAdd2.closest(page).querySelector("#IDNUMBER").textContent === p) {
                    oneAdd2.textContent = "Add to Cart"
                    oneAdd2.style.textAlign = "center"
                    oneAdd2.style.fontSize = "17.3px"
                    oneAdd2.style.backgroundColor = "var(--primary-color)"
                }
            }
            let newOne = localStorage.getItem(productSet)
            if (newOne) {
                if (newOne.includes(`,${topMost.children[0].textContent}`)) {
                    newOne = newOne.replace(`,${topMost.children[0].textContent}`, "")
                } else if (newOne.includes(`${topMost.children[0].textContent},`)) {
                    newOne = newOne.replace(`${topMost.children[0].textContent},`, "")
                } else if (newOne.includes(`,${topMost.children[0].textContent},`)) {
                    newOne = newOne.replace(`,${topMost.children[0].textContent},`, ",")
                } else {
                    newOne = newOne.replace(topMost.children[0].textContent, "")
                }
                localStorage.removeItem(productSet)
                localStorage.setItem(productSet, newOne)
                topMost.remove(1)
                addToCartTemp = [...newOne.split(",")]
            }
            updatePlaceOrderValus()
        })
    }
}
// below : 2 both functions update addToCart -> addedToCart after reload the page
function removeItemFunction(button, closer, page, productSet, addVar) {
    let oldValues = localStorage.getItem(productSet)
    if (oldValues) {
        document.querySelector(".emptyCart").style.display = "none"

        for (let oneAdd of addVar) {
            let oldValuesInLs = oneAdd.closest(page).querySelector("#IDNUMBER").textContent
            if (oldValues.includes(oldValuesInLs)) {
                oneAdd.innerHTML = `<div class="loader loaderSmall"></div>`
                setTimeout(() => {
                    oneAdd.innerHTML = `Added to Cart <i class="fa fa-check doneCls" aria-hidden="true"></i>`
                    oneAdd.style.textAlign = "left"
                    oneAdd.style.fontSize = "16.5px"
                    oneAdd.style.backgroundColor = "green"
                }, 500)

                let splitting = oldValuesInLs.split(" ")
                let arg1 = splitting[0]
                let arg2 = parseInt(splitting[1])
                putIntoCart(arg1, arg2)
            }
        }
    }
    removeForAllSorted(button, closer, page, productSet)
}
function removeItemFunction2(button, closer, page, productSet, addVar) {
    let oldValues = localStorage.getItem(productSet)
    if (oldValues) {
        document.querySelector(".emptyCart").style.display = "none"
        oldValues = oldValues.split(",")

        for (let val of oldValues) {
            val = val.split(" ")
            let v1 = val[0]
            let v2 = parseInt(val[1])
            putIntoCart(v1, v2)
        }
    }
    removeForAllSorted(button, closer, page, productSet)
}

// below : are selected to display differ company mobiles according to user choice
let toAppend = document.querySelector(".sortedProductsDiv")

let appleBtn = document.querySelector(".appleJS")
let vivoBtn = document.querySelector(".vivoJS")
let oppoBtn = document.querySelector(".oppoJS")
let redmiBtn = document.querySelector(".redmiJS")
let samsungBtn = document.querySelector(".samsungJS")
let allBtn = document.querySelector(".allJS")
let whichBtnClicked = "none"

function commomFunctionForAllCompanyBtns() {
    let a = localStorage.getItem("ProductSet2")
    for (let oneAdd of sortedProductPageAddToCart) {
        if (localStorage.getItem("isLogin") === "true") {
            oneAdd.addEventListener("click", funcForAddToCartProductPage.bind(null, oneAdd))
            let oldValuesInLs = oneAdd.closest(".singleSortedProduct").querySelector("#IDNUMBER").textContent
            if (a && a.includes(oldValuesInLs)) {
                oneAdd.innerHTML = `<div class="loader loaderSmall"></div>`
                // setTimeout(() => {
                oneAdd.innerHTML = `Added to Cart <i class="fa fa-check doneCls" aria-hidden="true"></i>`
                oneAdd.style.textAlign = "left"
                oneAdd.style.fontSize = "16.5px"
                oneAdd.style.backgroundColor = "green"
                // } , 1800)
                // addToCartTemp.push(`${oldValuesInLs}`)

                if (a && oneAdd.textContent === "Add to Cart") {
                    oneAdd.innerHTML = `<div class="loader loaderSmall"></div>`
                    // setTimeout(() => {
                    oneAdd.innerHTML = `Added to Cart <i class="fa fa-check doneCls" aria-hidden="true"></i>`
                    oneAdd.style.textAlign = "left"
                    oneAdd.style.fontSize = "16.5px"
                    oneAdd.style.backgroundColor = "green"
                    // } , 1800)
                    let splitting = oldValuesInLs.split(" ")
                    let arg1 = splitting[0]
                    let arg2 = parseInt(splitting[1])
                    putIntoCart(arg1, arg2)
                    // addToCartTemp.push(`${arg1} ${arg2}`)
                }
            }
        }
        else {
            oneAdd.addEventListener("click", removeLaterHomeFunc.bind(null, oneAdd))
        }
    }
}

function makeResultDiv() {
    toAppend.innerHTML = ""
    let instHtml = `<div class="result">
                        <p></p>
                    </div>
                    <hr>`
    toAppend.insertAdjacentHTML("afterbegin", instHtml)
}
function allBrandInformation(brand) {
    mind = 0
    whichBtnClicked = brand

    makeResultDiv()
    document.querySelector(".result p").textContent = ` ${productImgSrc[brand].length} results found for "apple"`

    for (let i = 0; i < productName[brand].length; i++)
        createSingleSortedProduct(productImgSrc[brand][i], productName[brand][i], productPrice[brand][i], productHighlights[brand][i], `${brand} ${i}`)

    switchToOnOff(pageProduct, pageHome, pageProductItself, pageCart, pageLogin)
    addToCartOnSortedProductUpdate()

    sortedProductPageAddToCart = document.querySelectorAll(".addToCartOverImg button")
    commomFunctionForAllCompanyBtns()

    let singleSortedProduct = document.querySelectorAll(".singleSortedProduct")
    sortedToItselfDiv(singleSortedProduct)
}
let cataP = document.querySelector(".category>p")
appleBtn.addEventListener("click", function () {
    allBrandInformation("apple")
    clearAllFunctionClicked()
    cataP.textContent = "Apple"
    disableCataItems()
    console.log("Calling...");
})
vivoBtn.addEventListener("click", function () {
    allBrandInformation("vivo")
    clearAllFunctionClicked()
    cataP.textContent = "Vivo"
    disableCataItems()
})
oppoBtn.addEventListener("click", function () {
    allBrandInformation("oppo")
    clearAllFunctionClicked()
    cataP.textContent = "Oppo"
    disableCataItems()
})
redmiBtn.addEventListener("click", function () {
    allBrandInformation("redmi")
    clearAllFunctionClicked()
    cataP.textContent = "Redmi"
    disableCataItems()
})
samsungBtn.addEventListener("click", function () {
    allBrandInformation("samsung")
    clearAllFunctionClicked()
    cataP.textContent = "Samsung"
    disableCataItems()
})
let cout = 0
function generatorForAllPhones(brand) {

    whichBtnClicked = brand
    for (let i = 0; i < productName[brand].length; i++) {
        cout++
        createSingleSortedProduct(productImgSrc[brand][i], productName[brand][i], productPrice[brand][i], productHighlights[brand][i], `${brand} ${i}`)
    }
    switchToOnOff(pageProduct, pageHome, pageProductItself, pageCart, pageLogin)
    addToCartOnSortedProductUpdate()

    sortedProductPageAddToCart = document.querySelectorAll(".addToCartOverImg button")
    commomFunctionForAllCompanyBtns()
}
var ctAgain = 0
// below : display all products ( needs some differ changes below are :-)
allBtn.addEventListener("click", function () {
    mind = 0
    cout = 0
    toAppend.innerHTML = ""
    let instHtml = `<div class="result">
                        <p></p>
                    </div>
                    <hr>`
    toAppend.insertAdjacentHTML("afterbegin", instHtml)
    generatorForAllPhones("apple")
    generatorForAllPhones("vivo")
    generatorForAllPhones("oppo")
    generatorForAllPhones("redmi")
    generatorForAllPhones("samsung")
    document.querySelector(".result p").textContent = ` ${cout} results found for "all mobiles"`

    let singleSortedProduct = document.querySelectorAll(".singleSortedProduct")
    sortedToItselfDiv(singleSortedProduct)

    whichBtnClicked = "allBtn"
    ctAgain = 0
    cataP.textContent = "All Phones"
    disableCataItems()
})
let moreInDailyContent = document.querySelector(".dailyContentName button")

// more... btn connects to all phones display , below : 
moreInDailyContent.addEventListener("click", function () {
    mind = 0
    cout = 0
    toAppend.innerHTML = ""
    let instHtml = `<div class="result">
                        <p></p>
                    </div>
                    <hr>`
    toAppend.insertAdjacentHTML("afterbegin", instHtml)
    generatorForAllPhones("apple")
    generatorForAllPhones("vivo")
    generatorForAllPhones("oppo")
    generatorForAllPhones("redmi")
    generatorForAllPhones("samsung")
    document.querySelector(".result p").textContent = ` ${cout} results found for "all mobiles"`

    let singleSortedProduct = document.querySelectorAll(".singleSortedProduct")
    sortedToItselfDiv(singleSortedProduct)

    whichBtnClicked = "allBtn"
    ctAgain = 0
    cataP.textContent = "All Phones"
    disableCataItems()
})

// below : sorting logic sets according to user put /selects values
function sortingLogic(proNamed, minValue, maxValue, sortByRating) {
    mind = 0
    makeResultDiv()

    let ct = 0
    for (let i = 0; i < productName[proNamed].length; i++) {
        let totalPrice = productPrice[proNamed][i]
        let lessPrice = totalPrice - (totalPrice / 100 * offPriceArray[proNamed][i])
        if (lessPrice <= maxValue && lessPrice >= minValue && productRating[proNamed][i] >= sortByRating) {
            ct++
            createSingleSortedProduct(productImgSrc[proNamed][i], productName[proNamed][i], productPrice[proNamed][i], productHighlights[proNamed][i], `${proNamed} ${i}`)
        }
    }
    document.querySelector(".result p").textContent = ` ${ct} results found for "apple" after filter`
    switchToOnOff(pageProduct, pageHome, pageProductItself, pageCart, pageLogin)
    addToCartOnSortedProductUpdate()

    sortedProductPageAddToCart = document.querySelectorAll(".addToCartOverImg button")
    commomFunctionForAllCompanyBtns()

    if (ct == 0) {
        let div = document.createElement("div")
        div.className = "emptyProductDiv"
        div.innerHTML = `
        <p style = "font-size: 20px; margin:12px; text-align:center;">No Product is Found , Sorry For the Inconvenience :)</p>`
        toAppend.insertAdjacentElement("beforeend", div)
    }
}
let sorry2 = 0
function sortingLogic2(proNamed, minValue, maxValue, sortByRating) {
    for (let i = 0; i < productName[proNamed].length; i++) {
        let totalPrice = productPrice[proNamed][i]
        let lessPrice = totalPrice - (totalPrice / 100 * offPriceArray[proNamed][i])
        if (lessPrice <= maxValue && lessPrice >= minValue && productRating[proNamed][i] >= sortByRating) {
            ctAgain++
            sorry2++;
            createSingleSortedProduct(productImgSrc[proNamed][i], productName[proNamed][i], productPrice[proNamed][i], productHighlights[proNamed][i], `${proNamed} ${i}`)
        }
    }

    switchToOnOff(pageProduct, pageHome, pageProductItself, pageCart, pageLogin)
    addToCartOnSortedProductUpdate()

    sortedProductPageAddToCart = document.querySelectorAll(".addToCartOverImg button")
    commomFunctionForAllCompanyBtns()
}

//  clearall and sort button in sorted products Div
sortBtn.addEventListener("click", () => {
    clearAllBtn.style.display = "block"
    let minValue = document.getElementsByName("minPrice")[0].value
    let maxValue = document.getElementsByName("maxPrice")[0].value
    let sortByRating = document.querySelector('input[name="sortByRating"]:checked').value

    minValue = parseInt(minValue)
    maxValue = parseInt(maxValue)
    sortByRating = parseInt(sortByRating)

    if (whichBtnClicked !== "allBtn") {
        sortingLogic(whichBtnClicked, minValue, maxValue, sortByRating)
        let singleSortedProduct = document.querySelectorAll(".singleSortedProduct")
        sortedToItselfDiv(singleSortedProduct)
    }
    else {
        sorry2 = 0
        mind = 0
        ctAgain = 0
        toAppend.innerHTML = ""
        let instHtml = `<div class="result">
                            <p></p>
                        </div>
                        <hr>`
        toAppend.insertAdjacentHTML("afterbegin", instHtml)
        sortingLogic2("apple", minValue, maxValue, sortByRating)
        sortingLogic2("vivo", minValue, maxValue, sortByRating)
        sortingLogic2("oppo", minValue, maxValue, sortByRating)
        sortingLogic2("redmi", minValue, maxValue, sortByRating)
        sortingLogic2("samsung", minValue, maxValue, sortByRating)
        document.querySelector(".result p").textContent = ` ${ctAgain} results found for "all mobiles" after filter`

        let singleSortedProduct = document.querySelectorAll(".singleSortedProduct")
        sortedToItselfDiv(singleSortedProduct)

        if (sorry2 === 0) {
            let div = document.createElement("div")
            div.className = "emptyProductDiv"
            div.innerHTML = `
            <p style = "font-size: 20px; margin:12px; text-align:center;">No Product is Found , Sorry For the Inconvenience :)</p>`
            toAppend.insertAdjacentElement("beforeend", div)
        }
    }

    if (window.innerWidth <= 767)
        sortBy.click()
})

clearAllBtn.addEventListener("click", function () {
    if (whichBtnClicked !== "allBtn") {
        allBrandInformation(whichBtnClicked)
    } else {
        mind = 0
        cout = 0
        toAppend.innerHTML = ""
        let instHtml = `<div class="result">
                            <p></p>
                        </div>
                        <hr>`
        toAppend.insertAdjacentHTML("afterbegin", instHtml)
        generatorForAllPhones("apple")
        generatorForAllPhones("vivo")
        generatorForAllPhones("oppo")
        generatorForAllPhones("redmi")
        generatorForAllPhones("samsung")
        document.querySelector(".result p").textContent = ` ${cout} results found for "all mobiles"`

        let singleSortedProduct = document.querySelectorAll(".singleSortedProduct")
        sortedToItselfDiv(singleSortedProduct)

        whichBtnClicked = "allBtn"
        ctAgain = 0
    }
    if (window.innerWidth <= 767)
        sortBy.click()
})

function roundOffInteger(price) {
    price = `${price}`
    if (parseInt(price) < 100000) {
        let last = price % 10
        return last
    }
    else if (parseInt(price) >= 100000) {
        let last = price % 100
        return last
    }
}

// update placeOrder value according to count of products into cart
function updatePlaceOrderValus() {
    let placeItem = document.querySelector(".placeItemJS")
    let placeTotal = document.querySelector(".placeTotalJS")
    let placeDiscount = document.querySelector(".placeDiscountJS")
    let priceToPay = document.querySelector(".placePriceToPayJS")
    let cartDivCount = document.querySelectorAll(".cartItems>div")

    let totalAmount = 0
    let payablePrice = 0;
    for (let i = 1; i <= cartDivCount.length - 1; i++) {
        let getNameId = cartDivCount[i].querySelector("p").textContent
        let name = getNameId.split(" ")[0]
        let id = parseInt(getNameId.split(" ")[1])
        totalAmount += productPrice[name][id]
        payablePrice += filterThePrice((productPrice[name][id] - (productPrice[name][id] / 100 * offPriceArray[name][id])))
    }
    let cutoff = roundOffInteger(payablePrice)
    payablePrice = payablePrice - cutoff

    placeItem.innerHTML = `${cartDivCount.length - 1}`
    placeTotal.innerHTML = `<i class="fa fa-rupee"></i> ${addCommaToPrice(totalAmount)}`
    placeDiscount.innerHTML = `-<i class="fa fa-rupee"></i> ${addCommaToPrice(totalAmount - payablePrice)}`
    priceToPay.innerHTML = `<i class="fa fa-rupee"></i> ${addCommaToPrice(payablePrice)}`

    if (cartDivCount.length == 1) {
        ifCartIsEmpty()
    }
}

let someThing = document.querySelector(".someWrong")
function onOffSomething(txt, disp = "block", left = "27%") {
    someThing.style.display = disp
    someThing.style.left = left
    someThing.textContent = txt
}
// update name of user after login and reload of page
function updateNameOfUser() {
    let pedit = document.querySelector(".insideProfile1 div:nth-of-type(1)>p")
    let fromSign = localStorage.getItem("Sign up").split(",")
    let name = ""
    for (let i = 0; i < 5; i++) {
        if (fromSign[0][i] == "@") { break; }
        name = name + fromSign[0][i]
    }
    name = name + ".."
    let name2 = name[0].toUpperCase() + name.slice(1)
    name = name2
    pedit.textContent = name
}

// below :  areYouSure divs comes which enables when user does not login and try to do addToCart
cancelBtn.addEventListener("click", function () {
    areYouSureDiv.style.display = "none"
})
noBtn.addEventListener("click", function () {
    areYouSureDiv.style.display = "none"
})

yesBtn.addEventListener("click", function () {
    switchToOnOff(loginSigninPage, pageProductItself, pageHome, pageProduct, pageCart)
    areYouSureDiv.style.display = "none"
    if (localStorage.getItem("Sign up")) {
        loginInputsDisplay()
    }
    else {
        signupInputsDisplay()
    }
})
// areYouSureDiv.addEventListener("mouseleave", () => {
//     areYouSureDiv.style.display = "none"
// })

//  sign up data and logic and  login data and logic
let emailInsideProfile = document.querySelector(".profileInfoInside p:nth-of-type(1)")
let passwordInsideProfile = document.querySelector(".profileInfoInside p:nth-of-type(2)")

let signLoginBtn = document.querySelector(".signLoginBtns button")
signLoginBtn.addEventListener("click", function () {
    let allInput = document.querySelectorAll(".signInputs input")
    let flag = 0

    let getEmail = allInput[0]
    let getPass = allInput[1]
    let getConfirmPass = allInput[2]

    let logEmail = allInput[3]
    let logPass = allInput[4]

    if (signLoginBtn.textContent === "Sign up") {
        if (!getEmail.value) {
            onOffSomething("Please enter valid Email !")
            flag = 1
        } else if (getEmail.value.includes("@gmail.com") === false) {
            onOffSomething("Please enter valid Email !")
            flag = 1
        }
        else if (!getPass.value) {
            onOffSomething("Please enter Password")
            flag = 1
        }
        else if(getPass.value.length <= 7){
            onOffSomething("Please Length must be Greater than 7" , "block" , "16%")
            flag = 1
        }
        else if (!getConfirmPass.value) {
            onOffSomething("Please confirm your Password", "block", "24%")
            flag = 1
        }
        else if (getPass.value !== getConfirmPass.value) {
            onOffSomething("Password does not Match !")
            flag = 1
        }

        if (flag === 0) {
            someThing.style.display = "none"
            localStorage.setItem("Sign up", `${getEmail.value},${getPass.value},${getConfirmPass.value}`)
            loginInputsDisplay()
            document.querySelector(".pleaseLogin").style.display = "block"
        }
    }
    else if (signLoginBtn.textContent === "Log in") {

        if (localStorage.getItem("Sign up")) {
            let fromSign = localStorage.getItem("Sign up").split(",")
            console.log(fromSign);

            if (logEmail.value != fromSign[0] && logPass.value != fromSign[1]) {
                onOffSomething("Email & Password does not Match !", "block", "19%")
            }
            else if (logEmail.value != fromSign[0]) {
                onOffSomething("Email does not Match !", "block", "27%")
            }
            else if (logPass.value != fromSign[1]) {
                onOffSomething("Password does not Match !", "block", "26%")
            }
            else {
                someThing.style.display = "none"
                signLoginBtn.innerHTML = `<div class="loader"></div>`
                setTimeout(() => {
                    signLoginBtn.innerHTML = `Login Successfull`

                    emailInsideProfile.textContent = `Email : ${getEmail.value}`
                    passwordInsideProfile.textContent = `Password : ${getPass.value}`

                    setTimeout(() => {
                        updateNameOfUser()
                        localStorage.setItem("isLogin", "true")
                        switchToOnOff(pageHome, pageProduct, pageProductItself, pageCart, loginSigninPage)
                        for (let oneAdd of homePageAddToCart) {
                            oneAdd.addEventListener("click", funcForAddToCartHome.bind(null, oneAdd))
                        }
                        getEmail = allInput[0].value = ""
                        getPass = allInput[1].value = ""
                        getConfirmPass = allInput[2].value = ""

                        logEmail = allInput[3].value = ""
                        logPass = allInput[4].value = ""
                        signLoginBtn.textContent = "Log in"
                        document.querySelector(".pleaseLogin").style.display = "none"
                    }, 1600)
                }, 6000)
            }
        }
    }
})


let continueShopping = document.querySelector(".emptyCart button")
continueShopping.addEventListener("click", () => {
    switchToOnOff(pageHome, pageProduct, pageProductItself, pageCart, loginSigninPage)
})


// profiles div comes to settings below
function onFilter() {
    if (window.innerWidth >= 768) {
        pageProductItself.style.filter = "saturate(0.6) blur(.8px)"
        loginSigninPage.style.filter = "brightness(0.7) blur(.8px)"
        pageHome.style.filter = "brightness(0.7) blur(.8px)"
        pageProduct.style.filter = "brightness(0.7) blur(.8px)"
        pageCart.style.filter = "brightness(0.7) blur(.8px)"
        document.querySelector("main").style.height = "calc(100vh - var(--header-height))"
        document.querySelector("main").style.overflow = "hidden"
    } else {
        document.querySelector("main").style.height = "calc(100vh - var(--header-height))"
        document.querySelector("main").style.overflow = "hidden"
    }
}
function offFilter() {
    if (window.innerWidth >= 768) {
        pageProductItself.style.filter = "brightness(1)"
        loginSigninPage.style.filter = "brightness(1)"
        pageHome.style.filter = "brightness(1)"
        pageProduct.style.filter = "brightness(1)"
        pageCart.style.filter = "brightness(1)"
        document.querySelector("main").style.height = "auto"
        document.querySelector("main").style.overflow = "visible"
    } else {
        document.querySelector("main").style.height = "auto"
        document.querySelector("main").style.overflow = "visible"
    }
}

function minBody() {
    document.querySelector("body").style.height = "100vh"
    document.querySelector("body").style.overflow = "hidden"
}
function maxBody() {
    document.querySelector("body").style.height = "auto"
    document.querySelector("body").style.overflow = "visible"
}
let profileBtn = document.querySelector(".profileJS")
let profileBtn1 = document.querySelector(".profileJS2")
let profilePageDiv = document.querySelector(".profilePage")

let logOutInProfile = document.querySelector(".logOutBtnJS")

let backBtnOnProductItself = document.querySelector(".SingleProductItself>button")
let allHeader = document.querySelectorAll("header button")
let cata = document.querySelector(".category")

function profileFunc() {
    backBtnOnProductItself.style.visibility = "hidden"
    logOutInProfile.style.display = "block"
    emailInsideProfile.className = "manipulate1JS"
    passwordInsideProfile.className = "manipulate2JS"
    let ac = document.querySelector(".acctInfo>span")
    ac.textContent = "Profile"
    let got = localStorage.getItem("Sign up")
    if (got && localStorage.getItem("isLogin")) {
        emailInsideProfile.textContent = `Email : ${got.split(",")[0]}`
        passwordInsideProfile.textContent = `Password : ${got.split(",")[1]}`
    } else {
        emailInsideProfile.textContent = `Email : --------`
        passwordInsideProfile.textContent = `Password : --------`
    }

    profilePageDiv.style.display = "flex"

    offEffect(allHeader[1])
    offEffect(allHeader[2])
    offEffect(allHeader[3])
    offEffect(cata)
    minBody()
    onFilter()
    let a2 = document.querySelector(".insideProfile1")
    onEffect(a2)
}
profileBtn.addEventListener("click", () => {
    profileFunc()

})
profileBtn1.addEventListener("click", () => {
    profileFunc()
})

cancelProfilePage.addEventListener("click", function () {
    profilePageDiv.style.display = "none"
    backBtnOnProductItself.style.visibility = "visible"
    maxBody()
    offFilter()

    offEffect(allHeader[2])
    if (whichPage[whichPage.length - 1] == "HomePage") {
        onEffect(allHeader[1])
        offEffect(allHeader[3])
    }
    else if (whichPage[whichPage.length - 1] == "CartItself") {
        onEffect(allHeader[3])
        offEffect(allHeader[1])
    }
    else if (whichPage[whichPage.length - 1] == "ProductsPage") {
        onEffect(cata)
    }
    let a2 = document.querySelector(".insideProfile1")
    offEffect(a2)
})
// profilePageDiv.addEventListener("mouseleave", () => {
//     backBtnOnProductItself.style.visibility = "visible"
//     profilePageDiv.style.display = "none"
//     maxBody()
//     offFilter()

//     offEffect(allHeader[2])
//     if(whichPage[whichPage.length-1] == "HomePage"){
//         onEffect(allHeader[1])
//         offEffect(allHeader[3])
//     }
//     else if(whichPage[whichPage.length-1] == "CartItself"){
//         onEffect(allHeader[3])
//         offEffect(allHeader[1])
//     }
//     else if(whichPage[whichPage.length-1] == "ProductsPage"){
//         onEffect(cata)
//     }
//     let a2 = document.querySelector(".insideProfile1")
//     offEffect(a2)
// })
// logout btn in profile
logOutInProfile.addEventListener("click", function () {
    console.log("log out clicked");
    if (localStorage.getItem("isLogin") == "true") {
        localStorage.clear()
        location.reload()
        emailInsideProfile.textContent = `Email : --------`
        passwordInsideProfile.textContent = `Password : --------`
    }
    else {
        profilePageDiv.style.display = "none"
        console.log("Display None");
        offFilter()
        areYouSureDiv.style.display = "flex"
        wannaOffCategory()
        wannaOffProfileName()
        wannaOffProfilePage()
    }
})


let abd = document.querySelector(".cancelMenu")
abd.addEventListener("click", (evt) => {
    evt.stopPropagation()
    menuItems.style.display = "none"
})

// update many values and items when page is loaded 
window.addEventListener("load", function () {
    switchToOnOff(pageHome, pageProduct, pageProductItself, pageCart, loginSigninPage)
    // for home page products
    removeItemFunction(".homePageProductInfo button", ".singleCartItem", ".singleHomePageProduct", "ProductSet1", homePageAddToCart)

    // for sorted page products
    removeItemFunction2(".addToCartOverImg button", ".singleCartItem", ".singleSortedProduct", "ProductSet2", sortedProductPageAddToCart)

    // update cart prices as calculate using items inside cart
    updatePlaceOrderValus()

    // if login thin update username
    if (localStorage.getItem("isLogin") == "true") {
        updateNameOfUser()
    }

    // update profile on login

    if (localStorage.getItem("isLogin") != "true") {
        emailInsideProfile.textContent = `Email : --------`
        passwordInsideProfile.textContent = `Password : --------`
    } else {
        let cut = localStorage.getItem("Sign up").split(",")
        emailInsideProfile.textContent = `Email : ${cut[0]}`
        passwordInsideProfile.textContent = `Password : ${cut[1]}`
    }

    addToCartTemp = []
    let spl1 = localStorage.getItem("ProductSet1")
    let spl2 = localStorage.getItem("ProductSet2")
    if (spl1) {
        spl1 = spl1.split(",")
        for (let one of spl1) {
            if (one) {
                addToCartTemp.push(one)
            }
        }
    }
    if (spl2) {
        spl2 = spl2.split(",")
        for (let one of spl2) {
            if (one) {
                addToCartTemp.push(one)
            }
        }
    }
    whichPage.push("HomePage")
})

// sets addToCart -> AddedToCart after click on HomePage
for (let home of homePageBtn)
    home.addEventListener("click", function () {
        let allPro = document.querySelectorAll(".singleHomePageProduct")
        for (let one of allPro) {
            if (addToCartTemp.includes(one.querySelector(".singleHomePageProduct>p").textContent)) {
                let oneAdd = one.querySelector(".homePageProductInfo button")
                oneAdd.innerHTML = `Added to Cart <i class="fa fa-check doneCls" aria-hidden="true"></i>`
                oneAdd.style.textAlign = "left"
                oneAdd.style.fontSize = "16.5px"
                oneAdd.style.backgroundColor = "green"
            }
        }
    })

// sets backBtn in SingleProductItself div to go either on HomePage or on ProductPage
backBtnOnProductItself.addEventListener("click", function () {
    console.log(whichPage[whichPage.length - 2], whichBtnClicked);
    if (whichPage[whichPage.length - 2] && whichPage[whichPage.length - 2] == "HomePage") {
        switchToOnOff(pageHome, pageProduct, pageProductItself, pageCart, loginSigninPage)
    } else if (whichPage[whichPage.length - 2] && whichPage[whichPage.length - 2] == "ProductsPage") {
        switchToOnOff(pageProduct, pageHome, pageProductItself, pageCart, loginSigninPage)

        allBrandInformation(whichBtnClicked)
        clearAllFunctionClicked()
        let naming = whichBtnClicked
        naming = naming
        let name2 = naming[0].toUpperCase() + naming.slice(1)
        naming = name2
        cataP.textContent = naming
        disableCataItems()
    }
})


// set about pages (adjust info in Profile div)
let aboutBtn = document.querySelector(".aboutBtnJS")
let aboutBtn1 = document.querySelector(".aboutBtnJS2")

function aboutUSFunc() {
    let ac = document.querySelector(".acctInfo>span")
    ac.textContent = "About"

    profilePageDiv.style.display = "flex"

    passwordInsideProfile.className = "vaiseHi"
    passwordInsideProfile.innerHTML = `My name is Molik Singla . I am currently doing BCA at Public College Samana . Languages I know :- <br> C , C++ , Python , JavaScript`

    emailInsideProfile.className = "vaiseHi2"
    emailInsideProfile.textContent = "Hello , "

    logOutInProfile.style.display = "none"
    minBody()
    onFilter()
    let offOne = document.querySelector(".insideProfile1")
    offEffect(offOne)
}
aboutBtn.addEventListener("click", () => {
    wannaOffAreYouSureDiv()
    wannaOffCategory()
    wannaOffProfileName()

    onEffect(allHeader[2])
    offEffect(allHeader[1])
    offEffect(allHeader[3])
    offEffect(cata)
    aboutUSFunc()

})
aboutBtn1.addEventListener("click", aboutUSFunc)

if (window.innerWidth <= 767) {
    let imageChange = document.querySelector(".HomePage>img")
    imageChange.style.src = "mobileWall.jpeg"
} else {
    let imageChange = document.querySelector(".HomePage>img")
    imageChange.style.src = "pcWall.jpeg"
}

document.querySelector(".SingleProductItself").style.height = `${window.innerHeight}px !important`


