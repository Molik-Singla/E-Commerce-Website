// **********  BUTTONS STARTS $$$$$$$$$$$$$$

// 1111111111111  drop down
let categoryBtn = document.querySelector(".category")
let categoryIcon = document.querySelector(".category i")
let cataItems = document.querySelector(".categoryItems")
let dropDown = document.querySelector(".dropDown")
categoryIcon.style.transform = "rotate(0deg)"
function disableCataItems(){
    categoryIcon.style.transform = "rotate(0deg)"
    cataItems.style.visibility = "hidden"
    cataItems.style.opacity = "0"
}
function toDisplayInOutDropDown() {
    if (categoryIcon.style.transform == "rotate(180deg)") {
        categoryIcon.style.transform = "rotate(0deg)"
        cataItems.style.visibility = "hidden"
        cataItems.style.opacity = "0"
    } else {
        categoryIcon.style.transform = "rotate(180deg)"
        cataItems.style.visibility = "visible"
        cataItems.style.opacity = "1"
    }
}
categoryBtn.addEventListener("click", () => {
    toDisplayInOutDropDown()
})

// 11111111111111111 drop down ends

// 55555555555555555 sort by arrow strt 
let sortBy = document.querySelector(".insideFilterBar p")
let sortByArrow1 = document.querySelector(".srt-1")
let sortByArrow2 = document.querySelector(".srt-2")

let sortingDiv = document.querySelector(".sortingDiv")
let sortingProductDiv = document.querySelector(".sortedProductsDiv")
let flag = true
sortByArrow1.style.display = "block"
sortByArrow2.style.display = "none"

sortBy.addEventListener("click", () => {

    if (window.getComputedStyle(sortByArrow1).display == "block") {
        sortByArrow1.style.display = "none"
        sortByArrow2.style.display = "block"
        sortingDiv.id = "enableSortingDivForMobile"
        sortingProductDiv.style.height = "calc(100vh - var(--header-height) - 46px)"
        sortingProductDiv.style.overflow = "hidden"
        sortingProductDiv.style.marginTop = "11px"
        document.querySelector("body").style.height = "100vh"
        document.querySelector("body").style.overflow = "hidden"

    } else {
        sortByArrow1.style.display = "block"
        sortByArrow2.style.display = "none"
        sortingDiv.id = ""
        sortingProductDiv.style.height = "auto"
        sortingProductDiv.style.overflow = "visible"
        sortingProductDiv.style.marginTop = "3px"
        document.querySelector("body").style.height = "auto"
        document.querySelector("body").style.overflow = "visible"
    }
})
// 55555555555555555 sort by arrow end

// 22222222222222222  menu
let menuIcon = document.querySelector(".menuIcon")
let menuItems = document.querySelector(".menuItems")

menuIcon.addEventListener("click", () => {
    if (window.getComputedStyle(menuItems).display  == "block"){
        menuItems.classList.remove("slide-out-left")
        menuItems.style.display = "none"   
    }
    else {
        menuItems.style.display = "block"
        menuItems.classList.remove("slide-out-left")
    }
})

let singleSingleMenuItem = document.querySelectorAll(".menuItems p")
for(let single of singleSingleMenuItem){
    single.addEventListener("click" , function(){
        menuItems.style.display = "none"
    })
}
// 22222222222222222  menu ends

// 3333333333333333   cetagory enable for mobiles
let cataIcon = document.querySelector(".categoryIcon")

cataIcon.addEventListener("click", function () {
    if (document.querySelector(".logo").style.display == "none") {
        document.querySelector(".logo").style.display = "flex"
        document.querySelector(".dropDown").style.display = "none"

    } else {
        document.querySelector(".logo").style.display = "none"
        document.querySelector(".dropDown").style.display = "flex"
    }
})

// 3333333333333333   cetagory enable for mobiles  ends

// 4444444444444444     sorting values and clear all



let sortBtn = document.querySelector(".sortButton button")
let clearAllBtn = document.querySelector(".sortingName button")
let correctResultP = document.querySelector(".result p")

function clearAllFunctionClicked(){
    let minValue = document.getElementsByName("minPrice")[0]
    let maxValue = document.getElementsByName("maxPrice")[0]
    minValue.querySelector("option").selected = "true"
    maxValue.querySelector("option").selected = "true"


    let checkedToNormal = document.querySelector("#rate1")
    checkedToNormal.checked = "true"
    clearAllBtn.style.display = "none"
}
clearAllBtn.addEventListener("click", clearAllFunctionClicked)

// 4444444444444444     sorting values and clear all ends

// **********  BUTTONS ENDS $$$$$$$$$$$$$$


// 66666666666666666666    signup login btn  start

let signUpBtn = document.querySelector(".signLoginBtn button:nth-of-type(1)")
let logInBtn = document.querySelector(".signLoginBtn button:nth-of-type(2)")

function loginInputsDisplay(){
    signUpBtn.style.backgroundColor = "white"
    signUpBtn.style.color = "black"
    logInBtn.style.backgroundColor = "var(--primary-color)"
    logInBtn.style.color = "white"

    document.querySelector(".signInputs").style.display = "none"
    document.querySelector(".loginInputs").style.display = "flex"
    document.querySelector(".insideLoginPage").style.height = "60vh"

    document.querySelector(".signLoginBtns button").textContent = "Log in"
    document.querySelector(".pleaseLogin").style.display = "none"
}
function signupInputsDisplay(){
    let close = signUpBtn.closest(".insideLoginPage")
    close.querySelectorAll("input").forEach((item) => {
        item.value = ""
    })
    document.querySelector(".someWrong").style.display = "none"
    signUpBtn.style.backgroundColor = "var(--primary-color)"
    signUpBtn.style.color = "white"
    logInBtn.style.backgroundColor = "white"
    logInBtn.style.color = "black"

    document.querySelector(".signInputs").style.display = "flex"
    document.querySelector(".loginInputs").style.display = "none"
    document.querySelector(".insideLoginPage").style.height = "73vh"

    document.querySelector(".signLoginBtns button").textContent = "Sign up"
}
logInBtn.addEventListener("click", loginInputsDisplay)
signUpBtn.addEventListener("click", signupInputsDisplay)

// 66666666666666666666    signup login btn ends 

// 88888888888888888888  profile starts 

let clickedDiv = document.querySelector(".insideProfile1 div:nth-of-type(1)")
let clickedDivI = document.querySelector(".insideProfile1 div:nth-of-type(1) i")
let showHiddenDiv = document.querySelector(".insideProfile1 div:nth-of-type(2)")


clickedDiv.addEventListener("click", () => {
    if (window.getComputedStyle(showHiddenDiv).display === 'none') {
        showHiddenDiv.style.display = "flex"
        clickedDivI.style.transform = "rotate(180deg)"
    }
    else {
        showHiddenDiv.style.display = "none"
        clickedDivI.style.transform = "rotate(0deg)"
    }
})


// 88888888888888888888  profile ends

