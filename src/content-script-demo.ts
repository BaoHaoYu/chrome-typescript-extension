/// <reference path="../node_modules/@types/chrome/index.d.ts" />
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="./MESSAGE.ts" />

console.log('content-script-demo')
const $btn = $('<button>')
  .text('demo')
  .css({ height: '60px' })
  .css({ width: '300px' })
  .on('click', () => {
    chrome.runtime.sendMessage(msgObj.DEMO1)
  })
$('#s_fm')
  .empty()
  .append($btn)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === msgObj.DEMO2) {
    $btn.text(request)
  }
})
