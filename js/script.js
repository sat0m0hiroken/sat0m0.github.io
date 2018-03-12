$(document).ready(function(){
/*メニューから移動*/
	$('a[href*="#"]' + 'a:not(.js--noScroll)')// class'.no-scroll'が付与されているaタグはスクロールから除外
		.click(function(e){
			e.preventDefault();
			var id=$(this).attr('href');
			id=id.replace(/^(.*)#(.*)$/,'$2');
			var MOVE=$('#'+id).offset().top;
      var width_window = $(window).width();

      if(width_window >= 768 )
      {
        var offset = 110;

        if( id == 'top' )
        {
          offset = 190;
  				$('h1').removeClass('low')
  				$('header').removeClass('low')
        }else if( id == 'about' )
        {
          offset = 110;
        }else{
          offset = 110 - 75;
        }
      }else{
        offset = 100;
      }

			$('html, body').animate({scrollTop:MOVE-offset},1500,'easeOutCubic');
				{
					$('header').removeClass('open');
					$('button#nav_button span').removeClass('close');
				};
		});
});

//アンカーリンク飛び時にswing効果
$(function(){
  $("a[href*=#]").click(function(){
  $('html,body').animate({
    scrollTop: $($(this).attr("href")).offset().top - 50}, 'slow','swing');
  return false;
  });
});


//TOPページへ戻る
$(function() {
    var showFlag = false;
    var topBtn = $('#page-top');
    topBtn.css('bottom', '-100px');
    var showFlag = false;
    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {
			$('#page-top').fadeIn();
        if ($(this).scrollTop() > 500) {
            if (showFlag == false) {
                showFlag = true;
								//正ならbottomから上へ200秒の速さで90pxまであげる
                topBtn.stop().animate({'bottom' : '90px'}, 500);
            }
        } else {
            if (showFlag) {
                showFlag = false;
								//負ならbottomからへ200秒の速さで-100pxまでさげる
                topBtn.stop().animate({'bottom' : '-100px'}, 500);
            }
        }
    });
    //スクロールをしてトップ
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 5000
        });
        return false;
    });
});

// windowが768px以下の時に処理
$(function() {
  $(window).on('load , resize', function(event) {
    var w     = $(window).width(),
        x     = 768,
        $body = $('body'),
        top  = $('#top');

    // １番高い黃リボンタイトルの高さに合わせコンテンツにpaddingを付与
    if (w < x) {
      $body.addClass('sp');
      // var headH = $('.nav--sp').outerHeight();
      // top.css('padding-top', headH);// アイキャッチにpaddingを付与
    } else {
      $body.removeClass('sp');
      // top.css('padding-top', '0');
    }

    // .titleが3行以上になる場合の余白調整
    if ($body.hasClass('sp')) {
      $('.outer .contents.js__padding').each(function(index, val) {
        var h = $('.title').outerHeight();
         $(this).css('padding-top', h);
      });
    }
  });
});

// $(function() {
//   $(window).scroll(function(event) {
//     var scroll = $(window).scrollTop();
//     if (scroll > 0) {
//       $('.nav').css('position', 'fixed');
//     } else if (scroll == 0) {
//       $('.nav').css('position', 'relative');
//     }
//   });
// });

// sp side nav
$(function() {
  var $body = $('body');

  // ハンバーガーメニュークリック時にbodyにclassを付与
  $('.js__sideMenuBtn').on('click', function () {
    $body.toggleClass('side-open');
    // ハンバーガーメニューにclass"active"が付与されている時
    if ($('.js__sideMenuBtn').hasClass('active')) {
			//閉じる時にside-menuのdisplayをnoneに変更
			$('.side-menu').css('display','none');
      $(this).removeClass('active');
    }
    // 付与されていない時
    else {
			//開ける時にside-menuのdisplayをinline-blockに変更
			$('.side-menu').css('display','inline-block');
      $(this).addClass('active');
    }
    // メインコンテンツを覆うoverlayをクリックした時
    $('.js__overlay').on('click', function () {
			//閉じる時にside-menuのdisplayをnoneに変更
			$('.side-menu,#sub').css('display','none');
      $body.removeClass('side-open');
      	$('.js__sideMenuBtn').removeClass('active');
  	});
  });
});

// SP 疑似要素:hoverを有効化
var linkTouchStart = function(){
    thisAnchor = $(this);
    touchPos = thisAnchor.offset().top;
    moveCheck = function(){
        nowPos = thisAnchor.offset().top;
        if(touchPos == nowPos){
            thisAnchor.addClass("hover");
        }
    }
    setTimeout(moveCheck,100);
  }
var linkTouchEnd = function(){
  thisAnchor = $(this);
  hoverRemove = function(){
      thisAnchor.removeClass("hover");
  }
  setTimeout(hoverRemove,500);
}
$(document).on('touchstart mousedown','a',linkTouchStart);
$(document).on('touchend mouseup','a',linkTouchEnd);

// main image
$(window).on('load', function() {
  var $h1Img = $('.h1__img');
  $h1Img.css('opacity', '0');
  $('.h1__img').animate({
    marginBottom: 0,
    opacity: 1
    },
    1500);
});

//スクロールするとナビゲーションが消える
/*
$(function() {
	$(window).scroll(function () {
		var top = $(this).scrollTop();
		if(top > 100) {
			$(".nav--sp").fadeOut('800');
		}else{
			$(".nav--sp").fadeIn('800');
		}
	});
});
*/

// flow page
$(function() {
  var $contBg = $('.bg--flowLine'),
      $target = $('.flow__branch');
  $contBg + $target.css('opacity', '0');

  $(window).on('scroll resize', function(){
    var $contBgH = $contBg.get(0).offsetTop;
    var $contH   = $('.contWrap--flow').height();
    var $scroll  = $(document).scrollTop();
    var $windowH = $(window).height();
     if ($scroll > $contBgH) {
      $contBg.stop().animate({
        opacity: 1,
        height: $contH}, 2700);
     }

     if ($scroll > $contBgH) {
      $target.on('inview', function(){
        $(this).addClass('flow__branch--show');
      });
    }
    else{
      $target.on('inview', function(){
        $(this).removeClass('flow__branch--show');
      });
     }
  });
});

// Sticky グロナビ固定
$(window).load(function(){
  $(".header").sticky({ topSpacing: 0 });
});

$(".modh").hover(function(){
	$('.menu').removeClass('.links');
});

//ドロップダウンメニュー
if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
//スマホの場合無効になる処理
$(function() {
	$('.modh').hover(function(){
	if ($('#sub').css('display') == 'none'){ //#subのdisplayがnoneの場合
		$('#sub').css('display','grid');
	} else {//#subのdisplayがnoneではない場合
		$('#sub').css('display','none');
	}
	});
});
} else {
	//スマホの場合有効になる処理
	$(function() {
		$('.links').click(function(){
		if ($('#sub').css('display') == 'none'){ //#subのdisplayがnoneの場合
			$('#sub').css('display','grid');
		} else {//#subのdisplayがnoneではない場合
			$('#sub').css('display','none');
		}
		});
	});
}

//ナビゲーション アイコン ホバー時動きを止める
$('#links,.sub').hover(function(){
	$('.fluffy').css("animation" , "none");
},function(){
	$('.fluffy').css("animation" , "fluffy1 3s ease infinite");
});
