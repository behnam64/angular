import { Component, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HomeApiService } from '../services/home-api.service';
import { speakerDetailInterface, speakerInterface, speakerSessionsInterface } from './home.interface';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  speakers: speakerInterface[] = [];
  speakerDetail: speakerDetailInterface = {id: "", value: ""};
  speakerSessions: speakerSessionsInterface = {id: "", list: []};
  isLoadingSpeakerSessions = false;

  constructor(
    private _meta: Meta,
    private _title: Title,
    private _homeApiService: HomeApiService,
  ) {}
  
  ngOnInit() {
    this.setMetaTags();
    this.getSpeakers();
  }

  setMetaTags() {
    this._meta.updateTag({name: 'description', content: "title"});
    this._meta.updateTag({name: 'thumbnail', content: "/assets/images/image.png"});
    this._meta.updateTag({property:'og:type', content: "website"});
    this._meta.updateTag({property:'og:image', content: "/assets/images/image.png"});
    this._meta.updateTag({property:'og:description',content: "title"});
    this._meta.updateTag({name:'twitter:image',content: "/assets/images/image.png"});
    this._meta.updateTag({name:'twitter:description',content: "title"});
    this._title.setTitle("title");
    this._meta.updateTag({property:'og:title',content: "title"});
    this._meta.updateTag({name:'twitter:title',content: "title"});
  }

  getSpeakers() {
    this._homeApiService.getSpeakers().subscribe(response => {
      response.collection.items.forEach((el: any) => {
        let url = el.href.split("/")
        el.id = url[url.length - 1];
      });
      this.speakers = response.collection.items;
      console.log(response.collection.items)
    })
  }

  getSpeakerDetail(id: string) {
    this.speakerDetail = {id: "", value: ""};
    this._homeApiService.getSpeakerDetail(id).subscribe(response => {
      this.speakerDetail = {id: id, value: response};
    }, error => {
      this.speakerDetail = {id: id, value: error.error.text};
    })
  }

  getSpeakerSessions(id: string) {
    this.speakerSessions = {id: id, list: []};
    this.isLoadingSpeakerSessions = true;
    this._homeApiService.getSpeakerSessions(id).subscribe(response => {
      this.isLoadingSpeakerSessions = false;
      this.speakerSessions = {id: id, list: response.collection.items};
    })
  }
}