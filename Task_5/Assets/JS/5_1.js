// var animals = {
//     text:"Животные",
//     childs:[["Млекопитающие","Коровы","Ослы","Собаки","Тигры"],["Другие","Змеи","Птицы","Ящерицы"]]
// }
// var fish = {
//     text:"Рыбы",
//     childs:[["Аквариумные","Гуппи","Скалярии"],["Морские","Морская форель"]]
// }

var animals_1 = {
    text:"Животные",
    childs:[{text :"Млекопитающие", childs : [{text:"Коровы"},{text:"Ослы"},{text:"Собаки"},{text:"Тигры"}]},{text:"Другие",childs:  [{text:"Змеи"},{text:"Птицы"},{text:"Ящерицы"}]}]
}
var fish_1= {
    text:"Рыбы",
    childs:[{text: "Аквариумные",childs:[{text:"Гуппи"},{text:"Скалярии"}]},{text:"Морские",childs:[{text:"Морская форель"}]}]
}

window.onload = function()
{
    var my = document.createElement("ul");
    // MyAddInBody(my,animals);
    // MyAddInBody(my,fish);
    MyAddButCoolre(my,animals_1);
    MyAddButCoolre(my,fish_1);
    var body = document.getElementsByTagName("body");
    body[0].appendChild(my);
}
//Точное добавление
// function MyAddInBody(parent,tempo) {
//     let to_add = document.createElement("li");
//     to_add.innerHTML = tempo.text;
//     let in_to_add = document.createElement("ul");
//     for(let x of tempo.childs)
//     {
//         let smth = document.createElement("li");
//         smth.innerHTML = x[0];
//         let inseption_ul = document.createElement("ul");
//         for (let y = 1; y < x.length; y++)
//         {
//             let one_more_var = document.createElement("li");
//             one_more_var.innerHTML = x[y];
//             inseption_ul.appendChild(one_more_var);
//         }
//         smth.appendChild(inseption_ul);
//         in_to_add.appendChild(smth);
//     }
//     to_add.appendChild(in_to_add);
//     parent.appendChild(to_add);
// }


//Рекурсивное  добавление
function MyAddButCoolre(parent,tempo){
    let to_add = document.createElement("li");
    to_add.innerHTML = tempo.text;
    if(tempo.hasOwnProperty("childs"))
    {

        let inseption = document.createElement("ul");
        for (let x of tempo.childs)
        {
            MyAddButCoolre(inseption,x);
        }
        to_add.appendChild(inseption);
    }
    parent.appendChild(to_add);
}