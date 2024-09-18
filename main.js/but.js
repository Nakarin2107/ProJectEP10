document.addEventListener('DOMContentLoaded', () => {
    // ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่จาก Local Storage
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        // หากไม่มีข้อมูลผู้ใช้ให้กลับไปที่หน้า Login
        redirectToLogin();
        return;
    }

    try {
        // แปลงข้อมูล JSON ที่เก็บไว้ใน Local Storage ให้เป็น Object
        const user = JSON.parse(currentUser);
        
        // ตรวจสอบว่ามีข้อมูล displayName หรือไม่
        if (!user.displayName) {
            throw new Error('User data is incomplete: missing displayName');
        }

        // ตรวจสอบ Element ที่จะใช้แสดงชื่อผู้ใช้
        const userDisplay = document.getElementById('userDisplay');
        const userDisplayName = document.getElementById('userDisplayName');

        // อัปเดตชื่อผู้ใช้ในส่วนต่าง ๆ
        if (userDisplay) userDisplay.textContent = user.displayName;
        if (userDisplayName) userDisplayName.textContent = user.displayName;

    } catch (error) {
        console.error('Error loading user data:', error.message);
        redirectToLogin();
    }
});

// ฟังก์ชันสำหรับเปลี่ยนหน้าไปยังหน้า login
function redirectToLogin() {
    window.location.href = 'login.html';
}


        // ฟังก์ชันสำหรับออกจากระบบ
        document.getElementById('logoutButton').addEventListener('click', () => {
            Swal.fire({
                title: 'คุณแน่ใจหรือไม่?',
                text: "คุณต้องการออกจากระบบหรือไม่?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ออกจากระบบ',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.isConfirmed) {
                    // ลบข้อมูลการเข้าสู่ระบบจาก Local Storage
                    localStorage.removeItem('currentUser'); // ลบสถานะผู้ใช้ที่กำลังล็อกอิน
                    Swal.fire({
                        icon: 'success',
                        title: 'ออกจากระบบสำเร็จ!',
                        text: 'คุณได้ออกจากระบบแล้ว',
                        confirmButtonText: 'ตกลง'
                    }).then(() => {
                        window.location.href = 'login.html'; // นำผู้ใช้กลับไปที่หน้า Login
                    });
                }
            });
        });
