# slate-edit-list - @bagilevi's fork

A Slate plugin to handle keyboard events in lists. List items can contain blocks.

Demo: [gitbookio.github.io/slate-edit-list/](https://gitbookio.github.io/slate-edit-list/)

### About this Fork

This fork is used by [Brahin](https://brahin.online/), my personal wiki software.
I intend to keep this fork up-to-date with the latest Slate version, but this is a
side project, so development might be slow.
Also recommend [Katalyst Education](https://github.com/katalysteducation/slate-edit-list)'s
fork, they've been doing a great job of migrating to new Slate versions.

### Install

```
npm install @bagilevi/slate-edit-list
```

### Features

Natural keybindings:

- Pressing <kbd>Enter</kbd> insert a new list item
- Pressing <kbd>Shift+Enter</kbd> split the block in the list item
- Pressing <kbd>Tab</kbd> increase the depth of the item (creates a sub-list)
- Pressing <kbd>Shift+Tab</kbd> decrease the depth of the item
- Pressing <kbd>Delete</kbd> (OSX) or <kbd>Backspace</kbd> at the start, remove the list item (or the list)

Simple validation/normalization (see [assumptions about the schema](#assumption-about-the-schema)):

- Lists can contain only list items, and at least one.
- List items can only be the direct children of a list.
- List items must always contain blocks.

Useful transforms: see [Utilities and Transform](#utilities-and-transform).

### Simple Usage

```js
import EditList from 'slate-edit-list'

const plugins = [
  EditList()
]
```

#### Arguments

This plugin accepts options to redefine the following block types:

- `types: string = ["ol_list", "ul_list"]` — the array of possible types for list containers. First value will be used as default.
- `typeItem: string = "list_item"` — type for list items.
- `typeDefault: string = "paragraph"` — type for default block in list items.
- `canMerge: (Node, Node) => boolean` — controls which list can be merged automatically (for example when they are adjacent). Defaults to merging list with identical types


#### Assumption about the schema

You can use this plugins with custom list block types (using plugin [arguments](#arguments)). But your lists structure should still conform to a few rules. These rules are implemented as schema.

Here is what a minimal list would look like:


```yaml
nodes:
    - kind: block
      type: ul_list # Default type for bulleted lists container
      nodes:
          - kind: block
            type: list_item # List containers can only contain list items
            nodes:
              # List items contain blocks. They cannot be the direct container of text.
              - kind: block
                type: paragraph # Default type of blocks in a list item
                nodes:
                  - kind: text
                    text: Hello World
```

And here is an example of a multi-level list:

```yaml
nodes:
  - kind: block
    type: ol_list
    nodes:
      - kind: block
        type: list_item
        nodes:
          - kind: block
            type: paragraph
            nodes:
              - kind: text
                text: Item 1
          - kind: block
            type: ol_list
            nodes:
              - kind: block
                type: list_item
                nodes:
                  - kind: block
                    type: paragraph
                    nodes:
                      - kind: text
                        text: Item 1.1
              - kind: block
                type: list_item
                nodes:
                  - kind: block
                    type: paragraph
                    nodes:
                      - kind: text
                        text: Item 1.2
```

### Utilities

#### `plugin.utils.isList(node: Node) => Boolean`

Return true if the node is one of the list type.

### Queries

#### `editor.getCurrentItem(value: Value, block: Block?) => Block || Void`

Returns the current item at selection (or at the given block).

#### `editor.getCurrentList(value: Value, block: Block?) => Block || Void`

Returns the current list at selection (or at the given block).

#### `editor.getItemDepth(value: Value, block: Block?) => Number`

Returns the depth of the current item (or the depth of the given block) in a list. 0 means not in a list.

#### `editor.getItemsAtRange(value: Value, range: Selection?) => List<Node>`

Return the list of items at the given range. The returned items are the highest list of of successive items that cover the given range.

The returned list is empty if no such list can be found.

#### `editor.getPreviousItem(value: Value, block: Block?) => Block || Void`

Return the previous item, from current selection or from a node.

#### `editor.isSelectionInList(value: Value) => Boolean`

Return true if selection is inside a list (and it can be unwrap).

### Commands

#### `editor.decreaseItemDepth() => Boolean`

Decrease the depth of the current item.

#### `editor.increaseItemDepth() => Boolean`

Increase the depth of the current item.

#### `editor.splitListItem() => Boolean`

Split current block into a new list item.

#### `editor.unwrapList() => Transform`

Unwrap all items at range from their list.

#### `editor.wrapInList(type: String?, data: Object|Data?) => Transform`

Wrap the current blocks in list items of a list container of the given type. You can pass optional data for the created list container.
