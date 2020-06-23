const mountYear = require("./mountYear");
const mountCourse = require("./mountCourse");
module.exports = async function (page, step) {
    console.log("Đăng ký học ...");
    await page.goto(`${process.env.HOST}/CMCSoft.IU.Web.info/StudyRegister/StudyRegister.aspx`);

    console.log(`Chọn Khóa học: ${step.year}...`)
    const mountYears = await page.evaluate(mountYear);
    await page.select('select[name="drpAcademicYear"]', mountYears[step.year])
    await page.waitForNavigation()

    console.log(`Chọn Khóa học: ${step.courses[0].name}...`)
    const mountCourses = await page.evaluate(mountCourse);
    await page.select('select[name="drpCourse"]', mountCourses[step.courses[0].name])
    await page.click('input[name="btnViewCourseClass"]')

    await page.waitForNavigation();
    console.log("Chụp màn hình....")
    await page.screenshot({ path: 'example.png' })
}