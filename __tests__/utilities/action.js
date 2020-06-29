exports.action = {
    getText: async (locator) => {
        await page.waitForSelector(locator, { visible: true });
        let text = await page.$eval(locator, (element) => element.textContent);
        return text;
    },
    selectDropdown: async (locator, option) => {
        await page.selectOption(locator, option);
    },
    hitEnter: async (app) => {
        if (!app)
            await page.keyboard.press("Enter");
        else
            await ipage.keyboard.press("Enter");
    },
    click: async (locator) => {
        await page.waitForSelector(locator, { visible: true, timeout: 30000 });
        await page.click(locator);
    },
    hover: async(locator)=>{
        await page.waitForSelector(locator, { visible: true, timeout: 30000 });
        await page.waitFor(2000);
        await page.hover(locator);
        await page.waitFor(2000);
    },
    fill: async (locator, text) => {
        await page.waitForSelector(locator, { visible: true });
        await page.fill(locator, text);
    },
    clear: async (locator) => {
        await page.fill(locator, "");
    },
    fileUpload: async (filetoUpload) => {
        await page.setInputFiles('input[type="file"]', filetoUpload);
    },
    check: async (locator) => {
        await page.check(locator);
    },
    uncheck: async (locator) => {
        await page.uncheck(locator);
    },
    goto: async (URL) => {
        await page.goto(URL);
    },
    screenShot: async (path) => {
        await page.screenshot({ path: `${path}` });
    },
    keys: async (key) => {
        await page.keyboard.press(key);
    },
    type: async (locator, text) => {
        await page.waitForSelector(locator, { visible: true });
        await page.type(locator, text);
    },
    dragAndDrop: async (originSelector, destinationSelector) => {
        await page.waitFor(originSelector)
        await page.waitFor(destinationSelector)
        let origin = await page.$(originSelector)
        let destination = await page.$(destinationSelector)
        let ob = await origin.boundingBox()
        let db = await destination.boundingBox()
        console.log(`Dragging from ${ob.x + ob.width / 2}, ${ob.y + ob.height / 2}`)
        await page.mouse.move(ob.x + ob.width / 2, ob.y + ob.height / 2)
        await page.mouse.down()
        console.log(`Dropping at   ${db.x + db.width / 2}, ${db.y + db.height / 2}`)
        await page.mouse.move(db.x + db.width / 2, db.y + db.height / 2)
        await page.mouse.up()
    },
    textNode: async (selector, txt) => {
        (await page.$$eval(selector, a => a
            .filter(a => a.textContent === txt)
        ))[0].click()
    },
    waitForSelector: async (selector) => {
        await page.waitForSelector(selector)
    },
    snapShot: async(selector)=>{
        await page.waitForSelector(selector)
        await page.waitFor(2000);
        let ele = await page.$(selector);
       let a =  await ele.screenshot();
       return a;
    }


};
