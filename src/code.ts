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
    },
    {
      key: "checkboxWithLabel",
      title: "Checkbox with Label"
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
  checkboxWithLabel: async () => {
    const checkboxVector = figma.createNodeFromSvg(`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.75 0.75H1.25C0.973437 0.75 0.75 0.973437 0.75 1.25V12.75C0.75 13.0266 0.973437 13.25 1.25 13.25H12.75C13.0266 13.25 13.25 13.0266 13.25 12.75V1.25C13.25 0.973437 13.0266 0.75 12.75 0.75ZM9.86719 4.71406L6.57656 9.27656C6.53057 9.34076 6.46994 9.39306 6.3997 9.42914C6.32946 9.46523 6.25162 9.48405 6.17266 9.48405C6.09369 9.48405 6.01586 9.46523 5.94561 9.42914C5.87537 9.39306 5.81474 9.34076 5.76875 9.27656L3.82031 6.57656C3.76094 6.49375 3.82031 6.37813 3.92188 6.37813H4.65469C4.81406 6.37813 4.96562 6.45469 5.05937 6.58594L6.17188 8.12969L8.62813 4.72344C8.72188 4.59375 8.87187 4.51562 9.03281 4.51562H9.76562C9.86719 4.51562 9.92656 4.63125 9.86719 4.71406V4.71406Z" fill="#666"/>
    </svg>`)

    const labelText = await createTextNode({initialCharacter: "Label", fontSize: 12})

    const containerFrame = createAutoLayoutFrame({name: "Checkbox with Label",itemSpacing: 8})

    appendChildern(containerFrame, [checkboxVector, labelText])

    return containerFrame
  },
  select: async () => {
    const labelText = await createTextNode({initialCharacter: "Select text"})
    const chevronVector = figma.createNodeFromSvg(`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4.5L6 8.5L10 4.5" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`)
    chevronVector.constraints = {horizontal: "MAX", vertical: "MIN"}

    const containerFrame = createFrame({name: "Select", widthPx: 240, heightPx: 40, strokeColor: {r: 204 / 255, g: 204 / 255, b: 204 / 255}, cornerRadius: 4})
    labelText.x = 16
    labelText.y = 12
    chevronVector.x = 212
    chevronVector.y = 14

    appendChildern(containerFrame, [labelText, chevronVector])

    return containerFrame
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
