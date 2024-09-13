document.addEventListener('DOMContentLoaded', () => {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
        const currentUser = JSON.parse(currentUserData);
        const displayName = currentUser.displayName;

        document.getElementById('userDisplay').textContent = displayName;
        document.getElementById('userDisplayName').textContent = displayName;
        document.getElementById('staffName').value = displayName; // ตั้งค่าให้ฟิลด์เจ้าหน้าที่
    }

    const now = new Date();
    const formattedDateTime = `${now.toISOString().split('T')[0]}T${now.toTimeString().slice(0, 5)}`; // ใช้ split และ slice แยกและรวมใหม่เป็นรูปแบบที่ถูกต้อง
    const borrowDateElement = document.getElementById('borrowDate');
    if (borrowDateElement) {
        borrowDateElement.value = formattedDateTime;
    }
});


// ฟังก์ชันออกจากระบบ
document.getElementById('logoutButton').addEventListener('click', () => {
    Swal.fire({
        icon: 'info',
        title: 'ออกจากระบบสำเร็จ',
        text: 'คุณจะถูกนำกลับไปที่หน้าเข้าสู่ระบบ',
        confirmButtonText: 'ตกลง'
    }).then(() => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});

// ฟังก์ชันสำหรับจัดการการส่งฟอร์มยืมอุปกรณ์
document.getElementById('borrowForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // รับค่าจากฟอร์ม
    const borrowDate = document.getElementById('borrowDate').value;
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const equipment = document.getElementById('equipment').value;
    const staffName = document.getElementById('staffName').value; 

    // สร้างออบเจ็กต์คำขอ
    const request = {
        id: Date.now(), 
        dateTime: borrowDate,
        studentId,
        studentName,
        equipment,
        staffName, 
        type: 'ยืม',
        status: 'รออนุมัติ'
    };

    // ดึงคำขอทั้งหมดจาก Local Storage
    let requests = JSON.parse(localStorage.getItem('requests')) || [];

    // ตรวจสอบจำนวนคำขอ
    const maxRequestsPerPage = 4;
    const totalPages = 100;

    if (requests.length >= maxRequestsPerPage * totalPages) {
        Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถบันทึกคำขอได้อีกต่อไป',
            text: 'จำนวนคำขอเต็มแล้ว',
            confirmButtonText: 'ตกลง'
        });
        return;
    }

    // เพิ่มคำขอใหม่เข้าไป
    requests.push(request);

    // บันทึกกลับไปที่ Local Storage
    localStorage.setItem('requests', JSON.stringify(requests));

    // แสดงการแจ้งเตือนหลังจากบันทึกคำขอสำเร็จ
     Swal.fire({
         icon: 'success',
         title: 'คำขอถูกบันทึกสำเร็จ!',
         text: 'คำขอของคุณถูกบันทึกแล้ว',
         confirmButtonText: 'ตกลง'
     }).then(() => {
         // ล้างข้อมูลในฟอร์ม
         document.getElementById('borrowForm').reset();
     });
});






 


// แสดงการโหลดขณะส่งคำขอ                                          
// Swal.fire({
//     title: 'กำลังส่งคำขอ...',
//     text: 'กรุณารอสักครู่',
//     allowOutsideClick: false,
//     didOpen: () => {
//         Swal.showLoading();
//     }
// });


// Send data to Google Sheets via Apps Script Web App ส่งข้อมูลไปยัง Google Sheets 
// fetch('', {
//     method: 'POST',
//     body: new URLSearchParams({ 
//         dateTime: borrowDate,
//         studentId: studentId,
//         studentName: studentName,
//         equipment: equipment,
//         staffName: staffName // 
//     }),
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
// })
//     .then(response => response.text())
//     .then(data => {
//         console.log(data); // For debugging purposes
//         Swal.fire({
//             icon: 'success',
//             title: 'สำเร็จ!',
//             text: 'คำขอยืมถูกส่งแล้ว',
//             confirmButtonText: 'ตกลง'
//         }).then(() => {
//             // หลังจากกดตกลง ให้ทำการล้างข้อมูลในฟอร์ม
//             document.getElementById('borrowForm').reset();
//         });
//     })
// .catch(error => {
//     console.error('Error:', error);
//     Swal.fire({
//         icon: 'error',
//         title: 'เกิดข้อผิดพลาด',
//         text: 'กรุณาลองใหม่',
//         confirmButtonText: 'ตกลง'
//     });
// });