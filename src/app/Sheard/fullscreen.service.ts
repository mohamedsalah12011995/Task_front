import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class FullScreenService {
  elem;

  constructor(@Inject(DOCUMENT) private document: any) {
    this.elem = this.document.documentElement;

  }

  public  SucssesToaster = new Subject();
  public ErrorToaster = new Subject();


  openFullscreen() {

    if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

}
