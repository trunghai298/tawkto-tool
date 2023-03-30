chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var activeTab = tabs[0];
  console.log(activeTab);
});

chrome.runtime.onMessage.addListener((message, sender, sendRespone) => {
  console.log(message, sender);
  if (message.message === "getSendButton") {
    console.log("send message back to content");
    sendRespone({ message: "success" });
  }
});
