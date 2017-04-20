self.addEventListener('message', e => {
    // build function as a string
    let func = e.data.functionStub + '{' + e.data.studentCode + '}';

    let results = [];
    // for each test add call on and eval
    // save output, compare with expected
    // decide if answer was correct
    e.data.tests.forEach(test => {
        let studentOutput;
        try {
            studentOutput = eval(func + test.call);
        } catch (e) {
            let colonIndex = e.stack.indexOf(':') + 1;
            let errorType = e.stack.substring(0, colonIndex);            
            studentOutput = errorType + ' ' + e.message;
        }

        results.push({
            call: test.call,
            expectedOutput: test.expectedOutput,
            studentOutput: studentOutput,
            result: studentOutput === test.expectedOutput
        });
    });

    // send results back
    self.postMessage(results)
});