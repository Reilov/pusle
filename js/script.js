$(document).ready(function(){
    $('.carousel__inner').slick({
        speed:1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/chevron-left-solid.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/chevron-right-solid.svg"></button>'
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item){
      $(item).each(function(i){
        $(this).on('click', function(e){
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
        })
      });
    };

    toggleSlide('.catalog-item__link')
    toggleSlide('.catalog-item__back')

    //modal

    $('[data-model=consultation]').on('click',function(){
      $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #thanks, #order').fadeOut();
    });

    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn();
      })
    });

    //validform

    function valideForms(form){
      $(form).validate({
        rules:{
          name:"required",
          phone:"required",
          email:{
            required: true,
            email: true
          }
        },
        messages:{
          name:"Пожалуйста, введите своё имя",
          phone:"Пожалуйста, введите свой номер телефона",
          email:{
            required:"Пожалуйста, введите свою почту",
            email:"Неправильно введен адрес почты"
          }
        }
      });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e){
      e.preventDefault();
      if(!$(this).valid()){
        return;
      }

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function(){
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn();
        $('form').trigger('reset');
      });
      return false;
    });


    //scroll

    $(window).scroll(function(){
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else  {
        $('.pageup').fadeOut();
      }
    });

    $("a").click(function(){
      const _href = $(this).attr("href");
      $("html, boby").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    new WOW().init();
  });