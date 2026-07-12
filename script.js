const listaDeGrupos = document.querySelector(".groups")
const naoAgrupados = document.querySelector(".ungroupList")
const button = document.querySelector(".buttonTabs")


async function queryTabsAndGroups(currentWindow = true) {
    const allTabs = await chrome.tabs.query({currentWindow: currentWindow})
    const allGroups = await chrome.tabGroups.query({})
    return [allTabs, allGroups]
}

function loadGroups(groups) {
    listaDeGrupos.innerHTML = ""
    naoAgrupados.innerHTML = ""
    groups.forEach((group, index) => {
        let h3 = document.createElement("h3");
        let ul = document.createElement("ul")
        ul.id = group.id
        h3.innerText = group.title != "" ? "Grupo: " + group.title : "Grupo: " + (index+1);
        listaDeGrupos.append(h3, ul)
    })


}

function loadTabs(tabs, groups) {
    tabs.forEach(tab => {
        let li = document.createElement("li");
        li.innerText = tab.title;
        if(tab.groupId === -1) {
            naoAgrupados.appendChild(li)
        }else {
            const foundGroup = groups.find(e => e.id == tab.groupId)
            const foundUl = document.getElementById(foundGroup.id).appendChild(li);
        }
    });
}

button.addEventListener('click',(async (e) => {
    const [allTabs, allGroups] = await queryTabsAndGroups()
    console.log("Abas:", allTabs)
    console.log("Grupos:", allGroups)
    loadGroups(allGroups)
    loadTabs(allTabs, allGroups)
}))

// chrome.action.onClicked.addListener(async () => {
//     const tabs = await chrome.tabs.query({
//         currentWindow: true
//     });

//     const youtubeTabs = tabs.filter(tab =>
//         tab.url?.includes("youtube.com")
//     );

//     if (youtubeTabs.length === 0) {
//         console.log("Não há abas do YouTube.");
//         return;
//     }

//     const youtubeTabsIds = youtubeTabs.map(tab => tab.id);

//     await chrome.tabs.move(youtubeTabsIds, {
//         index: 0
//     });

//     const groupId = await chrome.tabs.group({
//         tabIds: youtubeTabsIds
//     });

//     await chrome.tabGroups.update(groupId, {
//         title: "YouTube",
//         color: "red",
//         collapsed: false
//     });

// });