var save_but = document.getElementById('save_but')
var clean_but = document.getElementById('clean_but')
var table = document.getElementById('table')
var in_name = document.getElementById('name')
var in_op = document.getElementById('opis')
var btr = document.getElementById('btr')
var ffbut = getElementById('ffbut')
save_but.onclick = function() {
    location.href = "./categories.html"
    
     addRow
};
clean_but.onclick = function() {
    location.href = "./categories.html"
}

function addRow(){
    var td1 = document.createElement("td")
    td1.innerHTML = ee.value;
    btr.appendChild(td1);
       
   
  }

function ffbut (){
    location.href = "/categories.html"
}

function ftbut (){
    location.href = "/tran.html"
}

function ctbut (){
    location.href = "/createtran.html"
}
function grafbut (){
    location.href = "/creategraf.html"
}

