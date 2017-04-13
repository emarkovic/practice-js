import {Dispatcher} from 'flux';

export const AppDispatcher = new Dispatcher();

export class Action {
    constructor(readonly actionType:string, readonly data?:any) {}
}

export class EditorActions {
    static readonly TEST_RESPONSE = 'test_response';

    static testResponse(data) {
        let action = new Action(EditorActions.TEST_RESPONSE, {item: data})
        AppDispatcher.dispatch(action);
    }
}