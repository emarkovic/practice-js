import {EditorView, ResultsView} from './views'
import {AppStore} from './stores'

const appStoreSingleton = new AppStore();

new EditorView();
new ResultsView(appStoreSingleton);