module.exports = async function (page) {    
    await page.goto(`${process.env.HOST}/CMCSoft.IU.Web.info/Login.aspx`)
    await page.type('input[name="txtUserName"]', process.env.STUDENT_CODE);
    await page.type('input[name="txtPassword"]', process.env.PASSWORD);
    await page.click('input[name="btnSubmit"]');
}