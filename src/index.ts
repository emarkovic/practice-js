import {EditorView, ResultsView} from './views'
import {AppStore} from './stores'

export const worker = new Worker('src/worker.js');
// worker.addEventListener('message', e => {
//     console.log(e.data)
// })
// worker.postMessage({hello: 'hi'})

const appStoreSingleton = new AppStore();

new EditorView();
new ResultsView(appStoreSingleton);