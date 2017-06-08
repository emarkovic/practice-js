
export type Exercise = {
    title: string,
    description: string,
    functionStub: string
}

export type Test = {
    studentCode: "",
    functionStub: string,
    tests: [{
        call: string,
        expectedOutput: string
    }]
}
