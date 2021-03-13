export const createAutoLayoutFrame = (props: {
  name: string
  isVertical?: boolean
  paddingTopAndBottomPx?: number
  paddingLeftAndRightPx?: number
  cornerRadius?: number
  itemSpacing?: number
  widthPx?: number
  strokeColor?: RGB
  alignItemsCenter?: boolean
  spaceBetween?: boolean
}) => {
  const frame = figma.createFrame()
  frame.name = props.name
  frame.layoutMode = props.isVertical ? "VERTICAL" : "HORIZONTAL"
  frame.primaryAxisSizingMode = "AUTO"
  frame.counterAxisSizingMode = "AUTO"

  if(props.paddingTopAndBottomPx) {
    frame.verticalPadding = props.paddingTopAndBottomPx
  }
  if(props.paddingLeftAndRightPx) {
    frame.horizontalPadding = props.paddingLeftAndRightPx
  }
  if(props.cornerRadius) {
    frame.cornerRadius = props.cornerRadius
  }
  if(props.itemSpacing) {
    frame.itemSpacing = props.itemSpacing
  }
  if(props.widthPx) {
    frame.resize(props.widthPx, frame.height)
  }
  if(props.strokeColor) {
    frame.strokes = [{ type: "SOLID" as const, color: props.strokeColor}]
  }
  if(props.alignItemsCenter) {
    frame.counterAxisAlignItems = "CENTER"
  }
  if(props.spaceBetween) {
    frame.primaryAxisAlignItems = "SPACE_BETWEEN"
  }

  return frame;
}

export const createFrame = (props: {
  name: string
  size?: number
  cornerRadius?: number
  widthPx?: number
  heightPx?: number
  strokeColor?: RGB
  fillColor?: RGB
}) => {
  const frame = figma.createFrame()
  frame.name = props.name
  if(props.cornerRadius) {
    frame.cornerRadius = props.cornerRadius
  }
  if(props.size) {
    frame.resize(props.size, props.size)
  }
  if(props.widthPx) {
    frame.resize(props.widthPx, frame.width)
  }
  if(props.heightPx) {
    frame.resize(frame.width, props.heightPx)
  }
  if(props.strokeColor) {
    frame.strokes = [{ type: "SOLID" as const, color: props.strokeColor}]
  }
  if(props.fillColor) {
    frame.fills = [{ type: "SOLID" as const, color: props.fillColor}]
  }

  return frame;
}

export const createTextNode = async (props: {
  initialCharacter?: string
  color?: RGB
  fontSize?: number
  style?: string,
  widthPx?: number
}) => {
  await figma.loadFontAsync({ style: "Regular", family: "Roboto" })
  const text = figma.createText()
  text.characters = props.initialCharacter || "Text"

  if(props.style) {
    await figma.loadFontAsync({ style: props.style, family: "Roboto" })
    text.fontName = { style: props.style, family: "Roboto" }
  }
  if(props.color) {
    text.fills = [{ type: "SOLID" as const, color: props.color}]
  } else {
    text.fills = [{ type: "SOLID" as const, color: { r: 66 / 255, g: 66 / 255, b: 75 / 255 }}]
  }
  if (props.fontSize) {
    text.fontSize = props.fontSize
  }
  if(props.widthPx) {
    text.resize(props.widthPx, text.height)
  }

  return text
}

export const createLine = (props: {
  widthPx?: number
  vertical?: boolean
  strokeColor?: RGB
  stretch?: boolean
  strokeHeight?: number;
}) => {
  const line = figma.createLine()
  const strokes:SolidPaint[] = [{ type: "SOLID" as const, color: props.strokeColor || { r: 0.9, g: 0.9, b: 0.9 }}]
  line.strokes = strokes

  if(props.widthPx) {
    line.resize(props.widthPx, 0)
  }

  if(props.vertical) {
    line.rotation = 90
  }
  if (props.stretch) {
    line.constraints = { horizontal: "STRETCH", vertical: "STRETCH"}
  }
  if(props.strokeHeight) {
    line.strokeWeight = props.strokeHeight
  }

  return line
}