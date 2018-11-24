// @flow
import { type Event, Editor } from 'slate';
import handleCopyCut from './copying/handleCopyCut'

/**
 * User pressed Ctrl+C or selected Copy from a menu.
 */
function onCopy(event: Event, editor: Editor, next: Function): boolean {
  return handleCopyCut(event, editor, next)
}

export default onCopy;
