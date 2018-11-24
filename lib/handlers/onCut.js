// @flow
import { type Event, Editor } from 'slate';
import handleCopyCut from './copying/handleCopyCut'
import removeCutFragment from './copying/removeCutFragment'

/**
 * User pressed Ctrl+X or selected Cut from a menu.
 */
function onCut(event: Event, editor: Editor, next: Function): boolean {
    return handleCopyCut(event, editor, next, () => {
        removeCutFragment(editor)
    })
}

export default onCut;
