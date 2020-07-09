$(function()
    {
        $("#btn_2").click(
            function (e) {
                $("#output_2").text("None");
                var n = prompt("Введите номер числа фибаначи.");
                n = parseInt(n);

                if(isNaN(n))
                {
                    alert("Not correct");
                }
                else
                {
                    if(n > 0)
                        $("#output_2").text(fib(n));
                    else
                        alert("Not correct");
                }
                e.preventDefault();
            }
        );
    }
);

function fib(n)
{
    var a = 1, b = 1;
    if(n > 2)
    {
        for(var i = 2; i < n; i++)
        {
            b += a;
            a = b - a;
        }
    }
    return (n + " number is "+b);
}
