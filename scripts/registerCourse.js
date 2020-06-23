const mountYear = require("./mountYear");
const mountCourse = require("./mountCourse");
module.exports = async function (page, step) {
    await page.goto(`${process.env.HOST}/CMCSoft.IU.Web.info/StudyRegister/StudyRegister.aspx`);

    const mountYears = await page.evaluate(mountYear);
    await page.select('select[name="drpAcademicYear"]', mountYears[step.year])
    await page.waitForNavigation()

    const mountCourses = await page.evaluate(mountCourse);
    await page.select('select[name="drpCourse"]', mountCourses[step.courses[0].name])
    await page.click('input[name="btnViewCourseClass"]')

    await page.waitForNavigation()
    await page.screenshot({ path: 'example.png' })
}