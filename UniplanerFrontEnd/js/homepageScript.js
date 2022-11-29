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