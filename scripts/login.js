module.exports = async function (page) {
    console.log("Đăng nhập...");
    await page.goto(`${process.env.HOST}/CMCSoft.IU.Web.info/Login.aspx`);

    console.log(`Mã sinh viên: ${process.env.STUDENT_CODE}`);
    await page.type('input[name="txtUserName"]', process.env.STUDENT_CODE);
    console.log(`Mật khẩu: ${process.env.PASSWORD}`);
    await page.type('input[name="txtPassword"]', process.env.PASSWORD);
    console.log(`Tiến hành đăng nhập`);
    await page.click('input[name="btnSubmit"]');
}