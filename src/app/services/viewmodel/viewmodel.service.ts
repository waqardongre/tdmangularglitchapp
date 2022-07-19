import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DJANGO_SERVER } from 'src/app/global';

@Injectable({
  providedIn: 'root'
})
export class ViewmodelService {
  
  constructor(
    private httpClient: HttpClient
    ) { }

  getModel(filename: any): Observable<any> {
    return this.httpClient
    .get(DJANGO_SERVER+'tdmodels/'+`?filename=${filename}`, {
      responseType: "blob"
    });
  }

}
