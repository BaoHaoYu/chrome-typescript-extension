/// <reference path="../node_modules/@types/chrome/index.d.ts" />
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="./MESSAGE.ts" />

$('.demo').on('click', function() {
  const $this = $(this)

  try {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, msgObj.DEMO2)
    })
  } catch (error) {
    console.log(error)
  }
})
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === msgObj.DEMO1) {
    $('.demo').text(request)
  }
})
