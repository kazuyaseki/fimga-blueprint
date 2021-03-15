import { base64Images } from "./base64Images";
import { createAutoLayoutFrame, createFrame, createLine, createTextNode } from "./figmaFactory";

figma.showUI(__html__, { height: 480, width: 600 });

const FIGMA_COLOR = { r: 0, g: 158 / 255, b: 254 / 255 }

const optionGroups = [
  {
    title: "Action",
    options: [
      {
        key: "button",
        title: "button",
        imageData: base64Images.button
      },{
        key: "buttonWithIcon",
        title: "button with icon",
        imageData: base64Images.buttonWithIcon
      },{
        key: "buttonGroups",
        title: "Button Groups",
        imageData: base64Images.buttonGroups
      }
    ]
  },{
    title: "Form",
    options: [{
      key: "textInput",
      title: "Text Input",
      imageData: base64Images.button
    },{
      key: "textInputWithIcon",
      title: "Text Input with Icon",
      imageData: base64Images.button
    },
    {
      key: "textInputWithLabelAndError",
      title: "Text Input with Label",
      imageData: base64Images.button
    },
    {
      key: "checkboxWithLabel",
      title: "Checkbox",
      imageData: base64Images.button
    },{
      key: "select",
      title: "Select",
      imageData: base64Images.button
    },{
      key: "dropdown",
      title: "Dropdown",
      imageData: base64Images.button
    }]
  },{
    title: "Layout",
    options: [
      {
        key: "card",
        title: "Card",
        imageData: base64Images.button
      },{
        key: "topNavigation",
        title: "Top Navigation",
        imageData: base64Images.button
      },{
        key: "topNavigationSp",
        title: "Top Navigation SP",
        imageData: base64Images.button
      },{
        key: "sideNavigation",
        title: "Side Navigation",
        imageData: base64Images.button
      },{
        key: "listItem",
        title: "List Item",
        imageData: base64Images.button
      },{
        key: "dataTable",
        title: "Data Table",
        imageData: base64Images.button
      },{
        key: "descriptionList",
        title: "Description List",
        imageData: base64Images.button
      },{
        key: "tabs",
        title: "tabs",
        imageData: base64Images.button
      },{
        key: "empty",
        title: "Empty State",
        imageData: base64Images.empty
      }
    ]
  },{
    title: "Indicators",
    options: [
      {
        key: "banner",
        title: "banner",
        imageData: base64Images.button
      },{
        key: "toast",
        title: "Toast",
        imageData: base64Images.button
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
    const frame = createAutoLayoutFrame({name: "Button", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 16, cornerRadius: 4, strokeColor: generateGrayColor(204)})
    frame.appendChild(text)

    return frame
  },
  buttonWithIcon: async () => {
    const text = await createTextNode({})
    const infoVector = figma.createNodeFromSvg(infoSvgString)
    infoVector.resize(16, 16)
    const frame = createAutoLayoutFrame({name: "Button with Icon", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 16, cornerRadius: 4, itemSpacing: 8, alignItemsCenter: true, strokeColor: generateGrayColor(204)})
    frame.appendChild(infoVector)
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

    const groupFrame = createAutoLayoutFrame({name: "ButtonGroup", cornerRadius: 4, itemSpacing: 0, strokeColor: generateGrayColor(204)})
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
  textInputWithIcon: async () => {
    const searchVector = figma.createNodeFromSvg(searchSvgString)
    const text = await createTextNode({color: {r: 153 / 255, g: 153 / 255, b: 153 / 255}, initialCharacter: "Placeholder..."})
    const frame = createAutoLayoutFrame({name: "Text Input", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 12, cornerRadius: 4, itemSpacing: 8, widthPx: 320, strokeColor: generateGrayColor(220), alignItemsCenter: true})
    appendChildern(frame, [searchVector, text])

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
  },
  card: async () => {
    const imageFrame = createFrame({name: "Image", widthPx: 335, heightPx: 180, fillColor: generateGrayColor(204)})

    const titleText = await createTextNode({initialCharacter: "Title", fontSize: 18, style: "Bold"})
    const descriptionText = await createTextNode({initialCharacter: "Description", color: generateGrayColor(102)})
    const detailFrame = createAutoLayoutFrame({name: "Card Detail", isVertical: true, itemSpacing: 4, paddingTopAndBottomPx: 24, paddingLeftAndRightPx: 20})
    appendChildern(detailFrame, [titleText, descriptionText])

    const containerFrame = createAutoLayoutFrame({name: "Card", isVertical: true, itemSpacing: 0, cornerRadius: 8})
    appendChildern(containerFrame, [imageFrame, detailFrame])
  },
  topNavigation: async () => {
    const logo = figma.createNodeFromSvg(figmaSvgString)
    const logoText = await createTextNode({ initialCharacter: "Figma", style: "Bold" })
    const logoFrame = createAutoLayoutFrame({name: "Logo", itemSpacing: 8, alignItemsCenter: true})
    appendChildern(logoFrame, [logo, logoText])

    async function getLinkNode(text: string) {
      const textNode = await createTextNode({ initialCharacter: text })
      const frame = createAutoLayoutFrame({name: `Link ${text}`, itemSpacing: 8, paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 20})
      frame.appendChild(textNode)

      return frame
    }
    const link1 = await getLinkNode("About")
    const link2 = await getLinkNode("Contaxt")
    const link3 = await getLinkNode("Explore")
    const linksFrame = createAutoLayoutFrame({name: "Links"})
    appendChildern(linksFrame, [link1, link2, link3])

    const logoAndLinksFrame = createAutoLayoutFrame({name: "Logo And Actions", itemSpacing: 24})
    appendChildern(logoAndLinksFrame, [logoFrame, linksFrame])

    const buttonFrame = await getLinkNode("Click")
    buttonFrame.cornerRadius = 4
    buttonFrame.fills = [{ type: "SOLID", color: generateGrayColor(204) }]
    const userVector = figma.createNodeFromSvg(userSvgString)
    userVector.resize(24, 24)
    const actionsFrame = createAutoLayoutFrame({name: "Actions", itemSpacing: 8, alignItemsCenter: true})
    appendChildern(actionsFrame, [buttonFrame, userVector])
    
    const containerFrame = createAutoLayoutFrame({ name: "Top Navigation", widthPx: 1040, paddingLeftAndRightPx: 20, paddingTopAndBottomPx: 12, spaceBetween: true })
    appendChildern(containerFrame, [logoAndLinksFrame, actionsFrame])

    return containerFrame
  },
  topNavigationSp: async () => {
    const backVector = figma.createNodeFromSvg(chevronLeftSvgString)
    backVector.resize(24, 24)
    const textNode = await createTextNode({ initialCharacter: "Page Title", style: "Bold", fontSize: 16 })
    const hamburgerVector = figma.createNodeFromSvg(hamburgerSvgString)
    hamburgerVector.resize(24, 24)

    const containerFrame = createAutoLayoutFrame({ name: "Top Navigation SP", widthPx: 375, paddingLeftAndRightPx: 20, paddingTopAndBottomPx: 12, spaceBetween: true, alignItemsCenter: true })
    appendChildern(containerFrame, [backVector,textNode,  hamburgerVector])

    return containerFrame
  },
  sideNavigation: async () => {
    async function getRowFrame() {
      const userVector = figma.createNodeFromSvg(userSvgString)
      userVector.resize(24, 24)
      const text = await createTextNode({initialCharacter: "Title"})
      const rowFrame = createAutoLayoutFrame({name: "Sidenavi Item", itemSpacing: 8, alignItemsCenter: true})
      appendChildern(rowFrame, [userVector, text])
      
      return rowFrame
    }
    const row1 = await getRowFrame()
    const row2 = await getRowFrame()
    const row3 = await getRowFrame()
    const row4 = await getRowFrame()
    const row5 = await getRowFrame()

    const sidenaviFrame = createAutoLayoutFrame({name: "Sidenavi", isVertical: true, itemSpacing: 8, widthPx: 240, paddingLeftAndRightPx: 20, paddingTopAndBottomPx: 20})
    appendChildern(sidenaviFrame, [row1, row2, row3, row4, row5])

    return sidenaviFrame
  } ,
  listItem: async () => {
    const userVector = figma.createNodeFromSvg(userSvgString)

    const titleText = await createTextNode({initialCharacter: "Title"})
    const descriptionText = await createTextNode({initialCharacter: "Description", color: generateGrayColor(102)})
    const rightContentFrame = createAutoLayoutFrame({name: "Right Item", isVertical: true, itemSpacing: 4})
    appendChildern(rightContentFrame, [titleText, descriptionText])

    const containerFrame = createAutoLayoutFrame({name: "List Item",itemSpacing: 8, widthPx: 335, paddingLeftAndRightPx: 12, paddingTopAndBottomPx: 8})
    appendChildern(containerFrame, [userVector, rightContentFrame])
  } ,
  dataTable: async () => {
    const CONTAINER_WIDTH_PX = 560

    async function getRowFrame(name: string, price: string, quantity: string, netSales: string, isHeader?: boolean) {
      const nameText = await createTextNode({initialCharacter: name, style: isHeader ? "Regular" : "Bold", widthPx: 240})
      const priceText = await createTextNode({initialCharacter: price, widthPx: 80})
      const quantityText = await createTextNode({initialCharacter: quantity, widthPx: 80})
      const netSalesText = await createTextNode({initialCharacter: netSales, widthPx: 80})
      const rowFrame = createAutoLayoutFrame({name: "DataTable Row", paddingTopAndBottomPx: 16, paddingLeftAndRightPx: 20, itemSpacing: 8})
      appendChildern(rowFrame, [nameText, priceText, quantityText, netSalesText])
      
      return rowFrame
    }
    const headerRow = await getRowFrame("Product", "Price", "Quantity", "Net Sales", true)
    const headerLine = createLine({ widthPx: CONTAINER_WIDTH_PX, stretch: true, strokeColor: generateGrayColor(102) })

    const row1 = await getRowFrame("Apple Cider", "$125.00", "25", "$3125.00")
    const line1 = createLine({ widthPx: CONTAINER_WIDTH_PX, stretch: true })
    const row2 = await getRowFrame("Apple Cider", "$125.00", "25", "$3125.00")
    const line2 = createLine({ widthPx: CONTAINER_WIDTH_PX, stretch: true })
    const row3 = await getRowFrame("Apple Cider", "$125.00", "25", "$3125.00")

    const descriptionListFrame = createAutoLayoutFrame({name: "DataTable", isVertical: true, cornerRadius: 8})
    appendChildern(descriptionListFrame, [headerRow, headerLine, row1, line1, row2, line2, row3])

    return descriptionListFrame
  } ,
  descriptionList: async () => {
    const LIST_WIDTH_PX = 540
    const PADDING_PX = 20
    const TITLE_WIDTH_PX = 120
    const DESCRIPTION_WIDTH_PX = LIST_WIDTH_PX - PADDING_PX * 2 - TITLE_WIDTH_PX

    async function getRowFrame() {
      const title = await createTextNode({initialCharacter: "Title", widthPx: TITLE_WIDTH_PX, style: "Bold"})
      const description = await createTextNode({initialCharacter: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ", widthPx: DESCRIPTION_WIDTH_PX})
      const rowFrame = createAutoLayoutFrame({name: "Description List Item"})
      appendChildern(rowFrame, [title, description])
      
      return rowFrame
    }
    const row1 = await getRowFrame()
    const line1 = createLine({ widthPx: LIST_WIDTH_PX - PADDING_PX * 2 })
    const row2 = await getRowFrame()
    const line2 = createLine({ widthPx: LIST_WIDTH_PX - PADDING_PX * 2 })
    const row3 = await getRowFrame()

    const descriptionListFrame = createAutoLayoutFrame({name: "DescriptionList", isVertical: true, itemSpacing: 8, widthPx: LIST_WIDTH_PX, paddingLeftAndRightPx: PADDING_PX, paddingTopAndBottomPx: PADDING_PX})
    appendChildern(descriptionListFrame, [row1, line1, row2, line2, row3])

    return descriptionListFrame
  } ,
  tabs: async () => {
    async function getTabFrame(props: {title: string, isActive?: boolean}) {
      const title = await createTextNode({initialCharacter: props.title, style: props.isActive ? "Bold" : "Regular", color: props.isActive ? undefined : generateGrayColor(155)})
      const rowFrame = createAutoLayoutFrame({name: "Tab", paddingLeftAndRightPx: 20, paddingTopAndBottomPx: 12})
      appendChildern(rowFrame, [title])
      
      return rowFrame
    }

    const tab1 = await getTabFrame({ title: "Design", isActive: true })
    const tab2 = await getTabFrame({title: "Prototype"})
    const tab3 = await getTabFrame({ title: "Inspect" })
    const tabsContainerFrame = createAutoLayoutFrame({name: "TabsContainer"})
    appendChildern(tabsContainerFrame, [tab1, tab2, tab3])
    const line = createLine({ widthPx: 78, strokeColor: FIGMA_COLOR, strokeHeight: 2 })

    const tabFrame = createAutoLayoutFrame({name: "Tabs", isVertical: true})
    appendChildern(tabFrame, [tabsContainerFrame, line])

    return tabFrame
  } ,
  empty: async () => {
    const emptyVector = figma.createNodeFromSvg(emptySvgString)
    emptyVector.resize(80, 80)

    const messageText = await createTextNode({initialCharacter: "You have no message", fontSize: 16, style: "Bold"})
    const subMessageText = await createTextNode({initialCharacter: "Let's get started with Messaging with your friends!", color: generateGrayColor(70)})

    const text = await createTextNode({})
    const buttonFrame = createAutoLayoutFrame({name: "Button", paddingTopAndBottomPx: 8, paddingLeftAndRightPx: 16, cornerRadius: 4, backgroundColor: generateGrayColor(204)})
    buttonFrame.appendChild(text)

    const containerFrame = createAutoLayoutFrame({ name: "Empty State", widthPx: 480, paddingTopAndBottomPx: 60, strokeColor: generateGrayColor(204), cornerRadius: 8, itemSpacing: 20, isVertical: true, alignItemsCenter: true })
    appendChildern(containerFrame, [emptyVector, messageText, subMessageText, buttonFrame])

    return containerFrame
  } ,
  banner: async () => {
    const infoVector = figma.createNodeFromSvg(infoSvgString)
    infoVector.resize(20, 20)

    const titleText = await createTextNode({initialCharacter: "Order archived", style: "Bold", fontSize: 16})
    const descriptionText =  await createTextNode({initialCharacter: "This order was archived on March 7, 2020"})
    const textsFrame = createAutoLayoutFrame({name: "Links", isVertical: true, itemSpacing: 8})
    appendChildern(textsFrame, [titleText, descriptionText])

    const iconAndTexts = createAutoLayoutFrame({name: "Icon And Texts", itemSpacing: 12})
    appendChildern(iconAndTexts, [infoVector, textsFrame])

    const closeVector = figma.createNodeFromSvg(closeBlackSvgString)
    closeVector.resize(20, 20)
    
    const containerFrame = createAutoLayoutFrame({ name: "Banner", widthPx: 600, paddingLeftAndRightPx: 20, paddingTopAndBottomPx: 20, spaceBetween: true, strokeColor: generateGrayColor(204), cornerRadius: 8 })
    appendChildern(containerFrame, [iconAndTexts, closeVector])

    return containerFrame
  },
  toast: async () => {
    const text = await createTextNode({color: generateGrayColor(255), initialCharacter: "Message Sent"})
    const frame = createAutoLayoutFrame({name: "Toast", paddingTopAndBottomPx: 12, paddingLeftAndRightPx: 12, cornerRadius: 4, itemSpacing: 8, strokeColor: generateGrayColor(220), alignItemsCenter: true, backgroundColor: generateGrayColor(51)})
    const closeVector = figma.createNodeFromSvg(closeSvgString)
    appendChildern(frame, [text, closeVector])

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

function  generateGrayColor(val: number): RGB {
  return { r: val / 255, g: val / 255, b: val / 255 }
}

const userSvgString = `r
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.749 24.93C28.1851 23.2021 29.184 21.1537 29.661 18.9582C30.1381 16.7626 30.0793 14.4845 29.4897 12.3164C28.9001 10.1484 27.797 8.15423 26.2737 6.50268C24.7504 4.85112 22.8517 3.59075 20.7383 2.82818C18.6248 2.06561 16.3588 1.82328 14.132 2.12168C11.9051 2.42008 9.78282 3.25043 7.94471 4.5425C6.10661 5.83457 4.60674 7.55034 3.57199 9.54467C2.53723 11.539 1.99803 13.7532 2 16C2.00075 19.2662 3.15174 22.4278 5.251 24.93L5.231 24.947C5.301 25.031 5.381 25.103 5.453 25.186C5.543 25.289 5.64 25.386 5.733 25.486C6.013 25.79 6.301 26.082 6.603 26.356C6.695 26.44 6.79 26.518 6.883 26.598C7.203 26.874 7.532 27.136 7.873 27.38C7.917 27.41 7.957 27.449 8.001 27.48V27.468C10.3431 29.1162 13.1371 30.0007 16.001 30.0007C18.8649 30.0007 21.6589 29.1162 24.001 27.468V27.48C24.045 27.449 24.084 27.41 24.129 27.38C24.469 27.135 24.799 26.874 25.119 26.598C25.212 26.518 25.307 26.439 25.399 26.356C25.701 26.081 25.989 25.79 26.269 25.486C26.362 25.386 26.458 25.289 26.549 25.186C26.62 25.103 26.701 25.031 26.771 24.946L26.749 24.93ZM16 8C16.89 8 17.76 8.26392 18.5001 8.75838C19.2401 9.25285 19.8169 9.95566 20.1575 10.7779C20.4981 11.6002 20.5872 12.505 20.4135 13.3779C20.2399 14.2508 19.8113 15.0526 19.182 15.682C18.5526 16.3113 17.7508 16.7399 16.8779 16.9135C16.005 17.0872 15.1002 16.998 14.2779 16.6575C13.4557 16.3169 12.7529 15.7401 12.2584 15.0001C11.7639 14.26 11.5 13.39 11.5 12.5C11.5 11.3065 11.9741 10.1619 12.818 9.31802C13.6619 8.4741 14.8065 8 16 8V8ZM8.007 24.93C8.02435 23.617 8.55795 22.3636 9.49236 21.4409C10.4268 20.5183 11.6869 20.0007 13 20H19C20.3131 20.0007 21.5732 20.5183 22.5076 21.4409C23.4421 22.3636 23.9757 23.617 23.993 24.93C21.7998 26.9063 18.9523 28.0001 16 28.0001C13.0477 28.0001 10.2002 26.9063 8.007 24.93V24.93Z" fill="#666"/>
</svg>
`

const figmaSvgString = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z" fill="#19BCFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 24C9.06087 24 10.0783 23.5786 10.8284 22.8284C11.5786 22.0783 12 21.0609 12 20V16H8C6.93913 16 5.92172 16.4214 5.17157 17.1716C4.42143 17.9217 4 18.9391 4 20C4 21.0609 4.42143 22.0783 5.17157 22.8284C5.92172 23.5786 6.93913 24 8 24V24Z" fill="#09CF83"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 16H12V8H8C6.93913 8 5.92172 8.42143 5.17157 9.17157C4.42143 9.92172 4 10.9391 4 12C4 13.0609 4.42143 14.0783 5.17157 14.8284C5.92172 15.5786 6.93913 16 8 16V16Z" fill="#A259FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 8H12V0H8C6.93913 0 5.92172 0.421427 5.17157 1.17157C4.42143 1.92172 4 2.93913 4 4C4 5.06087 4.42143 6.07828 5.17157 6.82843C5.92172 7.57857 6.93913 8 8 8V8Z" fill="#F24E1E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8H12V0H16C17.0609 0 18.0783 0.421427 18.8284 1.17157C19.5786 1.92172 20 2.93913 20 4C20 5.06087 19.5786 6.07828 18.8284 6.82843C18.0783 7.57857 17.0609 8 16 8Z" fill="#FF7262"/>
</svg>
`

const hamburgerSvgString = `
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 3C1.36739 3 1.24021 3.05268 1.14645 3.14645C1.05268 3.24021 1 3.36739 1 3.5C1 3.63261 1.05268 3.75979 1.14645 3.85355C1.24021 3.94732 1.36739 4 1.5 4H13.5C13.6326 4 13.7598 3.94732 13.8536 3.85355C13.9473 3.75979 14 3.63261 14 3.5C14 3.36739 13.9473 3.24021 13.8536 3.14645C13.7598 3.05268 13.6326 3 13.5 3H1.5ZM1 7.5C1 7.36739 1.05268 7.24021 1.14645 7.14645C1.24021 7.05268 1.36739 7 1.5 7H13.5C13.6326 7 13.7598 7.05268 13.8536 7.14645C13.9473 7.24021 14 7.36739 14 7.5C14 7.63261 13.9473 7.75979 13.8536 7.85355C13.7598 7.94732 13.6326 8 13.5 8H1.5C1.36739 8 1.24021 7.94732 1.14645 7.85355C1.05268 7.75979 1 7.63261 1 7.5V7.5ZM1 11.5C1 11.3674 1.05268 11.2402 1.14645 11.1464C1.24021 11.0527 1.36739 11 1.5 11H13.5C13.6326 11 13.7598 11.0527 13.8536 11.1464C13.9473 11.2402 14 11.3674 14 11.5C14 11.6326 13.9473 11.7598 13.8536 11.8536C13.7598 11.9473 13.6326 12 13.5 12H1.5C1.36739 12 1.24021 11.9473 1.14645 11.8536C1.05268 11.7598 1 11.6326 1 11.5V11.5Z" fill="black"/>
</svg>
`

const chevronLeftSvgString = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5 4L7.5 12L15.5 20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const searchSvgString = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.2125 13.3516L10.1547 9.29375C10.7844 8.47969 11.125 7.48438 11.125 6.4375C11.125 5.18438 10.6359 4.00937 9.75156 3.12344C8.86719 2.2375 7.68906 1.75 6.4375 1.75C5.18594 1.75 4.00781 2.23906 3.12344 3.12344C2.2375 4.00781 1.75 5.18438 1.75 6.4375C1.75 7.68906 2.23906 8.86719 3.12344 9.75156C4.00781 10.6375 5.18438 11.125 6.4375 11.125C7.48438 11.125 8.47813 10.7844 9.29219 10.1562L13.35 14.2125C13.3619 14.2244 13.376 14.2338 13.3916 14.2403C13.4071 14.2467 13.4238 14.2501 13.4406 14.2501C13.4575 14.2501 13.4741 14.2467 13.4897 14.2403C13.5052 14.2338 13.5194 14.2244 13.5312 14.2125L14.2125 13.5328C14.2244 13.5209 14.2338 13.5068 14.2403 13.4912C14.2467 13.4757 14.2501 13.459 14.2501 13.4422C14.2501 13.4254 14.2467 13.4087 14.2403 13.3931C14.2338 13.3776 14.2244 13.3635 14.2125 13.3516V13.3516ZM8.9125 8.9125C8.25 9.57344 7.37187 9.9375 6.4375 9.9375C5.50313 9.9375 4.625 9.57344 3.9625 8.9125C3.30156 8.25 2.9375 7.37187 2.9375 6.4375C2.9375 5.50313 3.30156 4.62344 3.9625 3.9625C4.625 3.30156 5.50313 2.9375 6.4375 2.9375C7.37187 2.9375 8.25156 3.3 8.9125 3.9625C9.57344 4.625 9.9375 5.50313 9.9375 6.4375C9.9375 7.37187 9.57344 8.25156 8.9125 8.9125Z" fill="black"/>
</svg>
`

const closeSvgString = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" fill="#fff"/>
</svg>
`

const closeBlackSvgString = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" fill="#333"/>
</svg>
`

const infoSvgString = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM8.5 11.375C8.5 11.4438 8.44375 11.5 8.375 11.5H7.625C7.55625 11.5 7.5 11.4438 7.5 11.375V7.125C7.5 7.05625 7.55625 7 7.625 7H8.375C8.44375 7 8.5 7.05625 8.5 7.125V11.375ZM8 6C7.80374 5.99599 7.61687 5.91522 7.47948 5.775C7.3421 5.63478 7.26515 5.4463 7.26515 5.25C7.26515 5.0537 7.3421 4.86522 7.47948 4.725C7.61687 4.58478 7.80374 4.50401 8 4.5C8.19626 4.50401 8.38313 4.58478 8.52052 4.725C8.6579 4.86522 8.73485 5.0537 8.73485 5.25C8.73485 5.4463 8.6579 5.63478 8.52052 5.775C8.38313 5.91522 8.19626 5.99599 8 6Z" fill="#333"/>
</svg>
`

const emptySvgString = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.37 8.91L19.37 10.64L7.24 3.64L8.24 1.91L11.28 3.66L12.64 3.29L16.97 5.79L17.34 7.16L20.37 8.91ZM6 19V7H11.07L18 11V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H8C7.46957 21 6.96086 20.7893 6.58579 20.4142C6.21071 20.0391 6 19.5304 6 19ZM8 19H16V12.2L10.46 9H8V19Z" fill="#666"/>
</svg>`