$(function()
{
    $("#mc-size #mc-size-btn").click(function(e) //Create table
        {
            //remove old
            $("#Table-mc").remove();
            $("#mc-size .hidden").remove();
            $(".mc-ansver").remove();

            //get size
            var size = $("#mc-size input").val();
            size = parseInt(size);
            if(isNaN(size)  || size < 1)
            {
                alert("Not correct");
            }
            else
            {
                // alert($(window).width());
                if(size > 6)
                    size = 6;
                var newTable = document.createElement("table");//Create table
                newTable.id = "Table-mc";
                newTable.className = "table"
                for(var y = 0; y < size; y++)
                {
                    var newRow = newTable.insertRow(y);//Create rows
                    for(var x = 0; x < size; x++)
                    {
                        var newCell = newRow.insertCell(x);//Create cell
                        newCell.id = "mc_"+x+"_"+y;
                        newCell.innerHTML = "<input type=\"0\" placeholder='0'>";
                    }
                }
                $("#mc-size").append(newTable);//append table

                var newSpan = document.createElement("span");//save size
                newSpan.innerHTML = size;
                newSpan.className = "hidden";//hide it
                $("#mc-size").append(newSpan);//append size
            }
            e.preventDefault();
        }
    );

    $('#btn_3').click(  //calculate btn
        function (e) {
            var size = parseInt($('#mc-size span').text());//find size
            if(isNaN(size))//if there is no table
            {
                alert("Not correct");
            }
            else
            {
                $(".mc-ansver").remove();//remove previous ansver
                var sum = 0, temp_sum;
                var temp;
                //Find sum of top row
                for (var x = 0; x < size; x++) {
                    temp = parseInt($('#mc_' + x + '_0 input').val());
                    if (isNaN(temp)) { // if cell isn't correct
                        alert("Not correct");
                        return;
                    } else {
                        sum += temp;
                    }

                }
                //finding sums of other rows
                for (var y = 1; y < size; y++) {
                    temp_sum = 0;
                    for (var x = 0; x < size; x++) {
                        temp = parseInt($('#mc_' + x + '_' + y + ' input').val());
                        if (isNaN(temp)) {
                            alert("Not correct");
                            return;
                            }
                        else {
                            temp_sum += temp;
                            }
                        }
                    if (temp_sum != sum) {
                        mistake();
                        return;
                    }
                }

                for(var x = 0; x< size; x++)
                {
                    temp_sum = 0;
                    for(var y = 0; y < size; y++)
                    {
                        temp = parseInt($('#mc_' + x + '_' + y + ' input').val());
                        if (isNaN(temp)) {
                            alert("Not correct");
                            return;
                        }
                        else {
                            temp_sum += temp;
                        }
                    }
                    if (temp_sum != sum) {
                        mistake();
                        return;
                    }
                }

                temp_sum = 0;
                //finding sum of diagonals
                for (var x = 0; x < size; x++) {
                    temp = parseInt($('#mc_' + x + '_' + x + ' input').val());
                    if (isNaN(temp)) {
                        alert("Not correct");
                        return;
                    } else {
                        temp_sum += temp;
                    }
                }
                if (temp_sum != sum) {
                    mistake();
                    return;
                }

                temp_sum = 0;

                for (var x = 0; x < size; x++) {
                    temp = parseInt($('#mc_' + (size - 1 - x) + '_' + x + ' input').val());
                    if (isNaN(temp)) {
                        alert("Not correct");
                        return;
                    } else {
                        temp_sum += temp;
                    }
                }

                if (temp_sum != sum) {
                    mistake();
                    return;
                }

                var newSpan = document.createElement("span");
                newSpan.innerHTML = "It is";
                newSpan.className = "badge badge-success mc-ansver";
                $("#mc-size").append(newSpan);

                e.preventDefault();
            }
        }
    )

});

function mistake() {
    var newSpan = document.createElement("span");
    newSpan.innerHTML = "It isn't";
    newSpan.className = "badge badge-danger mc-ansver";
    $("#mc-size").append(newSpan);
}