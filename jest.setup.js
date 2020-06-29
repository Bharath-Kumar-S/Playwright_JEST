jest.setTimeout(60000);
jasmine.getEnv().addReporter({
    specStarted: result => jasmine.currentTest = result,
    specDone: result => jasmine.currentTest = result,
});
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });