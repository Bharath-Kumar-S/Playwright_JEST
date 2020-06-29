import { libs } from "../../pages/general.page";

describe("The internet app Form login", () => {

    beforeAll(async () => {
        await libs.launch();
       
    });

    beforeEach(async()=>{
        await libs.goTo();
    })

        it('Basic form login', async () => {
            // assertions are available at utility libs level
            await libs.formChecks();
        })

        it('Basic checkboxes check', async () => {
            // assertions are available at utility libs level
            await libs.checkBoxes();
        })

    afterEach(async () => {
        console.log(
           'Test',
           jasmine['currentTest'].fullName,
           'failed',
           !!jasmine['currentTest'].failedExpectations.length
         );
         if (!!jasmine['currentTest'].failedExpectations.length) {
           const screenshotBuffer = await page.screenshot();
          await reporter.addAttachment(jasmine['currentTest'].fullName, screenshotBuffer, "image/png");
         }
       });

    afterAll(async () => {
        await libs.tearDown();
    });

})