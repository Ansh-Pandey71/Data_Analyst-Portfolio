// ==============================
// COMPLETE PORTFOLIO SCRIPT
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1️⃣ MOBILE HAMBURGER NAVIGATION
    // ==========================================

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close menu when clicking any nav link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }


    // ==========================================
    // 2️⃣ SCROLL REVEAL ANIMATION
    // ==========================================

    const sections = document.querySelectorAll(".scroll-animate");

    function revealOnScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.85;

            if (sectionTop < triggerPoint) {
                section.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);

    // Run once on page load
    revealOnScroll();


    // ==========================================
    // 3️⃣ HERO TYPING ANIMATION
    // ==========================================

    const roles = [
        "Data Analyst",
        "Data Scientist",
        "AI/ML Enthusiast"
    ];

    const typingElement = document.querySelector(".typing");

    if (typingElement) {

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {

            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    setTimeout(() => isDeleting = true, 1200);
                }

            } else {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            setTimeout(typeEffect, isDeleting ? 60 : 110);
        }

        typeEffect();
    }

});

// =======================
// SKILLS CIRCLE SAFE ANIMATION
// =======================

document.addEventListener("DOMContentLoaded", function () {

    const circles = document.querySelectorAll(".circle");

    circles.forEach(function (circle) {

        const target = Number(circle.getAttribute("data-value"));
        const span = circle.querySelector("span");

        let current = 0;

        // Safety check
        if (isNaN(target) || target > 100) return;

        const animate = setInterval(function () {

            if (current >= target) {
                clearInterval(animate);
                current = target; // lock final value
            } else {
                current++;
            }

            circle.style.setProperty("--value", current);
            span.textContent = current + "%";

        }, 20); // speed control

    });

});


