let discordHidden = false

const getCurrentTab = () => {
    return new Promise(resolve => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            resolve(tabs[0] ? tabs[0] : null)  
          });
    })
}

function updateBadgeText(hidden, tabId) {
    chrome.browserAction.setBadgeText({
        text: hidden ? "✔" : "",
        tabId
    })
    chrome.browserAction.setBadgeBackgroundColor({
        color: "#00FF00",
        tabId
    })
}


async function showIt() {
    console.log("Popup DOM fully loaded and parsed");
    const tab = await getCurrentTab()
    discordHidden = !discordHidden
    chrome.tabs.executeScript(tab.id, {file: 'dom_modifier.js'}, function() {
        chrome.tabs.sendMessage(tab.id, discordHidden);
    })
    updateBadgeText(discordHidden, tab.id)
}

document.getElementById('mybutton').onclick = showIt;