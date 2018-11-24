export default function (editor) {
  // If user cuts a void block node or a void inline node,
  // manually removes it since selection is collapsed in this case.
  const { value } = editor
  const { endBlock, endInline, selection } = value
  const { isCollapsed } = selection
  const isVoidBlock = endBlock && editor.isVoid(endBlock) && isCollapsed
  const isVoidInline = endInline && editor.isVoid(endInline) && isCollapsed

  if (isVoidBlock) {
    editor.removeNodeByKey(endBlock.key)
  } else if (isVoidInline) {
    editor.removeNodeByKey(endInline.key)
  } else {
    editor.delete()
  }
}
