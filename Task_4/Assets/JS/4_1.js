$(function ()
{

	$(".btn_1").click(
		function (e) {
			var a = $('#a').val(), b = $('#b').val();
			a = parseInt(a);
			b = parseInt(b);
			if(isNaN(a) || isNaN(b))
			{
				alert("Not corect");
			}
			else
			{
				find_S(a,b);
			}
			e.preventDefault();
		}
	);
});
function find_S(a, b)
{
	$('#output_1').text(a*b);
};