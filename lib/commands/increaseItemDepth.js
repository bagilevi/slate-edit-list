// @flow
import { Block, type Change } from 'slate';

import type Options from '../options';
import { isList } from '../utils';

/**
 * Increase the depth of the current item by putting it in a sub-list
 * of previous item.
 * For first items in a list, does nothing.
 */
function increaseItemDepth(opts: Options, change: Change): Change {
    const previousItem = change.getPreviousItem(change.value);
    const currentItem = change.getCurrentItem(change.value);

    if (!previousItem) {
        return false;
    }

    if (!currentItem) {
        return false;
    }

    // Move the item in the sublist of previous item
    return moveAsSubItem(opts, change, currentItem, previousItem.key);
}

/**
 * Move the given item to the sublist at the end of destination item,
 * creating a sublist if needed.
 */
function moveAsSubItem(
    opts: Options,
    change: Change,
    // The list item to add
    item: Block,
    // The key of the destination node
    destKey: string
): Change {
    const destination = change.value.document.getDescendant(destKey);
    const lastIndex = destination.nodes.size;
    const lastChild = destination.nodes.last();

    // The potential existing last child list
    const existingList = isList(opts, lastChild) ? lastChild : null;

    if (existingList) {
        return change.moveNodeByKey(
            item.key,
            existingList.key,
            existingList.nodes.size // as last item
        );
    }
    const currentList = change.getListForItem(change.value, destination);
    if (!currentList) {
        throw new Error('Destination is not in a list');
    }

    const newSublist = Block.create({
        object: 'block',
        type: currentList.type,
        data: currentList.data
    });

    // eslint-disable-next-line no-shadow
    return change.withoutNormalizing(change => {
        change.insertNodeByKey(destKey, lastIndex, newSublist);
        change.moveNodeByKey(item.key, newSublist.key, 0);
    });
}

export default increaseItemDepth;
