import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Page, ContentView } from "ui/page";
import { SwipeGestureEventData } from "ui/gestures/gestures";

import * as fs from "file-system";
import * as builder from "ui/builder";

@Component({
  selector: "welcome",
  moduleId: module.id,
  templateUrl: "./welcome.component.html"
})
export class WelcomeComponent implements OnInit {
  private slidesPath = 'pages/welcome/slides';
  private slideFiles = ['slide1.xml', 'slide2.xml', 'slide3.xml'];

  private currentSlideNum: number = 0;
  private slideCount = 3;
  private slides: Array<any> = new Array(3);

  @ViewChild('slideContent') slideElement: ElementRef;

  private slideView: ContentView;

  constructor(
    private page: Page,
    private nav: RouterExtensions,
  ) {
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.cssClasses.add("welcome-page-background");
    this.page.backgroundSpanUnderStatusBar = true;

    this.slideView = this.slideElement.nativeElement;

    this.loadSlides(this.slideFiles, this.slidesPath).then((slides: any) => {
      this.slides = slides;
      this.slideView.content = this.slides[0];
    });
  }

  private loadSlides(slideFiles, slidesPath) {
    return new Promise(function (resolve, reject) {
      const slides = []
      const currentAppFolder = fs.knownFolders.currentApp();
      const path = fs.path.normalize(currentAppFolder.path + "/" + slidesPath);
      slideFiles.forEach((dataFile, i) => {
        const slidePath = path + "/" + dataFile;
        slides.push(builder.load(slidePath))
      });

      resolve(slides);
    });
  }

  skipIntro() {
    // this.nav.navigate(["/home"], { clearHistory: true });
    this.nav.navigate(["/home"]);
  }

  onSwipe(args: SwipeGestureEventData) {
    let count = this.slideCount;
    if (args.direction == 2) {
      this.currentSlideNum = (this.currentSlideNum + 1) % count;
    } else if (args.direction == 1) {
      this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
    }

    setTimeout(() => {
      this.slideView.content = this.slides[this.currentSlideNum];
    }, 100);
  }

  itemSelected(item: number) {

    console.log(item)
  }

  getSliderItemClass(item: number) {
    if (item == this.currentSlideNum)
      return "caro-item-dot caro-item-dot-selected";

    return "caro-item-dot";
  }
}
