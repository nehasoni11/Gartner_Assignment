const assert = require('assert')
const solution = require('./solution')

it('indicates failure when a obejct is used instead of a array', () => {
    assert.equal(solution.validateClicksArray({}), false)
})

it('indicates failure when blanck array is used', () => {
    assert.equal(solution.validateClicksArray([]), false)
})

it(`correctly calculates the expensive click`, () => {
    const result =solution.getResultSet([
        { "ip": "22.22.22.22", "timestamp": "3/11/2016 02:02:58", "amount": 7.00 },
        { "ip": "11.11.11.11", "timestamp": "3/11/2016 02:12:32", "amount": 6.50 },
        { "ip": "11.11.11.11", "timestamp": "3/11/2016 02:13:11", "amount": 7.25 }
    ])
    assert.deepEqual(result, [{ "ip": "11.11.11.11", "timestamp": "3/11/2016 02:13:11", "amount": 7.25 }]);
});