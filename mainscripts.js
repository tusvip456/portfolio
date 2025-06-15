// Translations data
        const translations = {
            "en": {
                "page_title": "Trinh Hoang Tu Portfolio",
                "nav_home": "Home",
                "nav_tech": "Technology",
                "nav_projects": "Projects",
                "nav_contact": "Contact",
                "home_title": "Hi, I'm Trinh Hoang Tu",
                "home_subtitle": "A Cybersecurity Enthusiast with a Passion for Code",
                "progress_label": "Journey until graduation",
                "tech_section_title": "Technology & Skills",
                "project_section_title": "Projects",
                "proj_flight_title": "Flight Reservation",
                "proj_flight_desc": "Full-stack flight booking web app with user login, search, and ticket management using MVC and secure authentication.",
                "proj_computer_store_title": "Computer Store",
                "proj_computer_store_desc": "E-commerce site for Browse and buying computers, with admin and user panels.",
                "proj_face_recognition_title": "Face Recognition",
                "proj_face_recognition_desc": "Client-server system using WebSocket and external API for facial analysis.",
                "view_all_projects": "View All Projects",
                "contact_section_title": "Contact Information",
                "contact_linkedin": "LinkedIn",
                "contact_facebook": "Facebook",
                "contact_github": "GitHub",
                "contact_leetcode": "LeetCode",
                "contact_tiktok": "TikTok",
                "contact_discord": "Discord",
                "status_completed": "Completed",
                "cv_title": "CV - Trinh Hoang Tu",
                "footer_build_with": "Build with"
            },
            "vn": {
                "page_title": "Portfolio Trịnh Hoàng Tú",
                "nav_home": "Trang chủ",
                "nav_tech": "Công nghệ",
                "nav_projects": "Dự án",
                "nav_contact": "Thông tin",
                "home_title": "Chào, tôi là Trịnh Hoàng Tú",
                "home_subtitle": "Người đam mê An ninh mạng và Lập trình",
                "progress_label": "Hành trình cho tới khi tốt nghiệp",
                "tech_section_title": "Công nghệ & Kỹ năng",
                "project_section_title": "Dự án",
                "proj_flight_title": "Đặt Vé Máy Bay",
                "proj_flight_desc": "Hệ thống đặt vé máy bay full-stack với chức năng đăng nhập, tìm kiếm và quản lý vé sử dụng MVC và xác thực bảo mật.",
                "proj_computer_store_title": "Cửa Hàng Máy Tính",
                "proj_computer_store_desc": "Trang web thương mại điện tử để duyệt và mua máy tính, với bảng điều khiển quản trị và người dùng.",
                "proj_face_recognition_title": "Nhận Diện Khuôn Mặt",
                "proj_face_recognition_desc": "Hệ thống Client-Server sử dụng WebSocket và API bên ngoài để phân tích khuôn mặt.",
                "view_all_projects": "Xem tất cả dự án",
                "contact_section_title": "Thông tin liên hệ",
                "contact_linkedin": "LinkedIn",
                "contact_facebook": "Facebook",
                "contact_github": "GitHub",
                "contact_leetcode": "LeetCode",
                "contact_tiktok": "TikTok",
                "contact_discord": "Discord",
                "status_completed": "Đã hoàn thành",
                "cv_title": "CV - Trịnh Hoàng Tú",
                "footer_build_with": "Được xây dựng với"
            }
        };

        function setLanguage(lang) {
            const elements = document.querySelectorAll('[data-i18n]');

            // Thêm class để bắt đầu fade-out
            elements.forEach(element => {
                element.classList.add('fade-out');
            });

            // Đợi hiệu ứng fade-out hoàn tất rồi mới đổi text và fade-in
            setTimeout(() => {
                elements.forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (translations[lang] && translations[lang][key]) {
                        element.textContent = translations[lang][key];
                    }
                    // Bỏ class để bắt đầu fade-in
                    element.classList.remove('fade-out');
                });

                document.title = translations[lang]["page_title"];

                document.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
                });

                localStorage.setItem('language', lang);
            }, 150); // Thời gian chờ bằng một nửa thời gian transition
        }

        // Initialize language
        const defaultLanguage = localStorage.getItem('language') || 'en'; // Default to English
        setLanguage(defaultLanguage);

        // Language Switcher Event Listeners
        document.getElementById('langEn').addEventListener('click', () => setLanguage('en'));
        document.getElementById('langVn').addEventListener('click', () => setLanguage('vn'));

        // Splash Screen Logic
        document.addEventListener('DOMContentLoaded', () => {
            const splashScreen = document.getElementById('splashScreen');
            const isFirstVisit = sessionStorage.getItem('visited') === null; // Use sessionStorage for session-based splash

            if (isFirstVisit) {
                splashScreen.style.display = 'flex';
                sessionStorage.setItem('visited', 'true');

                setTimeout(() => {
                    splashScreen.classList.add('fade-out');
                    setTimeout(() => {
                        splashScreen.style.display = 'none';
                    }, 500);
                }, 1500);
            } else {
                splashScreen.style.display = 'none';
            }

            // Delay typing effect and progress bar animation after splash screen is handled
            const splashScreenDelay = isFirstVisit ? 1500 : 0;

            setTimeout(() => {
                const titleElement = document.querySelector('.home-content h1');
                // ĐIỀU KIỆN KIỂM TRA 
                if (titleElement && !sessionStorage.getItem('typewriterDone')) {
                    const originalText = titleElement.getAttribute('data-i18n');
                    typeWriter(titleElement, translations[defaultLanguage][originalText], 80);
                }
                animateProgress();
            }, splashScreenDelay);
            const container = document.getElementById('techCarouselContainer');
            const carousel = document.getElementById('techCarousel');
            const leftBtn = document.getElementById('techScrollLeft');
            const rightBtn = document.getElementById('techScrollRight');

            if (!carousel) return; // Dừng lại nếu không tìm thấy carousel

            //Logic đếm lượt truy cập
            function updateVisitorCount() {
                const namespace = 'trinhhoangtu'; // Namespace của bạn, có thể đổi
                const key = 'portfolio'; // Key cho bộ đếm này

                // Gọi API, endpoint /hit sẽ tự động +1 và trả về giá trị mới
                fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
                    .then(response => response.json())
                    .then(data => {
                        // Lấy được dữ liệu, cập nhật vào thẻ span
                        const countElement = document.getElementById('visitor-count');
                        if (countElement) {
                            countElement.textContent = data.value.toLocaleString('vi-VN');
                        }
                    })
                    .catch(error => {
                        // Nếu có lỗi (API sập, bị chặn), hiển thị 'N/A'
                        const countElement = document.getElementById('visitor-count');
                        if (countElement) {
                            countElement.textContent = 'N/A';
                        }
                        console.error('Lỗi khi lấy số lượt truy cập:', error);
                    });
            }

            // Gọi hàm để bắt đầu đếm   
            updateVisitorCount();
            // ---- 1. Nhân đôi các item để tạo không gian cho hiệu ứng lặp ----
            const originalItems = Array.from(carousel.children);
            originalItems.forEach(item => {
                carousel.appendChild(item.cloneNode(true));
            });

            function typeWriter(element, text, speed = 100) {
                let i = 0;
                element.innerHTML = '';
                let timer = setInterval(() => {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                        // THÊM DÒNG NÀY ĐỂ ĐÁNH DẤU HIỆU ỨNG ĐÃ CHẠY
                        sessionStorage.setItem('typewriterDone', 'true');
                    }
                }, speed);
            }

            // Theme Toggle
            const themeToggle = document.getElementById('themeToggle');
            const body = document.body;
            const themeIcon = themeToggle.querySelector('i');

            // Load saved theme
            const savedTheme = localStorage.getItem('theme') ||
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            body.setAttribute('data-theme', savedTheme);
            themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

            themeToggle.addEventListener('click', function () {
                const currentTheme = body.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';

                body.setAttribute('data-theme', newTheme);
                themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
                localStorage.setItem('theme', newTheme);
            });

            // Progress Bar Calculation
            function calculateProgress() {
                const startDate = new Date('2023-09-01'); // Your start date
                const endDate = new Date('2027-07-31');   // Your end date (graduation)
                const currentDate = new Date();

                const totalDuration = endDate - startDate;
                const elapsed = currentDate - startDate;
                const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

                return Math.round(progress);
            }

            // Animate Progress Bar
            function animateProgress() {
                const progressFill = document.getElementById('progressFill');
                const progressPercentage = document.getElementById('progressPercentage');
                const progress = calculateProgress();

                progressFill.style.setProperty('--progress-width', progress + '%');
                progressFill.style.width = progress + '%';

                let current = 0;
                const increment = progress / 50; // Controls animation steps
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= progress) {
                        current = progress;
                        clearInterval(timer);
                    }
                    progressPercentage.textContent = Math.round(current) + '%';
                }, 40); // Interval speed
            }


            // Back to Top Button
            const backToTopBtn = document.getElementById('backToTop');
            const logo = document.querySelector('.logo'); // Thêm dòng này
            const homeSection = document.getElementById('home');

            window.addEventListener('scroll', function () {
                if (window.pageYOffset > 300) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.pointerEvents = 'auto';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.pointerEvents = 'none';
                }
                if (window.pageYOffset > homeSection.offsetHeight / 2) {
                    logo.classList.add('visible');
                } else {
                    logo.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // CV Overlay
            const viewCVBtn = document.getElementById('viewCV');
            const cvOverlay = document.getElementById('cvOverlay');
            const closeCVBtn = document.getElementById('closeCV');

            viewCVBtn.addEventListener('click', function () {
                cvOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            });

            closeCVBtn.addEventListener('click', function () {
                cvOverlay.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling background
            });

            cvOverlay.addEventListener('click', function (e) {
                if (e.target === cvOverlay) {
                    cvOverlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerOffset = document.querySelector('header').offsetHeight;
                        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target); // Stop observing once animated
                    }
                });
            }, observerOptions);

            // Observe all cards and sections
            document.querySelectorAll('.tech-item, .project-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
                observer.observe(el);
            });

            // Add typing effect for the main title
            function typeWriter(element, text, speed = 100) {
                let i = 0;
                element.innerHTML = '';
                let timer = setInterval(() => {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                    }
                }, speed);
            }

            // Mobile menu toggle
            function createMobileMenu() {
                const nav = document.querySelector('nav');
                const navLinks = document.querySelector('.nav-links');

                const mobileMenuBtn = document.createElement('button');
                mobileMenuBtn.className = 'mobile-menu-btn';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.style.cssText = `
                display: none; /* Hidden by default */
                background: var(--gradient);
                border: none;
                color: white;
                padding: 0.5rem;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1.2rem;
            `;

                nav.insertBefore(mobileMenuBtn, document.querySelector('.language-switcher') || document.querySelector('.theme-toggle')); // Insert before lang or theme

                mobileMenuBtn.addEventListener('click', function () {
                    navLinks.classList.toggle('mobile-open');
                });

                // Close mobile menu when a link is clicked
                navLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        navLinks.classList.remove('mobile-open');
                    });
                });

                const mobileStyle = document.createElement('style');
                mobileStyle.textContent = `
                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block !important;
                    }

                    .nav-links {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background: var(--card-color);
                        flex-direction: column;
                        padding: 1rem 0;
                        box-shadow: 0 5px 15px var(--shadow);
                        transform: translateY(-100%);
                        opacity: 0;
                        pointer-events: none;
                        transition: all 0.3s ease;
                    }

                    .nav-links.mobile-open {
                        display: flex !important;
                        transform: translateY(0);
                        opacity: 1;
                        pointer-events: auto;
                    }

                    .nav-links li {
                        text-align: center;
                        padding: 0.5rem 0;
                    }

                    .tech-carousel-wrapper { /* Adjust for mobile buttons */
                        margin: 0;
                    }
                    .scroll-btn.left {
                        left: 5px;
                    }
                    .scroll-btn.right {
                        right: 5px;
                    }
                     .language-switcher { /* Adjust for mobile layout */
                        margin-left: 0;
                        margin-top: 10px; /* Space between nav links and lang switcher in mobile menu */
                        justify-content: center; /* Center buttons in mobile menu */
                        width: 100%;
                    }
                }
            `;
                document.head.appendChild(mobileStyle);
            }

            createMobileMenu();

            // Add some interactive effects
            document.querySelectorAll('.tech-item').forEach(item => {
                item.addEventListener('mouseenter', function () {
                    this.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)';
                });

                item.addEventListener('mouseleave', function () {
                    this.style.background = 'var(--card-color)';
                });
            });

            // Parallax effect for home section (background image)
            window.addEventListener('scroll', function () {
                const scrolled = window.pageYOffset;
                const homeBg = document.querySelector('.home-bg');
                const speed = scrolled * 0.2; /* Adjust parallax speed */

                if (homeBg) {
                    homeBg.style.backgroundPosition = `center calc(50% + ${speed}px)`;
                }
            });


            window.addEventListener('pageshow', function (event) {
                // Luôn cập nhật lại ngôn ngữ cho toàn bộ trang để đảm bảo tính nhất quán
                const currentLanguage = localStorage.getItem('language') || 'en';
                setLanguage(currentLanguage);

                
            });
            const progressBar = document.getElementById('progressBar');
            const progressTooltip = document.getElementById('progressTooltip');
            const startDate = new Date('2023-09-01');
            const endDate = new Date('2027-07-31');

            // Hàm cập nhật nội dung cho tooltip
            function updateProgressTooltip() {
                const currentDate = new Date();
                const totalDuration = endDate - startDate;
                const elapsed = currentDate - startDate;

                // Tính toán chi tiết
                const progressExact = (elapsed / totalDuration) * 100;
                const daysElapsed = Math.floor(elapsed / (1000 * 60 * 60 * 24));
                const daysTotal = Math.floor(totalDuration / (1000 * 60 * 60 * 24));
                const daysRemaining = daysTotal - daysElapsed;

                // Định dạng ngày tháng
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                const startDateFormatted = startDate.toLocaleDateString('vi-VN', options);
                const endDateFormatted = endDate.toLocaleDateString('vi-VN', options);

                // Tạo nội dung HTML cho tooltip
                progressTooltip.innerHTML = `
    <strong>${progressExact.toFixed(2)}%</strong> Hoàn thành<br>
    <em style="color: #ffd700;">🎓 Mình đã đi được chừng này chặng đường rồi, cố gắng lên!</em><br>
    <hr style="border-color: rgba(255,255,255,0.2); margin: 4px 0;">
    Đã qua: ${daysElapsed} ngày<br>
    Còn lại: ${daysRemaining} ngày<br>
    Bắt đầu: ${startDateFormatted}<br>
    Kết thúc: ${endDateFormatted}
`;

            }

            // Cập nhật vị trí tooltip theo con trỏ chuột
            progressBar.addEventListener('mousemove', function (e) {
                // Lấy vị trí của thanh progress so với viewport
                const rect = progressBar.getBoundingClientRect();
                // Tính vị trí của chuột bên trong thanh progress
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Cập nhật vị trí cho tooltip (với một chút offset để không che con trỏ)
                progressTooltip.style.left = `${x}px`;
                progressTooltip.style.top = `${y - 80}px`; // -80 để tooltip hiện bên trên
            });

            // Gọi hàm để tạo nội dung cho tooltip khi tải trang
            updateProgressTooltip();
            // Tự động cập nhật năm và ngày
            document.getElementById('currentYear').textContent = new Date().getFullYear();
            document.getElementById('lastUpdated').textContent = new Date().toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });


            // ---- 2. Thiết lập các biến trạng thái cho animation ----
            let position = 0;
            const speed = 1; // Tốc độ cuộn, bạn có thể chỉnh số này (lớn hơn là nhanh hơn)
            let isPaused = false;
            let animationFrameId;

            const firstSetWidth = carousel.scrollWidth / 2;

            // ---- 3. Hàm animation chính sử dụng requestAnimationFrame ----
            function animateCarousel() {
                if (!isPaused) {
                    // Di chuyển vị trí sang trái
                    position -= speed;

                    // "Dịch chuyển tức thời" khi cuộn hết set item đầu tiên
                    // Đây là mấu chốt của việc lặp vô hạn mượt mà
                    if (Math.abs(position) >= firstSetWidth) {
                        position += firstSetWidth;
                    }

                    // Áp dụng vị trí mới vào CSS transform
                    carousel.style.transform = `translateX(${position}px)`;
                }

                // Gọi lại chính nó để tạo vòng lặp animation
                animationFrameId = requestAnimationFrame(animateCarousel);
            }

            // ---- 4. Xử lý sự kiện cho nút bấm ----
            function manualScroll(direction) {
                // direction là 1 (phải) hoặc -1 (trái)
                const scrollAmount = 300; // Khoảng cách mỗi lần nhấn nút
                position -= scrollAmount * direction;

                // Xử lý tràn lề khi nhấn nút
                // Nếu cuộn phải quá nhiều, quay lại từ đầu
                if (position < -firstSetWidth) {
                    position += firstSetWidth;
                }
                // Nếu cuộn trái quá nhiều, đi đến cuối
                if (position > 0) {
                    position -= firstSetWidth;
                }

                carousel.style.transition = 'transform 0.5s ease'; // Thêm hiệu ứng mượt khi nhấn nút
                carousel.style.transform = `translateX(${position}px)`;

                // Bỏ transition sau khi chạy xong để animation tự động không bị ảnh hưởng
                setTimeout(() => {
                    carousel.style.transition = 'none';
                }, 500);
            }

            leftBtn.addEventListener('click', () => manualScroll(-1));
            rightBtn.addEventListener('click', () => manualScroll(1));

            // ---- 5. Xử lý tạm dừng/tiếp tục khi hover chuột ----
            container.addEventListener('mouseenter', () => {
                isPaused = true;
            });

            container.addEventListener('mouseleave', () => {
                isPaused = false;
            });

            // ---- 6. Khởi chạy animation ----
            // Đặt một vị trí ban đầu để tránh trường hợp bắt đầu từ rìa
            carousel.style.transform = `translateX(0px)`;
            startAnimation();

            function startAnimation() {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                animateCarousel();
            }
        });