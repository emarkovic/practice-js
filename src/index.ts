import {EditorView, ResultsView} from './views'
import {AppStore} from './stores'

export const worker = new Worker('src/worker.js');

const appStoreSingleton = new AppStore();

new EditorView();
new ResultsView(appStoreSingleton);