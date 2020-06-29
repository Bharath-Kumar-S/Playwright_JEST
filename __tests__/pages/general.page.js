const { chromium } = require('playwright')
const { action } = require('../utilities/action')
const { checks } = require('../utilities/check')
const { data } = require('../data/constants')

const locator = {
    form: {
        link: `[href="/login"]`,
        username: `[name="username"]`,
        password: `[name="password"]`,
        submit: `[type="submit"]`,
        alert: `[id="flash"]`
    },
    checkboxes: {
        link: `[href="/checkboxes"]`,
        fcheck: `input:nth-child(1)`,
        scheck: `input:nth-child(3)`
    }
};


exports.libs = {
    launch: async () => {
        return new Promise(async (resolve, reject) => {
            browser = process.env.npm_config_brw
                ? await chromium.launch({
                    headless: false, args: ['--ignore-certificate-errors']
                })
                : await chromium.launch();
            context = await browser.newContext();
            page = await context.newPage();
            page.on("dialog", async (dialog) => {
                // console.log(dialog.message());
                await dialog.accept();
            });
            return resolve();
        })
    },
    tearDown: async () => {
        return new Promise(async (resolve, reject) => {
            if (!page.isClosed()) {
                browser.close();
            }
            return resolve();
        })
    },
    goTo: async () => {
        const { URL } = data.portal;
        await action.goto(URL);
    },
    formChecks: async () => {
        const { username, link, password, submit, alert } = locator.form
        const { pass, user, alertmessage } = data.formData;
        await action.click(link);
        await action.fill(username, user);
        await action.fill(password, pass);
        await action.click(submit);
        let message = await action.getText(alert);

        //assertion
        await checks.contains(message, alertmessage);
    },
    checkBoxes: async()=>{
        const {fcheck,link,scheck} = locator.checkboxes;
        await action.click(link);
        
        //assertion
        await checks.checked(fcheck,false);
        await checks.checked(scheck,true);

        await action.check(fcheck);
        await action.uncheck(scheck);

        //assertion
        await checks.checked(fcheck,true);
        await checks.checked(scheck,false);
    }
};