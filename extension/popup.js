console.log('popup.js loaded');
const copySessionButton = document.getElementById('copySession');
const settingsButton = document.getElementById('settings');
const urlInput = document.getElementById('url');
const settingsDialog = document.getElementById('settings-dialog');
const closeSettings = document.getElementById('close-settings');
const saveSettings = document.getElementById('save-settings');
const countSpen = document.getElementById('count');
const domainSpen = document.getElementById('domain');
const tagsInput = document.getElementById('tags');
const saveSession = document.getElementById('save-session');
let cookies = null;

const displaySettingsPopup = (url) => {
  settingsDialog.style.display = 'block';
  settingsDialog.style.opacity = '1';
  copySessionButton.disabled = true;
  settingsButton.disabled = true;
  urlInput.value = url;
  if (url !== '') {
    closeSettings.disabled = false;
  } else {
    closeSettings.disabled = true;
  }
};

const closeSettingsPopup = (save) => {
  settingsDialog.style.display = 'none';
  settingsDialog.style.opacity = '0';
  copySessionButton.disabled = false;
  settingsButton.disabled = false;
  if (save) {
    chrome.storage.sync.set({ url: urlInput.value }, () => {
      console.log('url saved');
    });
  }
};

closeSettings.addEventListener('click', () => {
  closeSettingsPopup(false);
});
saveSettings.addEventListener('click', () => {
  closeSettingsPopup(true);
});

urlInput.addEventListener('input', () => {
  if (urlInput.value.length > 0) {
    saveSettings.disabled = false;
  } else {
    saveSettings.disabled = true;
  }
});

tagsInput.addEventListener('input', () => {
  console.log('tagsInput.value:', tagsInput.value, this.cookies);
  if (tagsInput.value.length > 0 && this.cookies !== null) {
    saveSession.disabled = false;
  } else {
    saveSession.disabled = true;
  }
});

settingsButton.addEventListener('click', () => {
  chrome.storage.sync.get(['url'], (result) => {
    displaySettingsPopup(result.url);
  });
});

let showSettings = true;
let url = '';
chrome.storage.sync.get(['url'], function (item) {
  if (item && item.url && item.url !== '') {
    console.log('item.url is not empty', item.url);
    url = item.url;
    this.showSettings = false;
  } else {
    this.showSettings = true;
    displaySettingsPopup('');
  }
});
console.log(showSettings, url);

// chrome.storage.sync.get('color', ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

copySessionButton.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  console.log('active tab', tab);
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   function: setPageBackgroundColor,
  // });
  chrome.cookies.getAll({ url: tab.url }, (_cookies) => {
    //console.log('cookies', cookies);
    let domain = null;
    _cookies.forEach((cookie) => {
      domain = cookie.domain;
    });
    //console.log('cookieString', cookieString);
    this.cookies = _cookies;
    countSpen.innerText = _cookies.length;
    domainSpen.innerText = domain;
  });
});
saveSession.addEventListener('click', () => {
  storeSession();
});
const storeSession = () => {
  chrome.storage.sync.get(['url'], (result) => {
    const data = {
      tags: tagsInput.value.split(','),
      cookies: this.cookies,
      createdAt: new Date().toISOString(),
    };
    fetch(`${result.url}/api/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log('Request complete! response:', res);
    });
    this.cookies = null;
    countSpen.innerText = 0;
    domainSpen.innerText = '';
    tagsInput.value = '';
    saveSession.disabled = true;
  });
};
