import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FlagConstants } from '../../constants/FlagConstants';
import { AppDb } from '../../models/AppDb';

@Injectable({
  providedIn: 'root',
})
export class AppdbService {
  private baseUrl = `${environment.baseUrl}/apps`;

  constructor(private http: HttpClient) {}

  create(appDb: AppDb): Observable<void> {
    const data = this.convert(appDb);
    return this.http.post<void>(this.baseUrl, data, {
      headers: FlagConstants.BASE_HEADERS,
    });
  }

  update(appDb: AppDb): Observable<AppDb> {
    const data = this.convert(appDb);
    return this.http.put<AppDb>(`${this.baseUrl}/${appDb._id}`, data, {
      headers: FlagConstants.BASE_HEADERS,
    });
  }

  findAll(expanded?: boolean): Observable<AppDb[]> {
    return this.http.get<AppDb[]>(`${this.baseUrl}?expanded=${!!expanded}`, {
      headers: FlagConstants.BASE_HEADERS,
    });
  }

  find(id: string, expanded?: boolean): Observable<AppDb> {
    return this.http.get<AppDb>(
      `${this.baseUrl}/${id}?expanded=${!!expanded}`,
      {
        headers: FlagConstants.BASE_HEADERS,
      }
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: FlagConstants.BASE_HEADERS,
    });
  }

  private convert(appDb: AppDb): AppDb {
    const copy: AppDb = Object.assign({}, appDb);
    return copy;
  }
}
