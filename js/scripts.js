
/**
 * скрипты сайта
 */
$(document).ready(function() {
	
	// функция для переключения типов исомых туров (туры, номера)
	$('.search_type.tour_type li a').each(function(){
		$(this).click(function(){
			var index = $(this).parent().index();
			
			if (index == 0) {
				$('.search_type.tour_type li').eq(0).addClass('active');
				$('.search_type.tour_type li').eq(1).removeClass('active');
			} else {
				$('.search_type.tour_type li').eq(0).removeClass('active');
				$('.search_type.tour_type li').eq(1).addClass('active');
			}
			
			$('#datepicker').datepicker("destroy");
			$('#datepicker_start').datepicker("destroy");
			$('.tour_container').hide();
			
			$(".down_arrow").hide();
			$(".up_arrow").hide();
			
			return false;
		});
	});
	
	// функция для переключения города
	$('.city li a').each(function(){
		$(this).click(function(){
			var index = $(this).parent().index();
			
			if (index == 0) {
				$('.city li').eq(0).addClass('active');
				$('.city li').eq(1).removeClass('active');
			} else {
				$('.city li').eq(0).removeClass('active');
				$('.city li').eq(1).addClass('active');
			}
			
			return false;
		});
	});
	
	// функция для закрытия всех модальных окон по клику вне области окна
	$(document).on('click', function(e) {
		if ($('#datepicker_show').val() == '1') {
			if (!$(e.target).closest("#datepicker").length && !$(e.target).closest(".tour_container").length && !$(e.target).closest(".ui-corner-all").length) {				
				$('#datepicker').hide();
				$('.tour_container').hide();
				$('.down_arrow').hide();
				$('.up_arrow').hide();
				$('.datepicker_href').removeClass('opened');
				$('#datepicker_show').val(0);
			}
		
			e.stopPropagation();
		}
		
		if ($('#datepicker_start_show').val() == '1') {
			if (!$(e.target).closest("#datepicker_start").length && !$(e.target).closest(".ui-corner-all").length) {				
				$('#datepicker_start').hide();
				$('.down_arrow').hide();
				$('.up_arrow').hide();
				$('.start_href').removeClass('opened');
				$('#datepicker_start_show').val(0);
			}
		
			e.stopPropagation();
		}
		
		if ($('#datepicker_end_show').val() == '1') {
			if (!$(e.target).closest("#datepicker_end").length && !$(e.target).closest(".ui-corner-all").length) {				
				$('#datepicker_end').hide();
				$('.down_arrow').hide();
				$('.up_arrow').hide();
				$('.end_href').removeClass('opened');
				$('#datepicker_end_show').val(0);
			}
		
			e.stopPropagation();
		}
		
		if (window.innerWidth < 980) {
			if ($('#datepicker_start_show').val() == '1') {
				if (!$(e.target).closest("#datepicker_start .ui-datepicker-calendar").length) {
					alert('закрыть');
				}
		
				e.stopPropagation();
			}
		}
	});
	
	// функция для наведения и выбора диапазонов дат
	$('.tour_container a').each(function(){
		$(this).hover(function(){
			
			var current_date = new Date();
			var days = $(this).attr('data-days');
			var days_array = days.split(',');			
			
			$('.ui-datepicker-calendar td').each(function(){
				if (($(this).attr('data-month') == current_date.getMonth()) && ($(this).attr('data-year') == current_date.getFullYear())) {
					var iteration_date = new Date(current_date.getFullYear(), current_date.getMonth(), $(this).find('a').text());
					
					for (var day in days_array) {
						if (days_array[day] == iteration_date.getDay()) {
							$(this).css('border-color', '#009db9');
						}
					}
				}
			});
		}, function(){
			$('.ui-datepicker-calendar td').each(function(){
				$(this).css('background-color', '');
				$(this).css('border-color', '#e1e1e1');
			});
		});
		
		$(this).click(function(){
			if (window.innerWidth < 980) {
				$('.tour_container').css('z-index', '99');
			}
			
			return false;
		});
	});
	
	// клик по ссылке выбора даты отправления
	$('.start_href').each(function(){	
		$(this).click(function(){
		
		$('#datepicker_start').datepicker({
			dateFormat: "dd/mm/yy",
			range: 'period', // режим - выбор периода
			numberOfMonths: 1,
			firstDay: 1,
			showOtherMonths: true,
			selectOtherMonths: true,
			minDate: "0",
		    onSelect: function(dateText, inst, extensionRange) {
		    	// extensionRange - объект расширения
		    	$('[id=hotelStartDate]').val(extensionRange.startDateText);
		    	$('[id=datepicker_start_show]').val(1);
		    	
		    	$('[id=hotelEndDate]').val(extensionRange.endDateText);
		    	// $('[id=datepicker_end_show]').val(1);
		    	// $('[id=hotelEndDate]').val(extensionRange.endDateText);
		    },
		    
		    onClose: function(){
				$('.down_arrow').fadeOut('fast');
				$('.up_arrow').fadeOut('fast');
			}
		});
		
		var current_date = new Date();			
		
		$('.ui-datepicker-calendar td').each(function(){
			// $(this).css('background-color', 'blue !important');
			// $(this).find('a').css('color', '#2d2d2d !important');
			
			/* alert('asd');
			
			if (($(this).attr('data-month') == current_date.getMonth()) && ($(this).attr('data-year') == current_date.getFullYear())) {
				if ($(this).find('a').text() == current_date.getMonth()) {
					alert('asd');
				}
				
				$(this).css('background-color', 'blue !important');
				$(this).css('color', '#2d2d2d !important');
			} */
		});
		
		if ($(this).hasClass('opened')) {
			$(this).removeClass('opened');
			
			$('#datepicker_start').hide();
			$('.down_arrow').hide();
			
			$(".down_arrow").hide();
			$(".up_arrow").hide();
			$('#datepicker_start_show').val(0);
			
		} else {
			$(this).addClass('opened');
			$('#datepicker_start').show();
			$('.down_arrow').show();
			$('#datepicker_start_show').val(1);
			scaleDatepicker();
			
			if (!$('body').hasClass('index')) {
				$('.down_arrow').hide();
				$('.up_arrow').show();
			}
		}
		
		return false;
		
		});
	});
	
	// клик по ссылке выбора даты отправления
	/*$('.end_href').click(function(){				
		$('#datepicker_end').datepicker({
			dateFormat: "yy/mm/dd",
			range: 'period', // режим - выбор периода
			numberOfMonths: 1,
			firstDay: 1,
			showOtherMonths: true,
		    onSelect: function(dateText, inst, extensionRange) {
		    	// extensionRange - объект расширения
		    	$('[id=hotelEndDate]').val(extensionRange.endDateText);
		    	$('[id=datepicker_end_show]').val(extensionRange.endDateText);
		    },
		    
		    onClose: function(){
				$('.down_arrow').fadeOut('fast');
				$('.up_arrow').fadeOut('fast');
			}
		});
		
		if ($(this).hasClass('opened')) {
			$(this).removeClass('opened');
			
			$('#datepicker_end').hide();
			$('.down_arrow').hide();
			
			$(".down_arrow").hide();
			$(".up_arrow").hide();
			$('#datepicker_end_show').val(0);
			
		} else {
			$(this).addClass('opened');
			$('#datepicker_end').show();
			$('.down_arrow').show();
			$('#datepicker_end_show').val(1);
			scaleDatepicker();
			
			if (!$('body').hasClass('index')) {
				$('.down_arrow').hide();
				$('.up_arrow').show();
			}
		}
		
		return false;
	});*/
	
	// клик по ссылке выбора дат тура
	$('.datepicker_href').click(function(){
		$('#datepicker').datepicker({
			dateFormat: "dd/mm/yy",
			range: 'period', // режим - выбор периода
			numberOfMonths: 1,
			firstDay: 1,
			showOtherMonths: true,
			selectOtherMonths: true,
			minDate: "0",
		    onSelect: function(dateText, inst, extensionRange) {
		    	// extensionRange - объект расширения
		    	$('[id=tourStartDate]').val(extensionRange.startDateText);
		    	$('[id=tourEndDate]').val(extensionRange.endDateText);
		    },
		    
		    onClose: function(){
				$('.down_arrow').fadeOut('fast');
				$('.up_arrow').fadeOut('fast');
				$('.tour_container').fadeOut('fast');
			},
			
			onChangeMonthYear: function(){
				setTimeout(function(){
					var height = $('#datepicker .ui-datepicker-calendar').css('height');
					var hg = parseInt(height) + 26;
										
					$('.tour_container').css('height', hg + 'px');
				}, 1);
			}
		});

		// $('#datepicker').datepicker('setDate', ['2016/08/01', '2016/08/08']);

		// объект расширения (хранит состояние календаря)
		var extensionRange = $('#datepicker').datepicker('widget').data('datepickerExtensionRange');
		if(extensionRange.startDateText) $('[id=tourStartDate]').val(extensionRange.startDateText);
		if(extensionRange.endDateText) $('[id=tourEndDate]').val(extensionRange.endDateText);
		
		if ($(this).hasClass('opened')) {
			$(this).removeClass('opened');
			
			$('#datepicker').hide();
			$('.tour_container').hide();
			
			$('.down_arrow').hide();
			
			$(".down_arrow").hide();
			$(".up_arrow").hide();
			
			$('#datepicker_show').val(0);
		} else {
			$(this).addClass('opened');
			$('#datepicker').show();
			
			$('.tour_container').show();
			$('.down_arrow').show();
			$('#datepicker_show').val(1);
			scaleDatepicker();
			
			if (!$('body').hasClass('index')) {
				$('.down_arrow').hide();
				$('.up_arrow').show();
			}
		}
		
		var height = $('#datepicker .ui-datepicker-calendar').css('height');
		var hg = parseInt(height) + 26;
							
		$('.tour_container').css('height', hg + 'px');
		
		return false;
	});
	
	// функция для выбора кол-ва детей и взрослых
	$('.search_block').each(function(){
		$(this).find('.search_part.counts a').each(function(){
			$(this).click(function(){
				$(this).find('img').each(function(){
					var current_value = 0;
				
					if ($(this).parent().parent().hasClass('adult')) {
						current_value = parseInt($('.adult_input').attr('data-number'));
					} else {
						current_value = parseInt($('.child_input').attr('data-number'));
					}
				
					if ($(this).hasClass('minus')) {
						if (current_value > 0) {
							current_value = current_value - 1;
						} else {
							current_value = 0;
						}
					} else {
						current_value = current_value + 1;
					}
				
					if ($(this).parent().parent().hasClass('adult')) {
						$('.adult_input').attr('data-number', current_value);
						$('.adult_input').val(current_value + ' взрослых');
					} else {
						$('.child_input').attr('data-number', current_value);
						$('.child_input').val(current_value + ' детей');
					}
				});
			
				return false;
			});
		});
	});
	
	$('.search_type.tour_type li a').each(function(){
		$(this).click(function(){
			var index = $(this).parent().index();
			
			if (index == 0) {
				$('.search_block.first').show();
				$('.search_block.second').hide();
			} else {
				$('.search_block.first').hide();
				$('.search_block.second').show();
			}
		});
	});
	
	$('.mobile_ham').click(function(){
		$(this).toggleClass('open');
		
		if ($('header > ul.main_nav').hasClass('opened')) {
			$('header > ul.main_nav').removeClass('opened');
			$('header > ul.main_nav').hide('fast');
		} else {
			$('header > ul.main_nav').addClass('opened');
			$('header > ul.main_nav').show('fast');
		}
	});
	
	
	$(window).scroll(function(){
		if (window.innerWidth > 980) {
			scaleDatepicker();
		} else {
			// scaleMobileDatepicker();
			
		}
	});
	
	$('.text_content').each(function(){	
	
	$(this).find('ul.parts li a').each(function(){
		$(this).click(function(){
			var index = $(this).parent().index();
			
			$(this).parent().parent().find('li').each(function(){
				$(this).removeClass('active');
			});
			
			$(this).parent().parent().find('li').eq(index).addClass('active');
			
			$(this).parent().parent().siblings('.parts_content').find('p').each(function(){
				$(this).hide();
			});
			
			$(this).parent().parent().siblings('.parts_content').find('p').eq(index).show();
			
			return false;
		});
	});
	
	});
	
	$('.wrapper.message a').click(function(){
		$('.wrapper.message').hide('fast');
		return false;
	});
	
	$('.option_opener a').click(function(){
		if ($(this).hasClass('opened')) {
			$('.option_block.hidden').each(function(){
				$(this).hide('fast');
			});
			
			$(this).text('Другие параметры');
			$(this).append("<img style='margin-left: 5px !important;' src='img/down_arrow_white.png' alt='' />");
			$(this).removeClass('opened');
		} else {
			$('.option_block.hidden').each(function(){
				$(this).show('fast');
			});
			
			$(this).text('Скрыть фильтры');
			$(this).append("<img style='margin-left: 5px !important;' src='img/up_arrow_white.png' alt='' />");
			$(this).addClass('opened');
		}
		
		return false;
	});
	
	$('.wrapper.confirm .left_block .confirm_last > li button').each(function(){
		$(this).click(function(){
			$('.wrapper.confirm .left_block .confirm_last > li button').each(function(){
				$(this).removeClass('active');
			});
			
			$(this).addClass('active');
		});
	});
	
	$('.wrapper.confirm .left_block .confirm_last > li:nth-child(2) ul li a').each(function(){
		$(this).click(function(){
			var current_text = $(this).text();
			$(this).parent().parent().parent().find('button span').text(current_text);
		});
	});
	
	$('.content_href').each(function(){
		$(this).click(function(){
			if ($(this).hasClass('open')) {
				$(this).parent().parent().siblings('p').hide();
				$(this).parent().parent().parent().parent().find('.parts_content').hide();
				
				$(this).removeClass('open');
			} else {
				$(this).parent().parent().siblings('p').show();
				$(this).parent().parent().parent().parent().find('.parts_content').show();
				$(this).addClass('open');
			}
			
			return false;
		});
	});
	
	$('.option_block .further_href').each(function(){
		$(this).click(function(){
			if ($(this).hasClass('opened')) {
				$(this).prev('.hidden_options').hide('fast');
				$(this).removeClass('opened');
				$(this).find('span').text('Показать еще');
			} else {
				$(this).prev('.hidden_options').show('fast');
				$(this).addClass('opened');
				$(this).find('span').text('Скрыть');
			}
			
			return false;
		});
	});

	/*$('.tours_further_href').each(function(){
		$(this).click(function(){
			if ($(this).hasClass('opened')) {
				
				$('.wrapper.news .news_block.hidden').each(function(){
					$(this).hide('fast');
				});
				
				$(this).removeClass('opened');
				$(this).text('Показать все мероприятия');
			} else {
								
				$('.wrapper.news .news_block.hidden').each(function(){
					$(this).show('fast');
				});				
				
				$(this).addClass('opened');
				$(this).text('Скрыть');
			}
			
			return false;
		});
	});*/
	
	$('.description_block').each(function(){
		$(this).find('a').click(function(){
			if ($(this).hasClass('opened')) {
				$(this).siblings('p').hide('fast');
				
				$(this).removeClass('opened');
			} else {
				$(this).siblings('p').show('fast');
				$(this).addClass('opened');
			}
			
			return false;
		});
	});
	
	if (window.innerWidth < 980) {
		$('header > ul.main_nav > li').hover(function(){
			if ($(this).hasClass('opened')) {
				$(this).find('ul').stop().hide('fast');
				$(this).removeClass('opened');
			} else {
				$(this).find('ul').stop().show('fast');
				$(this).addClass('opened');
			}
			
			return false;
		});
	}
	
	/* $('button.profile').hover(function(){
		$('.profile_dropdown').stop().show('fast');
	}, function(){
		$('.profile_dropdown').stop().hide('fast');
	}); */
	
	$('body').on('mouseover', 'button.profile, .profile_dropdown', function() {
		$('.profile_dropdown').stop().show();
	});
	
	$('body').on('mouseout', 'button.profile, .profile_dropdown', function() {
		$('.profile_dropdown').stop().hide();
	});
	
	$('#profileModal .tabs li').each(function(){
		$(this).click(function(){
			var index = parseInt($(this).index()) + 1;
			
			$('#profileModal .tabs li').each(function(){
				$(this).removeClass('active');
			});
			
			$('#profileModal .tab_content').each(function(){
				$(this).hide();
			});
			
			
			$('#profileModal .tab_content.tab' + index).show();
			$(this).addClass('active');
		});
	});
	
	$('.wrapper.pay .tabs li').each(function(){
		$(this).click(function(){
			var index = parseInt($(this).index()) + 1;
			
			$('.wrapper.pay .tabs li').each(function(){
				$(this).removeClass('active');
			});
			
			$('.wrapper.pay .tab_content').each(function(){
				$(this).hide();
			});
			
			
			$('.wrapper.pay .tab_content.tab' + index).show();
			$(this).addClass('active');
			
			return false;
		});
	});
	
	$('.events_further_href').each(function(){
		$(this).click(function(){
			if ($(this).hasClass('opened')) {
				
				$('.hidden').hide('fast');
				
				$(this).removeClass('opened');
				$(this).find('span').text('показат еще');
			} else {
								
				$('.hidden').show('fast');				
				
				$(this).addClass('opened');
				$(this).find('span').text('скрыть');
			}
			
			return false;
		});
	});
	
	$('.events_last_further_href').each(function(){
		$(this).click(function(){
			if ($(this).hasClass('opened')) {
				
				$('.hidden').hide('fast');
				
				$(this).removeClass('opened');
				$(this).find('span').text('показат еще');
			} else {
								
				$('.hidden').show('fast');				
				
				$(this).addClass('opened');
				$(this).find('span').text('скрыть');
			}
			
			return false;
		});
	});
	
	$('.events_future_further_href').each(function(){
		$(this).click(function(){
			if ($(this).hasClass('opened')) {
				
				$('.hidden').hide('fast');
				
				$(this).removeClass('opened');
				$(this).find('span').text('показат еще');
			} else {
								
				$('.hidden').show('fast');				
				
				$(this).addClass('opened');
				$(this).find('span').text('скрыть');
			}
			
			return false;
		});
	});
	
	$('.video_further_href').each(function(){
		$(this).click(function(){
			if ($(this).hasClass('opened')) {
				
				$('.hidden_videos').hide('fast');
				
				$(this).removeClass('opened');
				$(this).find('span').text('показать еще');
			} else {
								
				$('.hidden_videos').show('fast');				
				
				$(this).addClass('opened');
				$(this).find('span').text('скрыть');
			}
			
			return false;
		});
	});	
	
	
	
	$('.wrapper.events .events_nav li').each(function(){
		$(this).click(function(){
			var index = parseInt($(this).index()) + 1;
			
			$('.wrapper.events .events_nav li').each(function(){
				$(this).removeClass('active');
			});
			
			$('.wrapper.events .tab_content').each(function(){
				$(this).hide();
			});
			
			
			$('.wrapper.events .tab_content.tab' + index).show();
			$(this).addClass('active');
			
			return false;
		});
	});
	
	$('.sklon_content.hotel .events_nav li').each(function(){
		$(this).click(function(){
			var index = parseInt($(this).index()) + 1;
			
			$('.sklon_content.hotel .events_nav li').each(function(){
				$(this).removeClass('active');
			});
			
			$('.sklon_content.hotel .tab_content').each(function(){
				$(this).hide();
			});
			
			
			$('.sklon_content.hotel .tab_content.tab' + index).show();
			$(this).addClass('active');
			
			return false;
		});
	});
});

function scaleDatepicker() {
	if ($('body').hasClass('index')) {
		var scrollPos = 0;
		var st = $(this).scrollTop();
		if (st > scrollPos){
			
			var off = $("#datepicker").offset();
			var hgt = parseInt($("#datepicker .ui-datepicker").css('height'));
			
			var off_start = $("#datepicker_start").offset();
			var hgt_start = parseInt($("#datepicker_start .ui-datepicker").css('height'));
			
			if (st > (off.top - (hgt + 40))) {
				$("#datepicker .ui-datepicker").css('bottom', '-205px');
				$(".tour_container").css('bottom', '-205px');
				
				if ($('#datepicker_show').val() == '1' || $('#datepicker_start_show').val() == '1') {
					// $(".down_arrow.tours").hide();
					// $(".up_arrow.tours").show();
					/* alert('э'); */
					
					$(".down_arrow.tours").hide();
					$(".up_arrow.tours").show();
				}
			}
			
			if (st > (off_start.top - (hgt_start + 70))) {
				$("#datepicker_start .ui-datepicker").css('bottom', '-205px');
				
				if ($('#datepicker_show').val() == '1' || $('#datepicker_start_show').val() == '1') {
				
					$(".down_arrow.dates").hide();
					$(".up_arrow.dates").show();
				}
			}
		} else {
			
			if (st < 200) {
				$("#datepicker .ui-datepicker").css('bottom', '80px');
				$(".tour_container").css('bottom', '80px');
				
				if ($('#datepicker_show').val() == '1' || $('#datepicker_start_show').val() == '1' ) {
					/* $(".down_arrow.tours").show();
					$(".up_arrow.tours").hide(); */
					$(".down_arrow.tours").show();
					$(".up_arrow.tours").hide();
					
					$(".down_arrow.dates").show();
					$(".up_arrow.dates").hide();
				}
				
				$("#datepicker_start .ui-datepicker").css('bottom', '80px');
			}
		}
		
		scrollPos = st;		
	}
}

function scaleMobileDatepicker() {
	var scrollPos = 0;
	var st = $(this).scrollTop();
	if (st > scrollPos){
		
		var off = $("#datepicker").offset();
		var hgt = parseInt($("#datepicker .ui-datepicker").css('height'));
		
		var off_start = $("#datepicker_start").offset();
		var hgt_start = parseInt($("#datepicker_start .ui-datepicker").css('height'));
		
		if (st > (off.top - (hgt + 40))) {
			// $("#datepicker .ui-datepicker").css('bottom', '-205px');
			$(".tour_container").css('bottom', '-205px');
			
			if ($('#datepicker_show').val() == '1' || $('#datepicker_start_show').val() == '1') {
				$(".down_arrow.tours").hide();
				$(".up_arrow.tours").show();
			}
		}
		
		if (st > (off_start.top - (hgt_start + 70))) {
			$("#datepicker_start .ui-datepicker").css('bottom', '-241px');
			
			if ($('#datepicker_show').val() == '1' || $('#datepicker_start_show').val() == '1') {
				$(".down_arrow.dates").hide();
				$(".up_arrow.dates").show();
			}
		}
	} else {
		
		if (st < 200) {
			// $("#datepicker .ui-datepicker").css('bottom', '80px');
			$(".tour_container").css('bottom', '80px');
			
			if ($('#datepicker_show').val() == '1' || $('#datepicker_start_show').val() == '1') {
				// $(".down_arrow").show();
				$(".up_arrow").show();
			}
			
			$("#datepicker_start .ui-datepicker").css('bottom', '44px');
		}
	}
	
	scrollPos = st;
}