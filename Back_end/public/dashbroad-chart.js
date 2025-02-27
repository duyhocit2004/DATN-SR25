document.getElementById('updateAllChartsButton').addEventListener('click', function () {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert("Vui lòng chọn khoảng thời gian.");
        return;
    }

    if (startDate > endDate) {
        alert('Ngày kết thúc phải sau ngày bắt đầu!');
        return;
    }

    const dateRangeEvent = new CustomEvent('dateRangeChange', {
        detail: { startDate, endDate },
    });
    document.dispatchEvent(dateRangeEvent);
});