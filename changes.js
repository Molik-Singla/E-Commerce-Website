// for width >= 768px
let mainVariable = [
    ".categoryItems",  ".profilePage",  ".areYouSure",  ".insideProfile1 div:nth-of-type(2)"
]

function wannaOffCategory(){
    let a1 = document.querySelector(mainVariable[0])
    if(window.getComputedStyle(a1).opacity  !== "0"){
        a1.style.opacity = 0
        categoryBtn.click()
    }
}
function wannaOffProfilePage(){
    let a1 = document.querySelector(mainVariable[1])
    if(window.getComputedStyle(a1).display != "none"){
        cancelProfilePage.click()
    }
}
function wannaOffAreYouSureDiv(){
    let a1 = document.querySelector(mainVariable[2])
    if(window.getComputedStyle(a1).display != "none"){
        cancelBtn.click()
    }
}
function wannaOffProfileName(){
    let a1 = document.querySelector(mainVariable[3])
    if(window.getComputedStyle(a1).display != "none"){
        clickedDiv.click()
    }
}
function wannaDisableAll(){
    wannaOffCategory()
    wannaOffProfilePage()
    wannaOffAreYouSureDiv()
    wannaOffProfileName()
}
categoryBtn.addEventListener("click" , () => {
    wannaOffAreYouSureDiv()
    wannaOffProfilePage()
    wannaOffProfileName()
})
clickedDiv.addEventListener("mouseenter" , () => {
    wannaOffAreYouSureDiv()
    wannaOffCategory()
})
// pageHome, pageProduct, pageProductItself, pageCart, pageLogin
pageHome.addEventListener("click" , () => {
    wannaDisableAll()
})
pageProduct.addEventListener("click" , () => {
    wannaDisableAll()
})
pageProductItself.addEventListener("click" , () => {
    wannaDisableAll()
})
pageCart.addEventListener("click" , () => {
    wannaDisableAll()
})
pageLogin.addEventListener("click" , () => {
    wannaDisableAll()
})
pageHome.addEventListener("mouseenter" , () => {
    wannaOffCategory()
    wannaOffProfileName()
})
pageProduct.addEventListener("mouseenter" , () => {
    wannaOffProfileName()
})
pageProductItself.addEventListener("mouseenter" , () => {
    wannaOffCategory()
    wannaOffProfileName()
})
pageCart.addEventListener("mouseenter" , () => {
    wannaOffCategory()
    wannaOffProfileName()
})
pageLogin.addEventListener("mouseenter" , () => {
    wannaOffCategory()
    wannaOffProfileName()
})

// for width <= 768px