/// <reference path="../node_modules/@types/chrome/index.d.ts" />
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="./MESSAGE.ts" />

function create(createProperties: chrome.tabs.CreateProperties): Promise<chrome.tabs.Tab> {
  return new Promise((resolve) => {
    chrome.tabs.create(createProperties, (tab) => {
      resolve(tab)
    })
  })
}

function query(queryInfo: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> {
  return new Promise((resolve) => {
    chrome.tabs.query(queryInfo, (tabs) => {
      resolve(tabs)
    })
  })
}

function sendMessage(tabId: number, message: any): Promise<any> {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, message, (response) => resolve(response))
  })
}

const asyncTabs = {
  create,
  query,
  sendMessage,
}

// 信息发送
$('.send-msg').on('click', async function() {
  const $this = $(this)

  try {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, msgObj.DEMO2)
    })
  } catch (error) {
    console.log(error)
  }
})

// 创建空白标签
$('.create-empty-tag').on('click', () => {
  chrome.tabs.create({})
})

// 在末尾创建空白标签
$('.create-empty-tag-last').on('click', async () => {
  chrome.tabs.query({}, (tabs) => {
    chrome.tabs.create({ index: tabs.length })
  })
})

// url非空白标签
$('.create-tag-from-url').on('click', () => {
  chrome.tabs.create({ url: chrome.extension.getURL('view/tag.html') })
})

// async wait
$('.create-tag-from-url-async').on('click', async () => {
  const tab = await asyncTabs.create({ url: chrome.extension.getURL('view/tag.html') })
})

// 接收信息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === msgObj.DEMO1) {
    $('.send-msg').text(request)
  }
})
