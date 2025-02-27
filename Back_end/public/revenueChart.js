let orderChart; // Khai báo biến cho biểu đồ đơn hàng

function initOrderChart(labels,data) {
    // Kiểm tra xem biểu đồ đã tồn tại chưa, nếu có thì hủy nó
    if (orderChart) {
        orderChart.destroy();
    }

    // Lấy ngữ cảnh của canvas để vẽ biểu đồ
    const ctx = document.getElementById('revenueChart').getContext("2d");

    // Khởi tạo biểu đồ mới
    orderChart = new Chart(ctx, {
        type: "bar", // Loại biểu đồ
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // Nhãn cho trục x
            datasets: [
                {
                    label: "Đơn hàng", // Nhãn cho dataset
                    data: [12, 19, 3, 5, 2, 3], // Dữ liệu cho biểu đồ
                    backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền
                    borderColor: "rgba(153, 102, 255, 1)", // Màu viền
                    borderWidth: 2, // Độ dày viền
                },
            ],
        },
        options: {
            responsive: true, // Kích thước biểu đồ tự động thay đổi theo kích thước màn hình
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Thời gian", // Tiêu đề cho trục x
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Số lượng đơn hàng", // Tiêu đề cho trục y
                    },
                    beginAtZero: true, // Bắt đầu trục y từ 0
                },
            },
        },
    });
}
initOrderChart()

// function updateOrderChar(startDate,endDate){
//     const url = '/api/order-chart';
//     if(startDate && endDate){
//         url+=`?start_date=${startDate}&end_date=${endDate}`;
//     }
    
//     fetch(url)
//     .then((response)=>response.json()).then((data)=>{
//         var label = data.map((item)=>{
//             console.log(item.date);
//             let date = new Date(item.date);

//         })
//     })
// }
// Gọi hàm initOrderChart với dữ liệu cụ thể
// Bạn cần phải cung cấp `labels` và `data` trước khi gọi hàm này
// Ví dụ:
// const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3'];
// const data = [10, 20, 30];
// initOrderChart(labels, data);