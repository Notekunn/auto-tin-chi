const puppeteer = require('puppeteer');
const login = require("./login");
require('dotenv').config()
const step = {
    year: 'AT15',
    courses: [
        {
            name: 'Quản trị mạng máy tính'
        }
    ]
}
async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--start-maximized'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 930, height: 920 });
    await login(page)
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
        // await browser.close();
    })
    await page.goto(`${process.env.HOST}/CMCSoft.IU.Web.info/StudyRegister/StudyRegister.aspx`);
    const mountYears = await page.evaluate(() => {
        const years = {}
        document.querySelectorAll(`select[name="drpAcademicYear"] option`).forEach(function (e, i) {
            years[e.textContent] = e.value;
        })
        return years;
    });
    await page.select('select[name="drpAcademicYear"]', mountYears[step.year])
    await page.waitForNavigation()
    const mountCourses = await page.evaluate(() => {
        const courses = {}
        document.querySelectorAll(`select[name="drpCourse"] option`).forEach(function (e, i) {
            const name = (e.textContent.split('(')[0] || '').trim();
            courses[name] = e.value;
        })
        return courses;
    });
    await page.select('select[name="drpCourse"]', mountCourses[step.courses[0].name])
    await page.click('input[name="btnViewCourseClass"]')
    await page.waitForNavigation()
    await page.screenshot({path: 'example.png'})
    // await browser.close();
}

main();