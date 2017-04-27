import {EditorView, ResultsView} from './views'
import {AppStore, PageStore} from './stores'

export const worker = new Worker('src/worker.js');

const appStoreSingleton = new AppStore();
const pageStoreSingleton = new PageStore();

new EditorView();
new ResultsView(appStoreSingleton);

// For next week 