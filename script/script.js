$(function () {
  let checked = 0;
  let timerStarted = 0;
  $('.second-block').sortable({});
  let intervalID, minute, second, bg;

  function timer() {
    if ($('.timer').text() == '01:00') {
      minute = '1';
      second = '';
    } else {
      let str = $('.timer').text();
      let time_new = str.split(':');
      minute = +time_new[0];
      second = +time_new[1];
    }

    let duration = +(60 * minute + second);
    let start = Date.now(),
      diff,
      minutes,
      seconds;
    intervalID = setInterval(() => {
      diff = duration - (((Date.now() - start) / 1000));
      minutes = Math.floor(diff / 60);
      seconds = Math.floor(diff % 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      if (diff <= 0) {
        start = Date.now() + 1000;
      }
      $('.modal-title').text(`You still have time, you sure? ${minutes}:${seconds}`);

      $('.timer').text(`${minutes}:${seconds}`);
      if ($('.timer').text() == '00:00' || checked == 1) {
        clearInterval(intervalID);
        $('.timer').text('01:00');
        $('.modal-block').css({
          display: 'block',
          zIndex: 12
        });
        $('.black-block').css({
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'block',
          zIndex: 11
        });
        $('.modal-title').text("It's a pity, but you lost.");
        $('#check').css('display', 'none');
        $('#close').css('margin-left', '250px');
        timerStarted = 0;
        checked = 0;
      }
      if (checked == 1) {
        clearInterval(intervalID);
      }
    }, 1000);
  }

  $('.first-block>div').draggable({
    revert: true,
    distance: 50,
    start: function () {
      checked = 0;
      $('.result').attr('disabled', false);
      $('.result').css('background-color', '#e34040');
      if (timerStarted == 0) {
        timer();
        timerStarted = 1;
        $('.start').attr('disabled', true);
        $('.start').css('background-color', 'rgba(227, 64, 64, 0.548)')
      }
      bg = $(this).css('background');
      textContent = $(this).text();
    }
  });
  $('.second-block>div').droppable({
    accept: '.first-block>div',
    drop: function (event, ui) {
      if ($(this).css('background').includes("none")) {
        ui.draggable[0].style.opacity = '0';
        ui.draggable[0].style.background = 'none';
        event.target.style.background = bg;
        event.target.textContent = textContent;
      } else {
        for (let i = 0; i < $('.second-block>div').length; i++) {
          if ($('.second-block>div').eq(i).css('background').includes("none")) {
            ui.draggable[0].style.background = 'none';
            ui.draggable[0].style.opacity = '0';
            $('.second-block>div').eq(i).css('background', bg);
            $('.second-block>div').eq(i).text(textContent);
            break;
          }
        }
      }

    }
  })

  $('.start').on('click', function () {
    $('.result').attr('disabled', false);
    if (timerStarted == 0) {
      timer();
      timerStarted = 1;
      $('.start').css('background-color', 'rgba(227, 64, 64, 0.548)')
      $('.start').attr('disabled', true);
      $('.result').css('background-color', '#e34040');
      $('#check').css('display', 'block-inline');
      $('#close').css('margin-left', '210px');
    }
  })

  $('.result').on('click', function () {
    $('.modal-block').css({
      display: 'block',
      zIndex: 12
    });
    $('.black-block').css({
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'block',
      zIndex: 11
    });
    $('#check').css({
      display: 'block',
      margin: '-36px 0 0 300px'
    });
    $('#close').css('margin-left', '210px');
  })



  $('.newGame').on('click', function () {
    $('.first-block>div').css('opacity', 1)
    $('.first-block>div').css('background', '')
    $(function () {
      var $divs = $('.img');
      var arr = [];
      $divs.each(function () {
        arr.push($(this).detach());
      });
      arr.sort(function () {
        return Math.random() - 0.5;
      });
      for (var index in arr) {
        $('.first-block').append(arr[index]);
      }
      for (let i = 0; i < $('.first-block>div').length; i++) {
        $('.second-block>div').eq(i).css('background', 'none');
        $('.second-block>div').eq(i).text('');
      }
      $('.timer').text('01:00');
      clearInterval(intervalID);
    });
    $('.start').css('background-color', '#e34040');
    $('.start').attr('disabled', false);

    $('.result').attr('disabled', true);
    $('.result').css('background-color', 'rgba(227, 64, 64, 0.548)');
    timerStarted = 0;
    checked = 0;
  })

  $('#close').on('click', function () {
    $('.modal-block').css({
      display: 'none'
    });
    $('.black-block').css({
      display: 'none'
    });

  });
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  $('#check').on('click', function () {
    $('.modal-block').css({
      display: 'none'
    });

    $('.timer').text('01:00');
    clearInterval(intervalID);
    let arr = $('.second-block>div');
    if (arr.length == numbers.length && checked == 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr.eq(i).text() == numbers[i]) {
          checked = 1;
        } else {
          checked = 0;
          break
        }
      }
    }
    if (checked == 0) {
      $('.modal-block').css({
        display: 'block',
        zIndex: 12
      });
      $('.black-block').css({
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'block',
        zIndex: 11
      });
      $('.modal-title').text("It's a pity, but you lost.");
      $('#check').css('display', 'none');
      $('#close').css('margin-left', '250px');
      checked = 0;
      timerStarted = 0;
    } else {
      $('.modal-block').css({
        display: 'block',
        zIndex: 12
      });
      $('.black-block').css({
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'block',
        zIndex: 11
      });
      $('.modal-title').text("Woohoo, well done, you did it!");
      $('#check').css('display', 'none');
      $('#close').css('margin-left', '250px');
      timerStarted = 0;
      checked = 0;

    }
    $('.result').attr('disabled', true);
    $('.result').css('background-color', 'rgba(227, 64, 64, 0.548)');
    $('.start').attr('disabled', true);
    $('.start').css('background-color', 'rgba(227, 64, 64, 0.548)')
  })
})