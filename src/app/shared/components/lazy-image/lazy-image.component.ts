import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {
  @Input() public imageUrl!: string;
  @Input() public alt: string = "";

  public hasLoadedImage: boolean = false;

  ngOnInit(): void {
    if( !this.imageUrl ) throw new Error('Url Image is required.');
  }

  onLoad(): void {
    console.log('Load complete');
    setTimeout( () => {
      this.hasLoadedImage = true;
    }, 1000

    );
  }
}
