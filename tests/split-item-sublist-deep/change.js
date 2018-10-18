import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');

    change.moveToStartOfNode(selectedBlock).moveForward(2); // It|em 1

    plugin.changes.splitListItem(change);

    expect(change.value.selection.toJS()).toEqual({
        anchor: {
            object: 'point',
            path: [0, 0, 1, 1, 0, 0],
            offset: 0
        },
        focus: {
            object: 'point',
            path: [0, 0, 1, 1, 0, 0],
            offset: 0
        },
        isAtomic: false,
        isFocused: false,
        marks: null,
        object: 'range'
    });

    return change;
}
