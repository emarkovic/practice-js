import {EventEmitter} from 'events';
import {worker} from './index'

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
                    // send data to web worker
                    worker.postMessage({
                        studentCode: payload.data.item.studentCode,
                        functionStub: 'function addHello(str)',
                        tests: [
                            {call: "addHello('str')", expectedOutput: 'Hello str'},
                            {call: "addHello()", expectedOutput: "Hello"},
                            // {call: "", expectedOutput: ""},
                            // {call: "", expectedOutput: ""},
                            // {call: "", expectedOutput: ""},
                        ]
                    });

                    worker.addEventListener('message', e => {
                        this.data.response = e.data;
                        this.emit('change');
                    })                    
                    // this.data.response = payload.data.item.response;
                    // console.log(payload.data.item)
                    // this.emit('change');
                    break;
            }
        });
    }

    getData() {
        return this.data;
    }
}
