var header =document.getElementById("Header");

var backToTop =document.getElementById("backToTop");


var allcourses=[];







window.onscroll = function (){
    if(scrollY > 100){
    header.classList.add("headerFixed")
    backToTop.classList.remove("hide")

}
else {
    header.classList.remove("headerFixed")
    backToTop.classList.add("hide")
    
}
}



backToTop.addEventListener("click" , function (){
window.scrollTo({
    top:0,
    behavior:"smooth"
})
})