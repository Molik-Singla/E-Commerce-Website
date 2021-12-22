// This Page Contains when some dropdown or button is open then click or touch or hover on ohter button or space ( closes opened dropdown or div)
// for width >= 768px
let mainVariable = [
    ".categoryItems", ".profilePage", ".areYouSure", ".insideProfile1 div:nth-of-type(2)"
]

function wannaOffCategory() {
    let a1 = document.querySelector(mainVariable[0])
    if (window.getComputedStyle(a1).opacity !== "0") {
        a1.style.opacity = 0
        categoryBtn.click()
    }
}
function wannaOffProfilePage() {
    let a1 = document.querySelector(mainVariable[1])
    if (window.getComputedStyle(a1).display != "none") {
        cancelProfilePage.click()
    }
}
function wannaOffAreYouSureDiv() {
    let a1 = document.querySelector(mainVariable[2])
    if (window.getComputedStyle(a1).display != "none") {
        cancelBtn.click()
    }
}
function wannaOffProfileName() {
    let a1 = document.querySelector(mainVariable[3])
    if (window.getComputedStyle(a1).display != "none") {
        clickedDiv.click()
    }
}
function wannaDisableAll() {
    wannaOffCategory()
    wannaOffProfilePage()
    wannaOffAreYouSureDiv()
    wannaOffProfileName()
}
categoryBtn.addEventListener("click", () => {
    wannaOffAreYouSureDiv()
    wannaOffProfilePage()
    wannaOffProfileName()
})
clickedDiv.addEventListener("mouseenter", () => {
    wannaOffAreYouSureDiv()
    wannaOffCategory()
    wannaOffProfilePage()
})
for (let btns of homePageBtn) {
    btns.addEventListener("click", () => {
        wannaDisableAll()
        let dropd = document.querySelector(".dropDown")
        if (window.getComputedStyle(dropd).display !== "none") {
            dropd.style.display = "none"
            document.querySelector(".logo").style.display = "flex"
        }
    })
}
connectCartBtn.addEventListener("click", () => {
    wannaDisableAll()
})
// pageHome, pageProduct, pageProductItself, pageCart, pageLogin
pageHome.addEventListener("click", () => {
    wannaDisableAll()
})
pageProduct.addEventListener("click", () => {
    wannaDisableAll()
})
pageProductItself.addEventListener("click", () => {
    wannaOffProfilePage()
    wannaOffProfileName()
})
pageCart.addEventListener("click", () => {
    wannaDisableAll()
})
pageLogin.addEventListener("click", () => {
    wannaDisableAll()
})
pageHome.addEventListener("mouseenter", () => {
    wannaOffCategory()
    wannaOffProfileName()
})
pageProduct.addEventListener("mouseenter", () => {
    wannaOffProfileName()
})
pageProductItself.addEventListener("mouseenter", () => {
    wannaOffCategory()
    wannaOffProfileName()
})
pageCart.addEventListener("mouseenter", () => {
    wannaOffCategory()
    wannaOffProfileName()
})
pageLogin.addEventListener("mouseenter", () => {
    wannaOffCategory()
    wannaOffProfileName()
})


// for width <= 768px
pageHome.addEventListener("touchstart", () => {
    wannaOffCategory()
    let dropd = document.querySelector(".dropDown")
    if (window.getComputedStyle(dropd).display !== "none") {
        dropd.style.display = "none"
        document.querySelector(".logo").style.display = "flex"
    }
})
pageProduct.addEventListener("touchstart", () => {
    wannaOffProfileName()
})
pageProductItself.addEventListener("touchstart", () => {
    wannaOffCategory()
})
pageCart.addEventListener("touchstart", () => {
    wannaOffCategory()
    let dropd = document.querySelector(".dropDown")
    if (window.getComputedStyle(dropd).display !== "none") {
        dropd.style.display = "none"
        document.querySelector(".logo").style.display = "flex"
    }
})
pageLogin.addEventListener("touchstart", () => {
    wannaDisableAll()
    let dropd = document.querySelector(".dropDown")
    if (window.getComputedStyle(dropd).display !== "none") {
        dropd.style.display = "none"
        document.querySelector(".logo").style.display = "flex"
    }
})
for (let i = 0; i < 2; i++) {
    loginSinginPageBtn[i].addEventListener("touchstart", () => {
        wannaDisableAll()
        let dropd = document.querySelector(".dropDown")
        if (window.getComputedStyle(dropd).display !== "none") {
            dropd.style.display = "none"
            document.querySelector(".logo").style.display = "flex"
        }
    })
}
menuIcon.addEventListener("touchend", () => {
    if (document.querySelector(".category").textContent.includes("Category")) {
        setTimeout(() => {
            let dropd = document.querySelector(".dropDown")
            if (window.getComputedStyle(dropd).display !== "none") {
                dropd.style.display = "none"
                document.querySelector(".logo").style.display = "flex"
            }
        }, 320)
    }
    wannaDisableAll()
})

// END...