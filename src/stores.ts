import {EventEmitter} from 'events'
import {worker} from './index'
import {Exercise} from './types'

import {AppDispatcher, Action, EditorActions, PageActions} from './actions';

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
                            {call: "addHello()", expectedOutput: "Hello"}
                        ]
                    });

                    worker.addEventListener('message', e => {
                        this.data.response = e.data;
                        this.emit('change');
                    });
                    break;
            }
        });
    }

    getData() {
        return this.data;
    }
}

export class PageStore extends EventEmitter {
    private currentExcersize: number = 0
    private data: Exercise[]
    constructor() {
        super()

        fetch('../data/settings.json')
            .then(response => response.json()) 
            .then(data => {
                this.data = (data as any).exercises              
                this.emit('change')
            })
         
        AppDispatcher.register((payload:Action) => {
            switch (payload.actionType) {
                case PageActions.NEXT_EXERCISE: 
                    if (this.currentExcersize < this.data.length - 1) {
                        this.currentExcersize++
                        this.emit('change')
                    }
                    break;
                case PageActions.PREVIOUS_EXERCISE: 
                    if (this.currentExcersize > 0) {
                        this.currentExcersize--
                        this.emit('change')
                    }
                    break;
            }
        })       
    }

    getExercise() :Exercise {
        return this.data[this.currentExcersize];
    }
}
