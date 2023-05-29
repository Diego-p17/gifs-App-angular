import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchReponse } from '../interfaces/gifs.interface';


@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = []
  private GYPHY_APIKEY:string    = 'Z8HQWmyOvvxokw9XufWt56yWQELdOuX8';
  private serviceUrl: string     = 'https://api.giphy.com/v1/stickers';


  public gifList:Gif[] = [];

  constructor( private http:HttpClient ) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  searchTag( tag:string):void{

    if(tag.length === 0){ return }
    this.organizeHistory( tag );

    const params = new HttpParams()
      .set( 'api_key', this.GYPHY_APIKEY )
      .set( 'limit', '10' )
      .set( 'q', tag )

    this.http.get<SearchReponse>(`${this.serviceUrl}/search`, {params: params})
    .subscribe( (resp) => {
      this.gifList = resp.data;
      console.log({gifs: this.gifList})
    });

    console.log(this._tagsHistory);
  }

  organizeHistory( tag:string):void{
    tag = tag.toLowerCase();

    if( this._tagsHistory.includes(tag) ){
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice( 0, 10 );

    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem( 'history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{

    if(!localStorage.getItem( 'history')){ return; }
    this._tagsHistory =  JSON.parse( localStorage.getItem( 'history' )!);

    if(this._tagsHistory.length === 0){ return;}
    this.searchTag( this.tagsHistory[0]);


  }

}
