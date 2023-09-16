const toggleSwitch = document.getElementById('darkModeToggle');

toggleSwitch.addEventListener('change', function(e) {
    if (e.target.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem('theme', 'light');
    }
});

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleSwitch.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        toggleSwitch.checked = false;
    }
}
