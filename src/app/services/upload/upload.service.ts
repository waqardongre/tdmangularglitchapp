import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ DJANGO_SERVER } from '../../global';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor(private httpClient: HttpClient) { }

  public upload(formData: any):Observable<any> {
    return this.httpClient
    .post(DJANGO_SERVER + 'tdmodels/', formData)
  }

  public getAll(): Observable<any[]> {
    return this.httpClient
    .get<any[]>(DJANGO_SERVER + 'tdmodels/')
  }
}