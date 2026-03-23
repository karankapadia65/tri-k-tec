function initNav() {
    // --- Hamburger toggle ---
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            nav.classList.toggle('open');
            toggle.textContent = nav.classList.contains('open') ? '\u2715' : '\u2630';
        });

        // Close nav when a non-dropdown link is clicked (mobile)
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (link.closest('.dropdown') && link.nextElementSibling) return;
                nav.classList.remove('open');
                toggle.textContent = '\u2630';
            });
        });
    }

    // --- Dropdown handling ---
    var dropdowns = document.querySelectorAll('.dropdown');

    function closeAllDropdowns() {
        dropdowns.forEach(function (dd) {
            var menu = dd.querySelector('.dropdown-menu');
            if (menu) menu.style.display = 'none';
        });
    }

    dropdowns.forEach(function (dropdown) {
        var dropdownMenu = dropdown.querySelector('.dropdown-menu');
        var dropdownLink = dropdown.querySelector('a');

        if (!dropdownMenu || !dropdownLink) return;

        dropdownLink.addEventListener('click', function (e) {
            var isTouchLike = window.matchMedia('(hover: none)').matches || window.innerWidth <= 900;
            if (!isTouchLike) return;

            e.preventDefault();
            e.stopPropagation();
            var isOpen = dropdownMenu.style.display === 'block';
            closeAllDropdowns();
            dropdownMenu.style.display = isOpen ? 'none' : 'block';
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function () {
        closeAllDropdowns();
    });
}
