export const createAutoLayoutFrame = (props: {
  name: string
  isVertical?: boolean
  paddingTopAndBottomPx?: number
  paddingLeftAndRightPx?: number
  cornerRadius?: number
  itemSpacing?: number
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

  return frame;
}

export const createFrame = (props: {
  name: string
  size?: number
  cornerRadius?: number
}) => {
  const frame = figma.createFrame()
  frame.name = props.name
  if(props.cornerRadius) {
    frame.cornerRadius = props.cornerRadius
  }

  if(props.size) {
    frame.resize(props.size, props.size)
  }

  return frame;
}

export const createTextNode = async (props: {
  initialCharacter?: string
}) => {
  await figma.loadFontAsync({ style: "Regular", family: "Roboto" })
  const text = figma.createText()
  text.characters = props.initialCharacter || "Text"

  return text
}

export const createLine = (props: {
  widthPx?: number
  vertical?: boolean
}) => {
  const line = figma.createLine()
  const strokes:SolidPaint[] = [{ type: "SOLID" as const, color: { r: 0.9, g: 0.9, b: 0.9 }}]
  line.strokes = strokes

  if(props.widthPx) {
    line.resize(props.widthPx, 0)
  }

  if(props.vertical) {
    line.rotation = 90
  }

  return line
}