// background.js or content.js (where you manage your listeners)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'someAction') {
      // Handle async operation
      someAsyncFunction().then((result) => {
        sendResponse({ success: true, data: result });
      }).catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
  
      return true;  // Ensures async response is sent later
    }
  });
  