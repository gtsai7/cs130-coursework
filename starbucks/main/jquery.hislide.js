(function($) {
    // 本函数每次调用只负责一个轮播图的功能
    // 也就是说只会产生一个轮播图，这个函数的作用域只能分配给一个轮播图
    // 要求在调用本函数的时候务必把当前轮播图的根标签传递过来
    // 这里的形参 ele 就是某个轮播的根标签
    var slide = function(ele,options) {
        var $ele = $(ele);
        // 默认设置选项
        var setting = {
        		// 控制轮播的动画时间
            speed: 1000,
            // 控制 interval 的时间 (轮播速度)
            interval: 1000,

        };
        // 对象合并
        $.extend(true, setting, options);
        // 规定好每张图片处于的位置和状态
        var states = [
            { $zIndex: 1, width: 225, height: 275, top: 40, left: 0, $opacity: 1},
            { $zIndex: 10, width: 300, height: 350, top: 0, left: 260, $opacity: 1},
            { $zIndex: 2, width: 225, height: 275, top: 40, left: 600, $opacity: 1},
            { $zIndex: 0, width: 225, height: 275, top: 40, left: 860, $opacity: 1},
        ];

        var $lis = $ele.find('.drink');
        var timer = null;

        // 事件
        $ele.find('.hi-next').on('click', function() {
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            // autoPlay();
        });

        move();

        // 让每个 li 对应上面 states 的每个状态
        // 让 li 从正中间展开
        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
                document.querySelector('#toffee').style.overflow = 'visible';
                document.querySelector('#nougat').style.overflow = 'visible';
                document.querySelector('#mocha').style.overflow = 'visible';
                document.querySelector('#panettone').style.overflow = 'visible';
                document.querySelector('.hi-next').style.opacity = '0';
                document.querySelector('.hi-prev').style.opacity = '0';
            });
        }

        // 切换到下一张
        function next() {
            // 原理：把数组最后一个元素移到第一个
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    // 找到要轮播的轮播图的根标签，调用 slide()
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        // 返回值，以便支持链式调用
        return this;
    }
})(jQuery);

// Menu drop

count = 0;

drop = () => {
  if (count == 0) {
    document.querySelector('.drop').style.display = 'block';
    count = 1;
  } else {
    document.querySelector('.drop').style.display = 'none';
    count = 0;
  }
};

document.querySelector('#menu').onclick = drop;
