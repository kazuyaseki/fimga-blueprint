import { createAutoLayoutFrame, createFrame, createTextNode } from "./figmaFactory";

figma.showUI(__html__, { height: 320 });

const optionGroups = [
  {
    title: "button",
    options: [
      {
        key: "button",
        title: "button",
      },{
        key: "buttonWithIcon",
        title: "button with icon",
      }
    ]
  }
]

const onCreate = {
  button: async () => {
    const text = await createTextNode({})
    const frame = createAutoLayoutFrame({name: "Button", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 16, cornerRadius: 4})
    frame.appendChild(text)

    return frame
  },
  buttonWithIcon: async () => {
    const text = await createTextNode({})
    const iconFrame = createFrame({name: "Icon", size: 16})
    const frame = createAutoLayoutFrame({name: "Button with Icon", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 16, cornerRadius: 4, itemSpacing: 8})
    frame.appendChild(iconFrame)
    frame.appendChild(text)

    return frame
  },
}

figma.ui.postMessage(optionGroups);

figma.ui.onmessage = async (msg) => {
  if (msg.type === "run") {
    const node = await onCreate[msg.data]()

    figma.currentPage.appendChild(node);
    figma.currentPage.selection = [node];
  }
};
