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

        document.getElementById('btnTest').addEventListener('click', () => {
            EditorActions.testResponse({
                studentCode: editor.getValue()
            });
        });
    }
}

//Results view - when user responds, run responses against tests and evaluate correctness,
//then update the view
export class ResultsView {
    resultsArea;
    constructor(private appStoreSingleton:AppStore) {
        this.resultsArea = document.getElementById("resultsArea");

        this.appStoreSingleton.on('change', e => this.render())
    }


    render() {
        this.resultsArea.innerHTML = '';
        // casting as any to supress typescript compiler error
        let results = this.appStoreSingleton.getData().response as any;

        results.forEach((result, index) => {
            this.renderTest(result, index + 1)
        })

    }

    renderTest(test: {call, expectedOutput, studentOutput, result, error?}, testNum: number) {
        let parentDiv = document.createElement('div')
        parentDiv.classList.add('test');

        let call = document.createElement('p');        
        call.innerHTML = "<strong>Test " + testNum + ': </strong>' + test.call;

        let expectedOut = document.createElement('p');
        expectedOut.innerHTML = '<strong>Expected output: </strong>' + test.expectedOutput;

        let studentOut = document.createElement('p');
        studentOut.innerHTML = '<strong>Your output: </strong>' + test.studentOutput;

        let result = document.createElement('p');
        let resultStrong = document.createElement('strong');
        resultStrong.innerHTML = 'Result: ';
        let resultSpan = document.createElement('span');
        if (test.result) {
            resultSpan.innerHTML = 'Pass'
            resultSpan.classList.add('green')
        } else {
            resultSpan.innerHTML = ' Fail'
            resultSpan.classList.add('red')
        }
        result.appendChild(resultStrong)
        result.appendChild(resultSpan)        

        parentDiv.appendChild(call);
        parentDiv.appendChild(expectedOut);
        parentDiv.appendChild(studentOut);
        parentDiv.appendChild(result);

        if (test.error) {
            console.log(test.error)
        }

        this.resultsArea.appendChild(parentDiv)
    }
}