chrome.runtime.onMessage.addListener(function(hidden, sender, sendResponse) {
    let elems = []
    let classesToHide = ["[class^='membersWrap-']", "[class^='sidebar-']", "[class^='wrapper-']"]
    classesToHide.forEach(c => {
        const found = document.querySelector(c)
        if (found) elems = [...elems, found]
    })
    elems.forEach(el => el.style.display = hidden ? "none" : "block")
    // Individual changes
    const classesToOffset = ["[class^='base-']"]
    classesToOffset.forEach(c => {
        const found = document.querySelector(c)
        if (found) found.style.left = '0px'
    })
});