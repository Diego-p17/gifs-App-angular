import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  listHistory: string[] = [];

  constructor(private gifsService:GifsService) { }

  ngOnInit() {
  }

  get tagsHistory():string[] {
    return this.gifsService.tagsHistory
  }

  searchTag(tag:string):void{
    this.gifsService.searchTag(tag);
  }

}
