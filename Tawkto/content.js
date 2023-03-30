function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file_path);
  node.appendChild(script);
  console.log("injected");
}

injectScript(chrome.runtime.getURL("content.js"), "body");

function getDOMele() {
  const sendBtn = document.getElementsByClassName("tawk-chatinput-send");
  console.log(sendBtn);
}

// setInterval(() => {
chrome.runtime.sendMessage({ message: "getSendButton" }, (response) => {
  console.log("response", response);
  if (response.message === "success") {
    console.log("success receive msg from bg");
  }
});
// }, 1000);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "startNewConversation") {
    sendResponse("start get elem");
    const widget = document.getElementsByClassName("widget-visible");
    const secondIframe = widget[0].getElementsByTagName("iframe")[1];
    const buttons =
      secondIframe.contentWindow.document.body.getElementsByClassName(
        "tawk-button"
      );
    buttons[2].click();
  }

  if (request.message === "sendMsg") {
    sendResponse("start get elem");
    const widget = document.getElementsByClassName("widget-visible");
    const secondIframe = widget[0].getElementsByTagName("iframe")[1];
    const buttons =
      secondIframe.contentWindow.document.body.getElementsByClassName(
        "tawk-chatinput-button"
      );
    const sendMsgButton =
      secondIframe.contentWindow.document.body.getElementsByClassName(
        "tawk-chatinput-send"
      );
    const emojiButton = buttons[5];
    if (sendMsgButton) {
      sendMsgButton[0].click();
    }
    if (emojiButton) {
      emojiButton.click();
    } else {
      console.log(sendMsgButton);
    }
  }

  if (request.message === "sendEmoji") {
    sendResponse("start get elem");
    const widget = document.getElementsByClassName("widget-visible");
    const secondIframe = widget[0].getElementsByTagName("iframe")[1];
    const emojis =
      secondIframe.contentWindow.document.body.getElementsByClassName(
        "tawk-emoji"
      );

    emojis[Math.floor(Math.random() * 6) + 1].click();

    setTimeout(() => {
      const sendMsgButton =
        secondIframe.contentWindow.document.body.getElementsByClassName(
          "tawk-chatinput-send"
        );
      if (sendMsgButton) {
        sendMsgButton[0].click();
      }
    }, [500]);
  }
});
