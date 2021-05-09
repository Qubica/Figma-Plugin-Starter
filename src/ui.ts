import './ui.css';

window.addEventListener('load', () => {
    document.getElementById('export').onclick = () => {
        parent.postMessage({ pluginMessage: { type: 'create-json' } }, '*');
    };

    document.getElementById('cancel').onclick = () => {
        parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
    };
});

onmessage = (event) => {
    const { type, data } = event.data.pluginMessage;

    const output = document.getElementById('output');
    if (type === 'output') {
        output.innerHTML = data.output;
    }
};
