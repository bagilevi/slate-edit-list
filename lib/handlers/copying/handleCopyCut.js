//@flow
import { type Event, Editor, Document, Block } from 'slate';
import { getEventTransfer } from 'slate-react';
import { List } from 'immutable';
import cloneFragment from './cloneFragment';

function handleCopyCut(event: Event, editor: Editor, next: Function, callback?: Function = () => undefined): boolean {
    const { value } = editor;
    const { fragment, selection } = value;

    if (value.startBlock === value.endBlock) {
        const block = value.startBlock;

        let text = block.nodes.first()
        text = text.splitText(selection.start.offset)[1]
        text = text.splitText(selection.end.offset - selection.start.offset)[0]

        const blockToCopy = Block.create({
            type: block.type,
            data: block.data,
            key: block.key,
            nodes: new List([text]),
        })

        const nodesToCopy = new List([blockToCopy])
        const fragmentToCopy = Document.create({ nodes: nodesToCopy })

        cloneFragment(event, editor, fragmentToCopy, callback)
        return true;
    }

    return next();
}

export default handleCopyCut;
