
var animals_1 = {
    text:"Животные",
    childs:[{text :"Млекопитающие", childs : [{text:"Коровы"},{text:"Ослы"},{text:"Собаки"},{text:"Тигры"}]},{text:"Другие",childs:  [{text:"Змеи"},{text:"Птицы"},{text:"Ящерицы"}]}]
}
var fish_1= {
    text:"Рыбы",
    childs:[{text: "Аквариумные",childs:[{text:"Гуппи"},{text:"Скалярии"}]},{text:"Морские",childs:[{text:"Морская форель"}]}]
}

$(function()
{
    var my = document.createElement("ul");
    my.id = "main";

    MyAddButCoolre(my,animals_1,0);
    MyAddButCoolre(my,fish_1,1);
    var body = document.getElementsByTagName("body");
    body[0].appendChild(my);

    $(".my_btn").click(function (e) {
        $(this.id).toggleClass("collapse");
        e.preventDefault();
    })
});

function MyAddButCoolre(parent,tempo,idk){

    let to_add = document.createElement("li");

    if(tempo.hasOwnProperty("childs"))
    {
        let link = document.createElement("a");
        link.id = "#" + parent.id + "_" +idk;
        link.className = "my_btn";
        link.innerHTML = tempo.text;
        to_add.appendChild(link);
        let inseption = document.createElement("ul");
        inseption.className = "collapse";
        inseption.id = parent.id + "_" +idk;
        for(let x = 0; x < tempo.childs.length; x++)
        {
            MyAddButCoolre(inseption,tempo.childs[x],x);
        }
        to_add.appendChild(inseption);
    }
    else
    {
        to_add.innerHTML = tempo.text;
    }
    parent.appendChild(to_add);
}