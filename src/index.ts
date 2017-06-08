import {EditorView, ResultsView, PageView} from './views'
import {AppStore, PageStore} from './stores'

export const worker = new Worker('src/worker.js');

const appStoreSingleton = new AppStore();
const pageStoreSingleton = new PageStore();


new PageView(pageStoreSingleton)
new EditorView();
new ResultsView(appStoreSingleton);