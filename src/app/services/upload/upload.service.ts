import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ DJANGO_SERVER } from 'src/app/global';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public upload(formData: any):Observable<any> {
    return this.http.post(DJANGO_SERVER + 'tdmodels/', formData)
  }

  public getAll(): Observable<any[]> {
    return this.http.get<any[]>(DJANGO_SERVER + 'tdmodels/')
  }
}