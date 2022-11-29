//Scroll-To-Top-Button

let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    
    if(scrollProgress != null) {
        if(pos > 100){
            scrollProgress.style.display = "grid";
        }
        else{
            scrollProgress.style.display = "none";
        }
    
        scrollProgress.addEventListener("click", () =>{
            document.documentElement.scrollTop = 0;
        });
        
        scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`
    }
}

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

//End Scroll-To-Top-Button

//Load-Spinner

$(window).on("load", function(){
    $(".load-wrap").fadeOut("slow")
    
});



//Navbar collapse
while(window.screen.width < 1000){
    const navLinks = document.querySelectorAll('.nav-item')
    const menuToggle = document.getElementById('navbarNav')
    const bsCollapse = new bootstrap.Collapse(menuToggle)
    navLinks.forEach((l) => {
        l.addEventListener('click', () => { bsCollapse.toggle() })
        })
}