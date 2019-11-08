/// <reference path="../node_modules/@types/chrome/index.d.ts" />
/// <reference path="./MESSAGE.ts" />

// 接收信息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === msgObj.DEMO1) {
    chrome.tabs.create({ index: 0 })
  }
})

// 重定向
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log(details)
    return {
      redirectUrl: chrome.extension.getURL('img/icon_pocket_monster_1011.png'),
    }
  },
  {
    urls: ['https://www.baidu.com/img/bd_logo1.png?where=super'],
  },
  ['blocking']
)
