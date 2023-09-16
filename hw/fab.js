const mainFab = document.getElementById('mainFab');
const fabOptions = document.getElementById('fabOptions');

mainFab.addEventListener('click', function() {
    if (fabOptions.style.display === 'none' || fabOptions.style.display === '') {
        fabOptions.style.display = 'flex';
    } else {
        fabOptions.style.display = 'none';
    }
});

function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tabContent");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
    fabOptions.style.display = 'none';  // Close the FAB options after a selection is made
}
