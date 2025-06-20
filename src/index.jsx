import React from 'react';
import { createRoot } from 'react-dom/client';
import DatasetGraph from './DatasetGraph';

class DatasetGraphWebComponent extends HTMLElement {

    constructor() {
        super();
        this._reactRoot = null;
        this._rootInstance = null;
    }

    connectedCallback() {
        if (!this.querySelector('.react-root')) {
            const reactRoot = document.createElement('div');
            reactRoot.className = 'react-root';
            this.appendChild(reactRoot);
        }

        this._renderReact();
    }

    disconnectedCallback() {
        if (this._rootInstance) {
            this._rootInstance.unmount();
            this._rootInstance = null;
        }
    }

    _renderReact() {
        const reactRoot = this.querySelector('.react-root');
        if (reactRoot) {
            if (!this._rootInstance) {
                this._rootInstance = createRoot(reactRoot);
            }

            const props = this._getPropsFromAttributes();

            this._rootInstance.render(
                <DatasetGraph {...props} />
            );
        }
    }

    _getPropsFromAttributes() {
        const colorTags = Array.from(this.querySelectorAll('color'));
        const colors = colorTags.map(tag => tag.getAttribute("value")).filter(Boolean);

        return {
            datasetERC: this.getAttribute('dataseterc'),
            colors: colors
        };
    }
}

const DATASET_GRAPH_ELEMENT_ID = 'dataset-graph';

if (!customElements.get(DATASET_GRAPH_ELEMENT_ID)) {
    customElements.define(DATASET_GRAPH_ELEMENT_ID, DatasetGraphWebComponent);
}