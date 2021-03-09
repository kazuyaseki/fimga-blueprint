import { createAutoLayoutFrame, createFrame, createLine, createTextNode } from "./figmaFactory";

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
      }
    ]
  },{
    title: "Form",
    options: [{
      key: "textInput",
      title: "Text Input"
    },
    {
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

function appendChildern(node: FrameNode, children: SceneNode[]) {
  children.forEach((child) => {
    node.appendChild(child)
  })
}

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
  buttonGroups: async () => {
    const text1 = await createTextNode({})
    const button1 = createAutoLayoutFrame({name: "Button", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 16})
    button1.appendChild(text1)

    const line1 = createLine({widthPx: 30, vertical: true})

    const text2 = await createTextNode({})
    const button2 = createAutoLayoutFrame({name: "Button", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 16})
    button2.appendChild(text2)

    const line2 = createLine({widthPx: 30, vertical: true})

    const text3 = await createTextNode({})
    const button3 = createAutoLayoutFrame({name: "Button", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 16})
    button3.appendChild(text3)

    const groupFrame = createAutoLayoutFrame({name: "ButtonGroup", cornerRadius: 4, itemSpacing: 0})
    groupFrame.appendChild(button1)
    groupFrame.appendChild(line1)
    groupFrame.appendChild(button2)
    groupFrame.appendChild(line2)
    groupFrame.appendChild(button3)

    return groupFrame
  },
  textInput: async () => {
    const text = await createTextNode({color: {r: 153 / 255, g: 153 / 255, b: 153 / 255}, initialCharacter: "Placeholder..."})
    const frame = createAutoLayoutFrame({name: "Text Input", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 12, cornerRadius: 4, itemSpacing: 8, widthPx: 320, strokeColor: {r: 220 / 255, g: 220 / 255, b: 220 / 255}})
    frame.appendChild(text)

    return frame
  },
  textInputWithLabelAndError: async () => {
    const labelText = await createTextNode({initialCharacter: "Label", fontSize: 12})
    
    const spacer16 = createFrame({name: "Spacer", size: 8})

    const placeholderText = await createTextNode({color: {r: 153 / 255, g: 153 / 255, b: 153 / 255}, initialCharacter: "Placeholder..."})
    const inputFrame = createAutoLayoutFrame({name: "Text Input", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 12, cornerRadius: 4, itemSpacing: 8, widthPx: 320, strokeColor: {r: 220 / 255, g: 220 / 255, b: 220 / 255}})
    inputFrame.appendChild(placeholderText)

    const spacer8 = createFrame({name: "Spacer", size: 4})

    const errorText = await createTextNode({initialCharacter: "error message!!", color: {r: 244 / 255, g: 67 / 255, b: 54 / 255}, fontSize: 11})

    const containerFrame = createAutoLayoutFrame({name: "Text Input with Label and Error",isVertical: true})

    appendChildern(containerFrame, [labelText, spacer16, inputFrame, spacer8, errorText])

    return containerFrame
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
