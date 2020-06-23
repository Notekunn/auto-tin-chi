module.exports = function () {
    const years = {}
    document.querySelectorAll(`select[name="drpAcademicYear"] option`).forEach(function (e, i) {
        years[e.textContent] = e.value;
    })
    return years;
}