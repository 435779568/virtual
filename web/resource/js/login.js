$(function()
{
	$('.steel-remember').on('click',function()
	{
		var self=$('.steel-checkbox');
		if(self.attr('checked'))
		{
			$('form.submit').on('submit',function()
			{
				$.removeCookie('steel-username'); 
				$.removeCookie('steel-password'); 
			})
			return ;
		}
		$.cookie('steel-username',$('.steel-username').val());
		$.cookie('steel-password',$('.steel-password').val());
		return ;
	});
	var remember=$('.steel-checkbox');
	var isRemember=$.cookie('remember');
	if(typeof(isRemember)=='undefined')
	{
		remember.attr('checked',false);
	}
	else
	{
		remember.attr('checked',true);
		$('.steel-username').val($.cookie('steel-username'));
		$('.steel-password').val($.cookie('steel-password'));
	}
})