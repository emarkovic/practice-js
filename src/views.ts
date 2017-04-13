import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import 'brace/ext/language_tools'

import {EditorActions} from './actions';
import {AppStore} from './stores'

//Handles moving from one excersize to the next
export class PageView {
    constructor() {
        //get the previous button and handle on click
        //get the next button and handle on click
    }
}

//Description section, when something happens, update the description
export class DescriptionView {
    constructor() {
        //get the description and hangle on change
    }
    
    render() {
        //get new data and put it in the element
    }
}

//Editor view - handle and evaluate user responses
export class EditorView {    
    constructor() {           
        // embedding the editor
        ace.acequire("ace/ext/language_tools");  
        const editor = ace.edit("aceEditor");  
        editor.getSession().setMode("ace/mode/javascript");
        editor.setTheme("ace/theme/tomorrow");      
        editor.setOptions({
            enableBasicAutocompletion: true
        });  

        $("#btnTest").on('click', () => {
            EditorActions.testResponse({
                response: editor.getValue()
            });
        });
    }
}

//Results view - when user responds, run responses against tests and evaluate correctness,
//then update the view
export class ResultsView {
    resultsArea;
    constructor(private appStoreSingleton:AppStore) {
        this.resultsArea = $("#resultsArea");

        this.appStoreSingleton.on('change', e => this.compare())
        //listen for changes
        //when there is a change - compared agianst expected output and 
        //render the results
    }

    compare() {
        this.resultsArea.html('')
        //get response
        let data = this.appStoreSingleton.getData();
        //get tests
        //does user output match the tests
        this.render(data.response);
    }

    render(response) {
        //update results area
        this.resultsArea.html('<p>' + response + '</p>')
    }
}