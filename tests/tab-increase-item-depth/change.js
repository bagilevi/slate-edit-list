import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    change.moveToStartOfNode(selectedBlock);

    plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {},
            key: 'Tab'
        },
        change,
        {}
    );

    // Selection check
    expect(change.value.selection.anchor.offset).toEqual(0);
    expect(change.value.selection.isCollapsed).toBe(true);

    return change;
}
