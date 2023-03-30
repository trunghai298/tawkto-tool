const openBtn = document.getElementById("openChat");
const closeBtn = document.getElementById("closeChat");
const endBtn = document.getElementById("endChat");
const sendMsgBtn = document.getElementById("sendMsg");
const sendEmoji = document.getElementById("sendEmoji");
const newConvBtn = document.getElementById("newConv");
const autoSendEmojiBtn = document.getElementById("autoSendEmoji");

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

openBtn.addEventListener("click", async () => {
  const tab = await getCurrentTab();

  await chrome.scripting.executeScript({
    func: toggleChat,
    target: {
      tabId: tab.id,
    },
    world: "MAIN",
  });
});

closeBtn.addEventListener("click", async () => {
  const tab = await getCurrentTab();
  await chrome.scripting.executeScript({
    func: closeChat,
    target: {
      tabId: tab.id,
    },
    world: "MAIN",
  });
});

endBtn.addEventListener("click", async () => {
  console.log("close tab and end conversation");
  const tab = await getCurrentTab();
  await chrome.scripting.executeScript({
    func: endChat,
    target: {
      tabId: tab.id,
    },
    world: "MAIN",
  });
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("start new conversation");
  newConvBtn.addEventListener("click", async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { message: "startNewConversation" });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  sendMsgBtn.addEventListener("click", async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { message: "sendMsg" });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("send message");
  sendMsgBtn.addEventListener("click", async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { message: "sendMsg" });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("send emoji");
  sendEmoji.addEventListener("click", async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { message: "sendEmoji" });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  autoSendEmojiBtn.addEventListener("click", async () => {
    console.log("send auto");
    setInterval(() => {
      console.log("send emoji interval");
      sendEmoji.addEventListener("click", async () => {
        const tab = await getCurrentTab();
        chrome.tabs.sendMessage(tab.id, { message: "sendEmoji" });
      });
    }, 1000);
  });
});

function toggleChat() {
  console.log("open chat");
  window.Tawk_API.toggle();
}

function closeChat() {
  console.log("close chat");
  window.Tawk_API.toggle();
}

function endChat() {
  console.log("end chat");
  window.Tawk_API.endChat();
}
