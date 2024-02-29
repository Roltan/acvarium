var step = 0;
var right = true
var bools = document.getElementsByClassName("bool");

function load(){
    for(let i=0; i<10; i++){
        if(i == step){
            bools[i].style.margin = '0 0 175px 0';
        }
        else if(i == step-1 || i == step+1){
            bools[i].style.margin = '0 0 150px 0';
        }
        else if(i == step-2 || i == step+2){
            bools[i].style.margin = '0 0 100px 0';
        }
        else if(i == step-3 || i == step+3){
            bools[i].style.margin = '0 0 25px 0';
        }
        else{
            bools[i].style.margin = '0 0 0 0';
        }
    }

    if(step == 10){
        right = false;
    }
    if(step == 0){
        right = true;
    }

    if(right){
        step++;
    }
    else{
        step--;
    }
    setTimeout(load, 150)
}
load()
setTimeout(
    function(){
        window.location.href = "/home";
    }, 
    5000
)