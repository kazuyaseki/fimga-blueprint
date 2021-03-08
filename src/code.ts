import { createAutoLayoutFrame, createTextNode } from "./figmaFactory";

figma.showUI(__html__, { height: 320 });

const optionGroups = [
  {
    title: "button",
    options: [
      {
        key: "button",
        title: "button",
      }
    ]
  }
]

const onCreate = {
  button: async () => {
    const text = await createTextNode({})
    const frame = createAutoLayoutFrame({name: "button", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 16, cornerRadius: 4})
    frame.appendChild(text)

    return frame
  }
}

figma.ui.postMessage(optionGroups);

figma.ui.onmessage = async (msg) => {
  if (msg.type === "run") {
    const node = await onCreate[msg.data]()

    figma.currentPage.appendChild(node);
    figma.currentPage.selection = [node];
  }
};
