import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var TweenMax: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    $("select").niceSelect();

    /*--------------------------------------
       Isotope initialization
       --------------------------------------*/
    var $container = $(".isotope-wrap");
    if ($container.length > 0) {
      var $isotope: any;
      $(".featuredContainer", $container).imagesLoaded(
        () => {
          $isotope = $(".featuredContainer", $container).isotope({
            filter: "*",
            transitionDuration: "1s",
            hiddenStyle: {
              opacity: 0,
              transform: "scale(0.001)",
            },
            visibleStyle: {
              transform: "scale(1)",
              opacity: 1,
            },
          });
        }
      );
      $container.find(".isotope-classes-tab").on("click", "a", function () {
        var $this = $(this);
        $this.parent(".isotope-classes-tab").find("a").removeClass("current");
        $this.addClass("current");
        var selector = $this.attr("data-filter");
        console.log('selector', selector);
        $isotope.isotope({
          filter: selector,
        });
        return false;
      });
    }
    const that = this;
    $('body').on('mousemove', '.motion-effects-wrap', function (e) {
      that.parallaxIt(e, ".motion-effects1", -30);
      that.parallaxIt(e, ".motion-effects2", -30);
      that.parallaxIt(e, ".motion-effects3", -30);
      that.parallaxIt(e, ".motion-effects4", -10);
      that.parallaxIt(e, ".motion-effects5", -30);
      that.parallaxIt(e, ".motion-effects6", -30);
      that.parallaxIt(e, ".motion-effects7", -30);
      that.parallaxIt(e, ".motion-effects8", -30);
      that.parallaxIt(e, ".motion-effects9", -30);
      that.parallaxIt(e, ".motion-effects10", -30);
      that.parallaxIt(e, ".motion-effects11", 30);
      that.parallaxIt(e, ".motion-effects12", -100);
      that.parallaxIt(e, ".motion-effects13", 100);
    });
    
  }
  parallaxIt(e, target_class, movement) {
    let $wrap = $(e.target).parents(".motion-effects-wrap");
    if (!$wrap.length) return;
    let $target = $wrap.find(target_class);
    let relX = e.pageX - $wrap.offset().left;
    let relY = e.pageY - $wrap.offset().top;
    TweenMax.to($target, 1, {
      x: ((relX - $wrap.width() / 2) / $wrap.width()) * movement,
      y: ((relY - $wrap.height() / 2) / $wrap.height()) * movement,
    });
  }
}
