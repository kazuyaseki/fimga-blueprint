import { createAutoLayoutFrame, createFrame, createTextNode } from "./figmaFactory";

figma.showUI(__html__, { height: 320 });

const optionGroups = [
  {
    title: "Action",
    options: [
      {
        key: "button",
        title: "button",
      },{
        key: "buttonWithIcon",
        title: "button with icon",
      },{
        key: "buttonGroups",
        title: "buttonGroups",
      },{
        key: "dropzone",
        title: "Dropzone",
      }
    ]
  },{
    title: "Form",
    options: [{
      key: "textInput",
      title: "Text Input"
    },{
      key: "textInputWithIcon",
      title: "Text Input with Icon"
    },{
      key: "textInputWithLabel",
      title: "Text Input with Label"
    },{
      key: "textInputWithLabelAndError",
      title: "Text Input with Label and Error"
    },{
      key: "checkboxWithLabel",
      title: "Checkbox with Label"
    },{
      key: "radioWithLabel",
      title: "Radio with Label"
    },{
      key: "select",
      title: "Select",
    }]
  },{
    title: "Structure",
    options: [
      {
        key: "Card",
        title: "Card with image and paragraphs horizontal",
      },{
        key: "Card",
        title: "Card with image and paragraphs vertical",
      },{
        key: "empty",
        title: "Empty  State",
      },{
        key: "topNavigation",
        title: "Top Navigation",
      },{
        key: "dataTable",
        title: "Data Table",
      },{
        key: "descriptionList",
        title: "Description List",
      },{
        key: "dropdown",
        title: "Dropdown",
      }
    ]
  },{
    title: "Indicators",
    options: [
      {
        key: "iconWithBadge",
        title: "Icon with Badge",
      },{
        key: "banner",
        title: "Icon with Badge",
      },{
        key: "progressBar",
        title: "Progress Bar",
      },{
        key: "toast",
        title: "Toast",
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
