document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('updateAllChartsButton').addEventListener('click',updateData)
    updateData();
})

function updateData(){
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const apiEndpoints = [
        { url: "api/count-customer", elementId: "countCustomer" },
        { url: "api/totalsum", elementId: "totalsum" ,format: formatCurrency},
        { url: "api/countOrder", elementId: "countOrder" },
    ];
    console.log(apiEndpoints);
    apiEndpoints.forEach(endpoint => {
        fetchApiStatisticWithDateRange(endpoint.url, startDate, endDate, endpoint.elementId, endpoint.format);
    });
}

/**
 * 
 * @param {string} url - Đường dẫn API
 * @param {string} startDate - Ngày bắt đầu (có thể null)
 * @param {string} endDate - Ngày kết thúc (có thể null)
 * @param {string} elementId - ID của phần tử cần cập nhật
 * @param {function} [formatter] - Hàm định dạng dữ liệu trước khi hiển thị (tuỳ chọn)
 */

function fetchApiStatisticWithDateRange(url, startDate, endDate, elementId, formatter = null) {
    // Gắn tham số ngày vào URL nếu có
    let apiUrl = url;
    if (startDate || endDate) {
        apiUrl += `?startDate=${startDate}&endDate=${endDate}`;
    }
    console.log(url);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (formatter) {
                // Chắc chắn rằng data.total tồn tại trước khi định dạng
                element.textContent = formatter(data.total);
            } else {
                element.textContent = data || 0; // Hiển thị 0 nếu dữ liệu không hợp lệ
            }
        })
        .catch(error => {
            console.error(`Lỗi khi gọi API ${apiUrl}:`, error);
            document.getElementById(elementId).textContent = "Lỗi";
        });
}
/**
 * Hàm định dạng tiền tệ
 * @param {number} amount - Số tiền cần định dạng
 * @returns {string} Chuỗi đã định dạng
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}