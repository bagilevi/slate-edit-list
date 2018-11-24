// @flow
/* global document */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate-react';

import PluginEditList from '../lib/';

import INITIAL_VALUE from './value';

const plugin = PluginEditList();
const plugins = [plugin];

function renderNode(props: *) {
    const { node, attributes, children, editor } = props;
    const isCurrentItem = plugin.queries
        .getItemsAtRange(editor, editor.value)
        .contains(node);

    switch (node.type) {
        case 'ul_list':
            return <ul {...attributes}>{children}</ul>;
        case 'ol_list':
            return <ol {...attributes}>{children}</ol>;

        case 'list_item':
            return (
                <li
                    className={isCurrentItem ? 'current-item' : ''}
                    title={isCurrentItem ? 'Current Item' : ''}
                    {...props.attributes}
                >
                    {props.children}
                </li>
            );

        case 'paragraph':
            return <p {...attributes}>{children}</p>;
        case 'heading':
            return <h1 {...attributes}>{children}</h1>;
        default:
            return <p {...attributes}>{children}</p>;
    }
}

class Example extends React.Component<*, *> {
    state = {
        value: INITIAL_VALUE
    };

    ref = editor => {
      this.editor = editor
    }

    renderToolbar() {
        const { editor } = this;
        const inList = editor && editor.isSelectionInList(this.state.value);

        return (
            <div>
                <button
                    className={editor ? (inList ? 'active' : '') : 'disabled'}
                    onClick={() => editor ? (inList ? editor.unwrapList() : editor.wrapInList()) : null}
                >
                    <i className="fa fa-list-ul fa-lg" />
                </button>

                <button
                    className={inList ? '' : 'disabled'}
                    onClick={() => editor.decreaseItemDepth()}
                >
                    <i className="fa fa-outdent fa-lg" />
                </button>

                <button
                    className={inList ? '' : 'disabled'}
                    onClick={() => editor.increaseItemDepth()}
                >
                    <i className="fa fa-indent fa-lg" />
                </button>

                <span className="sep">·</span>

                <button onClick={() => editor.wrapInList()}>
                    Wrap in list
                </button>
                <button onClick={() => editor.unwrapList()}>
                    Unwrap from list
                </button>
            </div>
        );
    }

    onChange = ({ value }) => {
        this.setState({
            value
        });
    };

    render() {
        return (
            <div>
                {this.renderToolbar()}
                <Editor
                    ref={this.ref}
                    placeholder={'Enter some text...'}
                    plugins={plugins}
                    value={this.state.value}
                    onChange={this.onChange}
                    onFocus={null}
                    renderNode={renderNode}

                />
            </div>
        );
    }
}

// $FlowFixMe
ReactDOM.render(<Example />, document.getElementById('example'));
