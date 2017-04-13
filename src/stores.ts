import {EventEmitter} from 'events';

import {Action, EditorActions, AppDispatcher} from './actions';

export class AppStore extends EventEmitter {
    private data = {
        response: ""
    }

    constructor() {
        super();

        AppDispatcher.register((payload:Action) => {
            switch(payload.actionType) {
                case EditorActions.TEST_RESPONSE:
                    this.data.response = payload.data.item.response;
                    this.emit('change');
                    break;
            }
        });
    }

    getData() {
        return this.data;
    }
}
