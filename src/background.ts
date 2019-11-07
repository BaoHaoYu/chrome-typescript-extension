/// <reference path="../node_modules/@types/chrome/index.d.ts" />
/// <reference path="./MESSAGE.ts" />

// 接收信息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === msgObj.DEMO1) {
    chrome.tabs.create({ index: 0 })
  }
})
