module.exports = async function (dialog) {

    console.log(dialog.message());
    await dialog.accept();

}