let dark = document.getElementById("dark");
let red = document.getElementById("red");
let grey = document.getElementById("grey");
let light = document.getElementById("light");

if(dark){
    dark.addEventListener('click', function blackBody(){   
        document.body.style.backgroundColor= "black";
        document.body.style.color= "white";
    });
}

if(red){
    red.addEventListener('click', function redBody(){   
        document.body.style.backgroundColor= "rgb(230, 10, 10)";
        document.body.style.color= "white";
    });
}

if(grey){
    grey.addEventListener('click', function greyBody(){   
        document.body.style.backgroundColor= "rgb(245, 245, 245)";
        document.body.style.color= "black";
    });
}

if(light){
    light.addEventListener('click', function lightBody(){   
        document.body.style.backgroundColor= "white";
        document.body.style.color= "black";
    });
}
