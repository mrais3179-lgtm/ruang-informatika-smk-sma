/* ============================================ */
/* SCRIPT.JS - Interaktivitas Website           */
/* Dibuat untuk: Belajar Informatika SMK Fase E */
/* ============================================ */

// Tunggu sampai seluruh halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. NAVBAR SCROLL EFFECT
    // ============================================
    // Mengubah tampilan navbar saat di-scroll
    const navbar = document.getElementById('mainNav');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // ============================================
    // 2. SMOOTH SCROLLING UNTUK NAVIGASI
    // ============================================
    // Saat klik menu navbar, halus scroll ke section tujuan
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah perilaku default link

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Hitung offset karena navbar fixed
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Tutup navbar mobile jika terbuka
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // ============================================
    // 3. ACTIVE NAV LINK ON SCROLL
    // ============================================
    // Menandai menu aktif berdasarkan posisi scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navHeight = navbar.offsetHeight;

            if (scrollY >= (sectionTop - navHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // 4. BACK TO TOP BUTTON
    // ============================================
    // Tombol kembali ke atas muncul saat scroll
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // 5. ANIMASI CARD SAAT SCROLL (SCROLL REVEAL)
    // ============================================
    // Card muncul dengan animasi saat masuk viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Terapkan observer ke semua card
    const cards = document.querySelectorAll('.materi-card, .video-card, .artikel-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0'; // Sembunyikan dulu
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // ============================================
    // 6. TAB MATERI - SIMPAN STATE
    // ============================================
    // Ingat tab terakhir yang dibuka (opsional)
    const materiTab = document.getElementById('materiTab');
    if (materiTab) {
        materiTab.addEventListener('shown.bs.tab', function(e) {
            // Bisa ditambahkan localStorage jika diperlukan
            console.log('Tab aktif:', e.target.id);
        });
    }

    // ============================================
    // 7. EFEK HOVER PADA CARD MATERI
    // ============================================
    // Tambahkan efek tilt 3D ringan saat hover (opsional enhancement)
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ============================================
    // FUNGSI UTILITAS: Toast Notification
    // ============================================
    function showToast(message) {
        // Buat elemen toast
        const toast = document.createElement('div');
        toast.className = 'position-fixed top-0 start-50 translate-middle-x p-3';
        toast.style.zIndex = '9999';
        toast.style.marginTop = '80px';

        toast.innerHTML = `
            <div class="toast show align-items-center text-white bg-primary border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas fa-info-circle me-2"></i>${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;

        document.body.appendChild(toast);

        // Hapus toast setelah 3 detik
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // ============================================
    // 9. LOADING ANIMATION (Simulasi)
    // ============================================
    // Efek loading halus saat pertama kali buka
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // ============================================
    // 10. KEYBOARD NAVIGATION SUPPORT
    // ============================================
    // Dukungan navigasi dengan keyboard
    document.addEventListener('keydown', function(e) {
        // Tekan 'Home' untuk ke atas
        if (e.key === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Tekan 'End' untuk ke bawah
        if (e.key === 'End') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });

    console.log('✅ Website Belajar Informatika SMK siap digunakan!');
    console.log('📚 Materi: Berpikir Komputasional & Literasi Digital');
    console.log('🎯 Target: Siswa SMK Kelas X (Fase E)');

}); // End DOMContentLoaded