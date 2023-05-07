let arr = [];
//each array represents row
let array1 = GenerateArray(arr);
let array2 =GenerateArray(arr);
let array3 = GenerateArray(arr);
let array4 = GenerateArray(arr);

let row1 = document.getElementById("row1");
let row2 = document.getElementById("row2");
let row3 = document.getElementById("row3");
let row4 = document.getElementById("row4");

console.log(row1);
row1 = generateRow(row1, array1);
row2 = generateRow(row2, array2);
row3 = generateRow(row3, array3);
row4 = generateRow(row4, array4);
let timer = document.querySelector(".timer");
let min =document.querySelector(".min");
console.log(min.innerHTML);
let sec = document.querySelector(".sec");
console.log(sec.innerHTML);
var TC ;
let c = 0;


var container_img = document.querySelector(".image");
container_img.style = "pointer-events: none;";

     function ONCLICK(){
       // location.reload();
        let clickButton = document.querySelector(".play");
        console.log(clickButton);
        console.log("onclick");
        container_img.style = "cursor: pointer; pointer-events: auto;";
        TC = setInterval(timerCounterdown, 1000);
        clickButton.style = "pointer-events: none;";
    }
console.log("+++++");
console.log(container_img);
// variable consists of id for row and class for img (the son row)
window.sessionStorage.setItem("idClass", "");
function generateRow(row, array){
    let imgsIn = [];
    for (let i = 0; i <= 4 ; i++){
        let img = document.createElement("div");
        let imgg = `img${array[i]}`;
        img.classList = `${imgg} imgcl`;
        row.appendChild(img);
        
        }
        return row;
}
//img1 consist of all image
img1= document.querySelector(".image");
///////////////img1.style = "pointer-events: none; opacity:0.9";

img1.addEventListener("click", function(e){
    
    //we need to check that user click only on img not on row or image(parent of row which parent of img)
    if (e.target.className != "row" && e.target.className != "image"){
        e.target.style ="transform: rotateY(180deg); transition: 0.4s;";
        //store in session storage class for row and id for img to use later
        let son = (e.target.getAttribute("class")).substring(0,4);
        let parent =e.target.parentElement.getAttribute("id");
        let ps = parent + son;
        if (window.sessionStorage.getItem("idClass") == ""){
            window.sessionStorage.setItem("idClass", ps);
        }
        else{
            //take info for previouse img from session storage 
            let pID = (window.sessionStorage.getItem("idClass")).substring(0,4);
            let sClass = (window.sessionStorage.getItem("idClass")).substring(4);
            let index;
                let xx = sClass.substring(3);
                switch (pID) {
                    case "row1":
                        for(let j = 0; j <= 4; j++){if (array1[j] == xx){index = j; }}                        
                        break;
                    case "row2":
                        for(let j = 0; j <= 4; j++){if (array2[j] == xx){index = j;}}                       
                        break;
                    case "row3":
                        for(let j = 0; j <= 4; j++){ if (array3[j] == xx){index = j;}}                        
                        break;
                    case "row4":
                        for(let j = 0; j <= 4; j++){if (array4[j] == xx){index = j;}}                        
                        break;
                }
                let pimage = (document.getElementById(pID).children[index]);
            //if 2 image is the same
            if (son == sClass && pID != parent){
                window.sessionStorage.setItem("idClass", "");
                pimage.className = "finished";
                pimage.style = "opacity:1; z-index:1; transform: rotateY(90deg); pointer-events: none; transition : 0.4s";
                e.target.style = "opacity:1; z-index:1; transform: rotateY(90deg); pointer-events: none; transition: transform 0.4s cubic-bezier(0.39, 0.58, 0.57, 1) 0s;";
                e.target.className = "finished";
                c++;
                if (c == 10){
                    console.log("*****");
                    let stopDiv = document.createElement("div");
                    let text = document.createTextNode(`Excellent, You Spent ${difTime(02,00,min.innerHTML, sec.innerHTML)} To Finish The Game`);
                    stopDiv.appendChild(text);
                    document.body.appendChild(stopDiv);
                    stopDiv.style = "width:1000px; padding: 30px; text-align:center; color: black ; font-size: 25px;font-weight: bold; background-color:#4EEB45; position: absolute; top:50%; left:50%; transform: translateX(-50%); transition: 0.3s";
                    let retry = document.createElement("input");
                    retry.setAttribute("type", "button");
                    retry.setAttribute("value", "Return");
                    let ret = document.createTextNode("Return");
                    retry.style = "margin: 0px 10px; padding: 5px; background-color:#96FEFF; border: 1px solid white; font-weight: bold; font-size: 25px; transition: 0.3s; color: #000";
                    retry.onclick = ()=>location.reload();
                    stopDiv.appendChild(retry);
                    stop();
                    container_img.style = "pointer-events: none;";
                    let clickButton = document.querySelector(".play");
                    clickButton.style = "pointer-events: none; opacity: 0.3";
                }
                }
                //if 2 image not same 
                else if(son != sClass){
                    window.sessionStorage.setItem("idClass", ps);
                    pimage.style = "transform: rotateY(360deg); transition: 0.4s";
                    e.target.style =  "transform: rotateY(170deg); transition:transform 0.9s";
                }
                
    }
}
    
});
console.log("c = " + c);
if (c == 10){
    console.log("*****");
}
//generate array consist of 5 element from number 1 to 5 without repeat
function GenerateArray(array){
    while (array.length <= 4){
        let randomNumber = Math.floor(Math.random() * 5 +1);
        if (array.length === 0){
            array.push(randomNumber);
        }
        else{
            array = array.filter(el => el != randomNumber);
            array.push(randomNumber);
         }
    }
    return array;
}
let t =10;


function timerCounterdown(){
    if(min.innerHTML  >= 0 && sec.innerHTML >= 0){
        if (sec.innerHTML == 0 && min.innerHTML > 0){
            sec.innerHTML = 60;
            if( min.innerHTML.length == 2 && min.innerHTML <= 10){
                min.innerHTML = `0${min.innerHTML - 1}`;
            }
            else
            min.innerHTML -= 1; 
        }
        if(sec.innerHTML <= 60 && sec.innerHTML >= 1){
            if( sec.innerHTML.length == 2 && sec.innerHTML <= 10){
                sec.innerHTML = `0${sec.innerHTML - 1}`;
            }
            else
            sec.innerHTML -= 1;
        }
        
        
    }
    if( sec.innerHTML == 0 && min.innerHTML ==0){
        let stopDiv = document.createElement("div");
        let text = document.createTextNode("Sorry, The Time Is Finished!");
        stopDiv.appendChild(text);
        document.body.appendChild(stopDiv);
        stopDiv.style = "width:1000px; padding: 30px; text-align:center; color:white; font-size: 25px;font-weight: bold; background-color:#B876A5; position: absolute; top:50%; left:50%; transform: translateX(-50%);";
        container_img.style = "pointer-events: none; opacity: 0.3";
        let clickButton = document.querySelector(".play");
        clickButton.style = "pointer-events: none; opacity: 0.3";
        let retry = document.createElement("input");
        retry.setAttribute("type", "button");
        retry.setAttribute("value", "Return");
        let ret = document.createTextNode("Return");
        retry.style = "margin: 0px 10px; padding: 5px; background-color:#F5E933; border: 1px solid white; font-weight: bold; font-size: 25px; transition: 0.3s; color: #368485";
        retry.onclick = ()=>location.reload();
        stopDiv.appendChild(retry);

       // stop();
    }
}
function stop (){
    
    clearInterval(TC);
    
}






function difTime(min1, sec1, min2, sec2){
    if(min1 <= 60 && min2 <= 60){
        var MIN0 = min1 - min2;
        var SEC0;
        if(sec1 < sec2){
            MIN0 -= 1;
            sec1 += 60 ;
            SEC0 = sec1 - sec2;
        }
        else{
            SEC0 = sec1 - sec2;
        }
        if(MIN0 >= 10 && SEC0 >= 10){
            return `${MIN0}:${SEC0}`;
        }
        else if(MIN0 < 10 && SEC0 < 10){
            return`0${MIN0}:0${SEC0}`;
        }
        else if( MIN0 < 10 && SEC0 >= 10){
            return `0${MIN0}:${SEC0}`;
        }
        else if (MIN0 >= 10 && SEC0 < 10 ){
            return `${MIN0}:0${SEC0}`;
        }
    }

}




