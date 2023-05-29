import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: 'search-box.component.html'
})

export class SearchBoxComponent implements OnInit {
  constructor( private gifsService:GifsService) { }

  ngOnInit() { }

@ViewChild('txtTagInput')
tagInput!: ElementRef<HTMLInputElement>;

  searchTag():void{
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
    console.log({newTag});
  }
}
