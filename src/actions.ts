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
export class PageActions {
    static readonly NEXT_EXERCISE = 'next_exercise';
    static readonly PREVIOUS_EXERCISE = 'previous_exercise';
    static readonly GET_EXERCISE = 'get_exercise';

    static nextExercise() {
        let action = new Action(PageActions.NEXT_EXERCISE)
        AppDispatcher.dispatch(action);
    }

     static previousExercise() {
        let action = new Action(PageActions.PREVIOUS_EXERCISE)
        AppDispatcher.dispatch(action);
    }

     static getExercise() {
        let action = new Action(PageActions.GET_EXERCISE)
        AppDispatcher.dispatch(action);
    }
}