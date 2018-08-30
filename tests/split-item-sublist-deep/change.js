import expect from 'expect';
import { Point } from 'slate';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');

    change.moveToStartOfNode(selectedBlock).moveForward(2); // It|em 1

    plugin.changes.splitListItem(change);

    // check new selection
    expect(change.value.selection.toJS()).toEqual({
        anchor: {
            object: 'point',
            offset: 0,
            path: [0, 0, 1, 1, 0, 0]
        },
        focus: {
            object: 'point',
            offset: 0,
            path: [0, 0, 1, 1, 0, 0]
        },
        isAtomic: false,
        isFocused: false,
        marks: null,
        object: 'range'
    });

    return change;
}
