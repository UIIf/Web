$ (function () {

        $("#btn_4").click(
            function (e) {
                var a = $("#getRI_a").val();
                var b = $("#getRI_b").val();
                
                a = parseInt(a);
                b = parseInt(b);
                
                if(isNaN(a) || isNaN(b) )
                {
                    alert("Not correct");
                }
                else
                {
                    $("#getRI_z").text(getRandomInt(a,b));
                }
                e.preventDefault();
            }
        )

    $("#btn_5").click(
        function (e) {
            var n = $("#getRA_n").val();

            n = parseInt(n);

            if(isNaN(n))
            {
                alert("Not correct");
            }
            else
            {
                $("#getRA_z").text(' ');
                for( var x = 0; x < n; x++)
                {
                    $("#getRA_z").append(' ' +  getRandomInt(0,101));
                }
            }
            e.preventDefault();
        }
    )

    $("#btn_6").click(
        function (e) {

            $("#Table-RA").remove();

            var n = $("#getRAs_n").val();
            var m = $("#getRAs_b").val();

            n = parseInt(n);
            m = parseInt(m);

            if(isNaN(n) || isNaN(m) || (m < 1 || m > 5))
            {
                alert("Not correct");
            }
            else
            {
                if(n > 21)
                {
                    n = 20;
                }
                var newTable = document.createElement("table");//Create table
                newTable.id = "Table-RA";
                newTable.className = "table";
                for(var y = 0; y < n; y++)
                {
                    var newRow = newTable.insertRow(y);//Create rows
                    for(var x = 0; x < n; x++)
                    {
                        var newCell = newRow.insertCell(x);//Create cell
                        newCell.id = "ra_"+x+"_"+y;
                        newCell.innerHTML = "<span></span>";
                    }
                }
                $("#getRAs").append(newTable);
                getResultArray(n,m);
            }
            e.preventDefault();
        }
    )

    }
);

function getRandomInt(a,b) {
    return ((b - 1 - a)*Math.random() + a);
}
function getArray(n) {
    var Arr = [];
    for(var i = 0; i < n; i++)
    {
        Arr[i] = getRandomInt(0,101);
    }
    return Arr;
}

function getResultArray(n,m) {
    var counter = 0;
    switch (m) {
        case 1:
        {
            for(var x = 0; x < n; x++)
            {
                if(x%2 == 0)
                    for(var y = n-1; y > -1; y--)
                    {
                        $("#ra_" + x +'_'+y+" span").text(counter);
                        counter++;
                    }
                else
                    for(var y = 0; y < n; y++)
                    {
                        $("#ra_" + x +'_'+y+" span").text(counter);
                        counter++;
                    }

            }
            break;
        }
        case 2:
        {
            var temp = (n-1)%2;
            for(var y = n-1; y > -1;  y--)
            {
                if(y%2 == temp)

                    for(var x = 0; x < n; x++)
                    {
                        $("#ra_" + x +'_'+y+" span").text(counter);
                        counter++;
                    }
                else
                    for(var x = n -1; x > -1; x --)
                    {
                        $("#ra_" + x +'_'+y+" span").text(counter);
                        counter++;
                    }

            }

            break;
        }
        case 3:
        {
            var temp = (n-1)%2;
            for(var y = n-1; y > -1;  y--)
            {
                if(y%2 == temp)

                    for(var x = n -1; x > -1; x --)
                    {
                        $("#ra_" + x +'_'+y+" span").text(counter);
                        counter++;
                    }

                else

                    for(var x = 0; x < n; x++)
                    {
                        $("#ra_" + x +'_'+y+" span").text(counter);
                        counter++;
                    }

            }
            break;
        }
        default:

            for(var x = 0; x < n; x++)
            {
                if(x%2 == 0)
                    for(var y = 0; y < n; y++)
                    {
                        $("#ra_" + x +'_'+y+" span").text(counter);
                        counter++;
                    }
                else
                    for(var y = n-1; y > -1; y--)
                    {
                        $("#ra_" + x +'_'+y+" span").text(counter);
                        counter++;
                    }
            }

    }
}