module.exports = function () {
    const courses = {}
    document.querySelectorAll(`select[name="drpCourse"] option`).forEach(function (e, i) {
        const name = (e.textContent.split('(')[0] || '').trim();
        courses[name] = e.value;
    })
    return courses;
}