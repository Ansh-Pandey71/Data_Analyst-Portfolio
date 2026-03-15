document.addEventListener("DOMContentLoaded", function () {

    // ============================================================
    // 1. HAMBURGER NAVIGATION
    // ============================================================

    const hamburger = document.getElementById("hamburger");
    const navLinks  = document.getElementById("navLinks");

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }


    // ============================================================
    // 2. HELPER — Reset & Animate Any Element
    // ============================================================

    function resetAndAnimate(el, fromStyle, toStyle, delay = 0) {
        Object.assign(el.style, fromStyle, { transition: "none" });
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
                Object.assign(el.style, toStyle);
            });
        });
    }


    // ============================================================
    // 3. SCROLL ANIMATE SECTIONS
    // ============================================================

    const scrollSections = document.querySelectorAll(".scroll-animate");

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting)
                entry.target.classList.add("active");
            else
                entry.target.classList.remove("active");
        });
    }, { threshold: 0.15 });

    scrollSections.forEach(s => sectionObserver.observe(s));


    // ============================================================
    // 4. HERO SECTION — Slide In Left/Right
    // ============================================================

    const heroText    = document.querySelector(".hero-text");
    const heroImage   = document.querySelector(".hero-image");
    const heroSection = document.querySelector("#home");

    if (heroText)  Object.assign(heroText.style,  { opacity: "0", transform: "translateX(-50px)" });
    if (heroImage) Object.assign(heroImage.style, { opacity: "0", transform: "translateX(50px)"  });

    if (heroSection) {

        const heroObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    if (heroText)
                        resetAndAnimate(heroText,
                            { opacity: "0", transform: "translateX(-50px)" },
                            { opacity: "1", transform: "translateX(0)"     });

                    if (heroImage)
                        resetAndAnimate(heroImage,
                            { opacity: "0", transform: "translateX(50px)" },
                            { opacity: "1", transform: "translateX(0)"    }, 0.2);

                } else {

                    if (heroText)
                        Object.assign(heroText.style,
                            { opacity: "0", transform: "translateX(-50px)", transition: "none" });

                    if (heroImage)
                        Object.assign(heroImage.style,
                            { opacity: "0", transform: "translateX(50px)", transition: "none" });

                }

            });
        }, { threshold: 0.2 });

        heroObserver.observe(heroSection);
    }


    // ============================================================
    // 5. ABOUT SECTION — Slide In + Stat Cards Stagger + COUNTER
    // ============================================================

    const aboutText    = document.querySelector(".about-text");
    const aboutStats   = document.querySelector(".about-stats");
    const aboutSection = document.querySelector("#about");

    if (aboutText)  Object.assign(aboutText.style,  { opacity: "0", transform: "translateX(-60px)" });
    if (aboutStats) Object.assign(aboutStats.style, { opacity: "0", transform: "translateX(60px)"  });
    document.querySelectorAll(".stat-card").forEach(card => {
        Object.assign(card.style, { opacity: "0", transform: "translateY(40px) scale(0.95)" });
    });

    const statConfigs = [
        { target: 4,   suffix: "+",  duration: 2800 },
        { target: 8,   suffix: "+",  duration: 3200 },
        { target: 100, suffix: "%",  duration: 4000 },
        { target: null, text: "Data Analyst"         },
    ];

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateCounter(el, target, suffix, duration) {
        el.textContent = "0" + suffix;
        const startTime = performance.now();

        function tick(now) {
            const elapsed  = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = easeInOutCubic(progress);
            const current  = Math.round(eased * target);
            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target + suffix;
            }
        }

        requestAnimationFrame(tick);
    }

    function runStatCounters() {
        const statCards = document.querySelectorAll(".stat-card");
        statCards.forEach((card, i) => {
            const h3    = card.querySelector("h3");
            const cfg   = statConfigs[i];
            if (!h3 || !cfg) return;

            if (cfg.target === null) {
                h3.textContent = cfg.text;
                return;
            }

            const delay = i * 250;
            h3.textContent = "0" + cfg.suffix;
            setTimeout(() => {
                animateCounter(h3, cfg.target, cfg.suffix, cfg.duration);
            }, delay);
        });
    }

    function resetStatCounters() {
        const statCards = document.querySelectorAll(".stat-card");
        statCards.forEach((card, i) => {
            const h3  = card.querySelector("h3");
            const cfg = statConfigs[i];
            if (!h3 || !cfg) return;
            if (cfg.target === null) {
                h3.textContent = cfg.text;
            } else {
                h3.textContent = "0" + cfg.suffix;
            }
        });
    }

    if (aboutSection) {

        const aboutObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    if (aboutText)
                        resetAndAnimate(aboutText,
                            { opacity: "0", transform: "translateX(-60px)" },
                            { opacity: "1", transform: "translateX(0)"     });

                    if (aboutStats)
                        resetAndAnimate(aboutStats,
                            { opacity: "0", transform: "translateX(60px)" },
                            { opacity: "1", transform: "translateX(0)"    }, 0.2);

                    document.querySelectorAll(".stat-card").forEach((card, i) => {
                        resetAndAnimate(card,
                            { opacity: "0", transform: "translateY(40px) scale(0.95)" },
                            { opacity: "1", transform: "translateY(0) scale(1)"       }, i * 0.1);
                    });

                    setTimeout(runStatCounters, 300);

                } else {

                    if (aboutText)
                        Object.assign(aboutText.style,
                            { opacity: "0", transform: "translateX(-60px)", transition: "none" });

                    if (aboutStats)
                        Object.assign(aboutStats.style,
                            { opacity: "0", transform: "translateX(60px)", transition: "none" });

                    document.querySelectorAll(".stat-card").forEach(card => {
                        Object.assign(card.style,
                            { opacity: "0", transform: "translateY(40px) scale(0.95)", transition: "none" });
                    });

                    resetStatCounters();

                }

            });
        }, { threshold: 0.2 });

        aboutObserver.observe(aboutSection);
    }


    // ============================================================
    // 6. SKILLS SECTION
    // ============================================================

    (function initSkills() {

        const skillsSection = document.querySelector("#skills");
        if (!skillsSection) return;

        const skillCanvas = document.getElementById("skillsBgCanvas");

        if (skillCanvas) {

            const sCtx = skillCanvas.getContext("2d");
            let sW, sH, sRaf;
            const pts = [];

            function sResize() {
                sW = skillCanvas.width  = skillCanvas.offsetWidth;
                sH = skillCanvas.height = skillCanvas.offsetHeight;
                pts.length = 0;
                const n = Math.floor(sW * sH / 13000);
                for (let i = 0; i < n; i++) {
                    pts.push({
                        x:   Math.random() * sW,
                        y:   Math.random() * sH,
                        vx:  (Math.random() - 0.5) * 0.28,
                        vy:  (Math.random() - 0.5) * 0.28,
                        r:   Math.random() * 1.8 + 0.5,
                        a:   Math.random() * 0.3 + 0.08,
                        hue: Math.random() > 0.5 ? 255 : 188,
                    });
                }
            }

            function sDraw(t) {
                sCtx.clearRect(0, 0, sW, sH);

                pts.forEach(p => {
                    p.x = (p.x + p.vx + sW) % sW;
                    p.y = (p.y + p.vy + sH) % sH;
                    const pulse = Math.sin(t * 0.0009 + p.x * 0.02) * 0.06;
                    sCtx.beginPath();
                    sCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    sCtx.fillStyle = `hsla(${p.hue}, 75%, 72%, ${p.a + pulse})`;
                    sCtx.fill();
                });

                for (let i = 0; i < pts.length; i++) {
                    for (let j = i + 1; j < pts.length; j++) {
                        const dx = pts[i].x - pts[j].x;
                        const dy = pts[i].y - pts[j].y;
                        const d  = Math.sqrt(dx * dx + dy * dy);
                        if (d < 95) {
                            sCtx.beginPath();
                            sCtx.moveTo(pts[i].x, pts[i].y);
                            sCtx.lineTo(pts[j].x, pts[j].y);
                            sCtx.strokeStyle = `rgba(167, 139, 250, ${(1 - d / 95) * 0.07})`;
                            sCtx.lineWidth   = 0.5;
                            sCtx.stroke();
                        }
                    }
                }

                sRaf = requestAnimationFrame(sDraw);
            }

            const skillBgObs = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    cancelAnimationFrame(sRaf);
                    sRaf = requestAnimationFrame(sDraw);
                } else {
                    cancelAnimationFrame(sRaf);
                }
            }, { threshold: 0.01 });

            skillBgObs.observe(skillsSection);
            window.addEventListener("resize", sResize);
            sResize();
        }

        const CIRCUM = 2 * Math.PI * 52;

        function fillCircles() {
            document.querySelectorAll(".circle-fill").forEach((ring, i) => {
                const val    = parseFloat(ring.getAttribute("data-value")) || 0;
                const offset = CIRCUM - (val / 100) * CIRCUM;

                ring.style.transition       = "none";
                ring.style.strokeDashoffset = CIRCUM;

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        ring.style.transition       = `stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.12}s`;
                        ring.style.strokeDashoffset = offset;
                    });
                });
            });
        }

        function resetCircles() {
            document.querySelectorAll(".circle-fill").forEach(ring => {
                ring.style.transition       = "none";
                ring.style.strokeDashoffset = CIRCUM;
            });
        }

        function runCounters() {
            document.querySelectorAll(".circle-percent").forEach((el, i) => {
                const target = parseInt(el.getAttribute("data-target"), 10) || 0;
                el.textContent = "0%";
                let current = 0;
                setTimeout(() => {
                    const timer = setInterval(() => {
                        current = Math.min(current + 2, target);
                        el.textContent = current + "%";
                        if (current >= target) clearInterval(timer);
                    }, 20);
                }, i * 130);
            });
        }

        function resetCounters() {
            document.querySelectorAll(".circle-percent").forEach(el => {
                el.textContent = "0%";
            });
        }

        const skillCards = document.querySelectorAll(".skill-card[data-skill-tilt]");

        skillCards.forEach(card => {
            const inner = card.querySelector(".skill-card-inner");
            const shine = card.querySelector(".skill-card-shine");
            if (!inner) return;

            let bounds, rafTilt;

            card.addEventListener("mouseenter", () => {
                bounds = card.getBoundingClientRect();
            });

            card.addEventListener("mousemove", e => {
                if (!bounds) bounds = card.getBoundingClientRect();
                cancelAnimationFrame(rafTilt);
                rafTilt = requestAnimationFrame(() => {
                    const dx = (e.clientX - (bounds.left + bounds.width  / 2)) / (bounds.width  / 2);
                    const dy = (e.clientY - (bounds.top  + bounds.height / 2)) / (bounds.height / 2);
                    inner.style.transition = "box-shadow 0.4s ease, border-color 0.4s ease";
                    inner.style.transform  = `perspective(900px) rotateX(${-dy * 9}deg) rotateY(${dx * 9}deg) translateZ(10px)`;
                    if (shine) {
                        const px = ((e.clientX - bounds.left) / bounds.width)  * 100;
                        const py = ((e.clientY - bounds.top)  / bounds.height) * 100;
                        shine.style.background = `radial-gradient(380px circle at ${px}% ${py}%, rgba(255,255,255,0.09) 0%, transparent 65%)`;
                    }
                });
            });

            card.addEventListener("mouseleave", () => {
                cancelAnimationFrame(rafTilt);
                inner.style.transition = "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease, border-color 0.4s ease";
                inner.style.transform  = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
                if (shine) shine.style.background = "none";
            });
        });

        function resetSkillCards() {
            skillCards.forEach(card => {
                card.style.transition = "none";
                card.style.opacity    = "0";
                card.style.transform  = "translateY(45px) scale(0.95)";
            });
        }

        function animateSkillCards() {
            skillCards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.transition = "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.2, 0.64, 1)";
                    card.style.opacity    = "1";
                    card.style.transform  = "translateY(0) scale(1)";
                }, i * 100);
            });
        }

        const skillsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillCards();
                    setTimeout(() => { fillCircles(); runCounters(); }, 250);
                } else {
                    resetSkillCards();
                    resetCircles();
                    resetCounters();
                }
            });
        }, { threshold: 0.12 });

        skillsObserver.observe(skillsSection);
        resetSkillCards();
        resetCircles();
        resetCounters();

    })();


    // ============================================================
    // 7. PROJECTS SECTION
    // ============================================================

    (function initProjects() {

        const projectsSection = document.querySelector("#projects");
        if (!projectsSection) return;

        const projCanvas = document.getElementById("projectsBg");

        if (projCanvas) {

            const pCtx = projCanvas.getContext("2d");
            let pW, pH, pRaf;
            const dots = [];

            const COLS = 22, ROWS = 14;

            function pResize() {
                pW = projCanvas.width  = projCanvas.offsetWidth;
                pH = projCanvas.height = projCanvas.offsetHeight;
                dots.length = 0;
                const colGap = pW / COLS;
                const rowGap = pH / ROWS;
                for (let r = 0; r <= ROWS; r++) {
                    for (let c = 0; c <= COLS; c++) {
                        dots.push({
                            x:     c * colGap,
                            y:     r * rowGap,
                            ox:    c * colGap,
                            oy:    r * rowGap,
                            r:     Math.random() * 1.4 + 0.5,
                            alpha: Math.random() * 0.4 + 0.1,
                            speed: Math.random() * 0.008 + 0.004,
                            phase: Math.random() * Math.PI * 2,
                        });
                    }
                }
            }

            function pDraw(t) {
                pCtx.clearRect(0, 0, pW, pH);

                dots.forEach(d => {
                    d.x = d.ox + Math.sin(t * d.speed + d.phase) * 18;
                    d.y = d.oy + Math.cos(t * d.speed * 0.7 + d.phase) * 14;
                    pCtx.beginPath();
                    pCtx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                    pCtx.fillStyle = `rgba(148, 163, 184, ${d.alpha})`;
                    pCtx.fill();
                });

                for (let i = 0; i < dots.length; i++) {
                    for (let j = i + 1; j < dots.length; j++) {
                        const dx   = dots[i].x - dots[j].x;
                        const dy   = dots[i].y - dots[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 90) {
                            const alpha = (1 - dist / 90) * 0.08;
                            pCtx.beginPath();
                            pCtx.moveTo(dots[i].x, dots[i].y);
                            pCtx.lineTo(dots[j].x, dots[j].y);
                            pCtx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
                            pCtx.lineWidth   = 0.5;
                            pCtx.stroke();
                        }
                    }
                }

                pRaf = requestAnimationFrame(pDraw);
            }

            const projBgObs = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    cancelAnimationFrame(pRaf);
                    pRaf = requestAnimationFrame(pDraw);
                } else {
                    cancelAnimationFrame(pRaf);
                }
            }, { threshold: 0.01 });

            projBgObs.observe(projectsSection);
            window.addEventListener("resize", pResize);
            pResize();
        }

        const projectCards = document.querySelectorAll(".project-card[data-tilt]");

        projectCards.forEach(card => {
            const inner = card.querySelector(".card-inner");
            const shine = card.querySelector(".card-shine");
            if (!inner) return;

            let bounds, rafTilt;

            card.addEventListener("mouseenter", () => {
                bounds = card.getBoundingClientRect();
            });

            card.addEventListener("mousemove", e => {
                if (!bounds) bounds = card.getBoundingClientRect();
                cancelAnimationFrame(rafTilt);
                rafTilt = requestAnimationFrame(() => {
                    const cx = bounds.left + bounds.width  / 2;
                    const cy = bounds.top  + bounds.height / 2;
                    const dx = (e.clientX - cx) / (bounds.width  / 2);
                    const dy = (e.clientY - cy) / (bounds.height / 2);
                    inner.style.transition = "box-shadow 0.4s ease, border-color 0.4s ease";
                    inner.style.transform  = `perspective(1000px) rotateX(${-dy * 10}deg) rotateY(${dx * 10}deg) translateZ(8px)`;
                    if (shine) {
                        const px = ((e.clientX - bounds.left) / bounds.width)  * 100;
                        const py = ((e.clientY - bounds.top)  / bounds.height) * 100;
                        shine.style.background = `radial-gradient(400px circle at ${px}% ${py}%, rgba(255,255,255,0.09) 0%, transparent 60%)`;
                    }
                });
            });

            card.addEventListener("mouseleave", () => {
                cancelAnimationFrame(rafTilt);
                inner.style.transition = "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease, border-color 0.4s ease";
                inner.style.transform  = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
                if (shine) shine.style.background = "none";
            });
        });

        function resetProjectCards() {
            projectCards.forEach(card => {
                card.style.transition = "none";
                card.style.opacity    = "0";
                card.style.transform  = "translateY(50px) scale(0.96)";
            });
        }

        function animateProjectCards() {
            projectCards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.transition = "opacity 0.65s ease, transform 0.65s cubic-bezier(0.34, 1.2, 0.64, 1)";
                    card.style.opacity    = "1";
                    card.style.transform  = "translateY(0) scale(1)";
                }, i * 120);
            });
        }

        const projectObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting)
                    animateProjectCards();
                else
                    resetProjectCards();
            });
        }, { threshold: 0.1 });

        projectObserver.observe(projectsSection);
        resetProjectCards();

    })();


    // ============================================================
    // 8. CONTACT SECTION — Premium Animated Background
    // ============================================================

    (function initContactBackground() {

        const contactSection = document.querySelector("#contact");
        if (!contactSection) return;

        // Inject Aurora blobs
        [1, 2, 3].forEach(i => {
            const div = document.createElement("div");
            div.classList.add("contact-aurora", `contact-aurora-${i}`);
            contactSection.insertBefore(div, contactSection.firstChild);
        });

        // Inject Grid overlay
        const grid = document.createElement("div");
        grid.classList.add("contact-grid");
        contactSection.insertBefore(grid, contactSection.firstChild);

        // Inject Floating Geometric Shapes
        const geoShapes = [
            `<svg viewBox="0 0 60 60"><polygon points="30,4 56,52 4,52" fill="none" stroke="rgba(56,189,248,0.4)" stroke-width="1.5"/></svg>`,
            `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" fill="none" stroke="rgba(99,102,241,0.4)" stroke-width="1.5"/></svg>`,
            `<svg viewBox="0 0 60 60"><polygon points="30,4 56,30 30,56 4,30" fill="none" stroke="rgba(56,189,248,0.35)" stroke-width="1.5"/></svg>`,
            `<svg viewBox="0 0 60 60"><polygon points="30,4 52,17 52,43 30,56 8,43 8,17" fill="none" stroke="rgba(168,85,247,0.35)" stroke-width="1.5"/></svg>`,
            `<svg viewBox="0 0 60 60"><line x1="30" y1="8" x2="30" y2="52" stroke="rgba(56,189,248,0.3)" stroke-width="1.5"/><line x1="8" y1="30" x2="52" y2="30" stroke="rgba(56,189,248,0.3)" stroke-width="1.5"/></svg>`,
            `<svg viewBox="0 0 60 60"><rect x="12" y="12" width="36" height="36" fill="none" stroke="rgba(99,102,241,0.4)" stroke-width="1.5" rx="4"/></svg>`,
        ];

        geoShapes.forEach((shape, i) => {
            const div = document.createElement("div");
            div.classList.add("contact-geo", `contact-geo-${i + 1}`);
            div.innerHTML = shape;
            contactSection.insertBefore(div, contactSection.firstChild);
        });

        // Canvas Particle Network
        const canvas = document.createElement("canvas");
        canvas.id = "contactBgCanvas";
        contactSection.insertBefore(canvas, contactSection.firstChild);

        const ctx = canvas.getContext("2d");
        let W, H, rafId;
        const PARTICLE_COUNT = 55;
        const particles = [];

        function resize() {
            W = canvas.width  = contactSection.offsetWidth;
            H = canvas.height = contactSection.offsetHeight || 600;
            particles.length = 0;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x:     Math.random() * W,
                    y:     Math.random() * H,
                    vx:    (Math.random() - 0.5) * 0.35,
                    vy:    (Math.random() - 0.5) * 0.35,
                    r:     Math.random() * 1.8 + 0.4,
                    alpha: Math.random() * 0.35 + 0.08,
                    hue:   Math.random() > 0.6 ? 200 : (Math.random() > 0.5 ? 240 : 270),
                });
            }
        }

        function drawBg(t) {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                p.x = (p.x + p.vx + W) % W;
                p.y = (p.y + p.vy + H) % H;
                const pulse = Math.sin(t * 0.0007 + p.x * 0.015) * 0.06;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.alpha + pulse})`;
                ctx.fill();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx   = particles[i].x - particles[j].x;
                    const dy   = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(56,189,248,${(1 - dist / 110) * 0.06})`;
                        ctx.lineWidth   = 0.5;
                        ctx.stroke();
                    }
                }
            }
            rafId = requestAnimationFrame(drawBg);
        }

        const bgObs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(drawBg);
            } else {
                cancelAnimationFrame(rafId);
            }
        }, { threshold: 0.01 });

        bgObs.observe(contactSection);
        window.addEventListener("resize", resize);
        resize();

    })();


    // ============================================================
    // 10. FOOTER COLUMNS — Staggered Entrance
    // ============================================================

    const footerCols = document.querySelectorAll(".footer-col");
    const footer     = document.querySelector(".footer");

    footerCols.forEach(col => {
        Object.assign(col.style, { opacity: "0", transform: "translateY(40px)" });
    });

    if (footer) {

        const footerObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    footerCols.forEach((col, i) => {
                        resetAndAnimate(col,
                            { opacity: "0", transform: "translateY(40px)" },
                            { opacity: "1", transform: "translateY(0)"    }, i * 0.15);
                    });
                } else {
                    footerCols.forEach(col => {
                        Object.assign(col.style,
                            { opacity: "0", transform: "translateY(40px)", transition: "none" });
                    });
                }

            });
        }, { threshold: 0.1 });

        footerObserver.observe(footer);
    }

    (function initFooter() {

    const footer = document.querySelector(".footer");
    if (!footer) return;

    // ── Canvas particle network ──────────────────────────────
    const canvas = document.getElementById("footerCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let W, H, rafId;

    const DOTS = [];
    const COUNT = 45;

    function resize() {
        W = canvas.width  = footer.offsetWidth;
        H = canvas.height = footer.offsetHeight || 400;
        DOTS.length = 0;
        for (let i = 0; i < COUNT; i++) {
            DOTS.push({
                x:     Math.random() * W,
                y:     Math.random() * H,
                vx:    (Math.random() - 0.5) * 0.25,
                vy:    (Math.random() - 0.5) * 0.25,
                r:     Math.random() * 1.5 + 0.4,
                alpha: Math.random() * 0.25 + 0.06,
                hue:   Math.random() > 0.5 ? 200 : 240,
            });
        }
    }

    function draw(t) {
        ctx.clearRect(0, 0, W, H);

        DOTS.forEach(d => {
            d.x = (d.x + d.vx + W) % W;
            d.y = (d.y + d.vy + H) % H;
            const pulse = Math.sin(t * 0.0006 + d.x * 0.01) * 0.05;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${d.hue}, 75%, 65%, ${d.alpha + pulse})`;
            ctx.fill();
        });

        for (let i = 0; i < DOTS.length; i++) {
            for (let j = i + 1; j < DOTS.length; j++) {
                const dx   = DOTS[i].x - DOTS[j].x;
                const dy   = DOTS[i].y - DOTS[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(DOTS[i].x, DOTS[i].y);
                    ctx.lineTo(DOTS[j].x, DOTS[j].y);
                    ctx.strokeStyle = `rgba(56,189,248,${(1 - dist / 100) * 0.05})`;
                    ctx.lineWidth   = 0.5;
                    ctx.stroke();
                }
            }
        }

        rafId = requestAnimationFrame(draw);
    }

    // Only animate when footer is visible
    const footerObs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(draw);
        } else {
            cancelAnimationFrame(rafId);
        }
    }, { threshold: 0.01 });

    footerObs.observe(footer);
    window.addEventListener("resize", resize);
    resize();

    // ── Footer columns stagger entrance ─────────────────────
    const cols = document.querySelectorAll(".footer-col");
    const brand = document.querySelector(".footer-brand-strip");

    [brand, ...cols].forEach(el => {
        if (el) Object.assign(el.style, { opacity: "0", transform: "translateY(35px)" });
    });

    const colObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                [brand, ...cols].forEach((el, i) => {
                    if (!el) return;
                    setTimeout(() => {
                        el.style.transition = "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.2,0.64,1)";
                        el.style.opacity    = "1";
                        el.style.transform  = "translateY(0)";
                    }, i * 100);
                });
            } else {
                [brand, ...cols].forEach(el => {
                    if (!el) return;
                    el.style.transition = "none";
                    el.style.opacity    = "0";
                    el.style.transform  = "translateY(35px)";
                });
            }
        });
    }, { threshold: 0.1 });

    colObs.observe(footer);

})();


    // ============================================================
    // 11. TYPING ANIMATION
    // ============================================================

    const roles         = ["Data Analyst", "Data Scientist", "AI/ML Enthusiast"];
    const typingElement = document.querySelector(".typing");

    if (typingElement) {

        let roleIndex  = 0;
        let charIndex  = 0;
        let isDeleting = false;

        function typeEffect() {

            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentRole.length) {
                    setTimeout(() => { isDeleting = true; typeEffect(); }, 1200);
                    return;
                }
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex  = (roleIndex + 1) % roles.length;
                }
            }

            setTimeout(typeEffect, isDeleting ? 60 : 110);
        }

        typeEffect();
    }


}); // end DOMContentLoaded
