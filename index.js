const puppeteer = require('puppeteer');
const login = require("./scripts/login");
const registerCourse = require("./scripts/registerCourse");
const dialogHandler = require("./scripts/dialogHandler");
const url = require('url');
require('dotenv').config()
const browserConfig = {
    headless: false,
    // args: ['--start-maximized'],
}
if (!!process.env.EXECUTABLE_PATH)
    browserConfig.executablePath = process.env.EXECUTABLE_PATH
const step = {
    year: 'AT15',
    courses: [
        {
            name: 'Quản trị mạng máy tính'
        }
    ]
}
async function main() {
    const browser = await puppeteer.launch(browserConfig);
    const page = await browser.newPage();
    await page.setViewport({ width: 930, height: 920 });
    await login(page)
    page.on('dialog', dialogHandler);
    page.on('request', function (response) {
        const url = new URL(response._url)
        const lastPath = url.pathname.split("/").slice(-1).pop();
        if (lastPath == "ErrorPage_PageNotExist.html")
            login(page)
    });
    await registerCourse(page, step);
    // await browser.close();
}
main();