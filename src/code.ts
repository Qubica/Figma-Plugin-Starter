const props = ['type', 'name', 'x', 'y', 'width', 'height', 'children', 'visible', 'rotation'];

function traverse(node) {
    // generate object with keys
    let n = props.reduce((acc, curr) => ((acc[curr] = null), acc), {});

    // traverse children
    let children = [];
    if ('children' in node) {
        if (node.type !== 'INSTANCE') {
            for (const child of node.children) {
                children.push(traverse(child));
            }
        }
    }

    // populate object
    props.forEach((key) => {
        n[key] = node[key];
    });

    // return object
    return n;
}

function saveJson(obj) {
    var str = JSON.stringify(obj);
    figma.ui.postMessage({
        type: 'output',
        data: {
            output: str
        }
    });
}

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
    if (msg.type === 'create-json') {
        // figma.currentPage.selection
        const tree = traverse(figma.root);
        saveJson(tree);
    }

    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    if (msg.type === 'cancel') {
        figma.closePlugin();
    }
};
