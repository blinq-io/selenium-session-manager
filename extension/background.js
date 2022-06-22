console.log('background.js loaded');
chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome onInstalled event was triggered');
});
