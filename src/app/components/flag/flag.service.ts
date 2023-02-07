import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlagConstants } from '../../constants/FlagConstants';
import { FlagDto } from '../../models/dto/FlagDto';
import { Flag } from '../../models/Flag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlagService {
  private baseUrl = `${environment.baseUrl}/flags`;

  constructor(private http: HttpClient) {}

  create(flag: Flag): Observable<void> {
    const data = this.convert(flag);
    return this.http.post<void>(this.baseUrl, data, {
      headers: FlagConstants.BASE_HEADERS,
    });
  }

  update(flag: Flag): Observable<Flag> {
    const data = this.convert(flag);
    return this.http.put<Flag>(`${this.baseUrl}/${flag._id}`, data, {
      headers: FlagConstants.BASE_HEADERS,
    });
  }

  findAll(expanded?: boolean): Observable<Flag[]> {
    return this.http.get<Flag[]>(`${this.baseUrl}?expanded=${!!expanded}`, {
      headers: FlagConstants.BASE_HEADERS,
    });
  }

  find(id: string, expanded?: boolean): Observable<Flag> {
    return this.http.get<Flag>(`${this.baseUrl}/${id}?expanded=${!!expanded}`, {
      headers: FlagConstants.BASE_HEADERS,
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: FlagConstants.BASE_HEADERS,
    });
  }

  private convert(flag: Flag): FlagDto {
    const data: Flag = Object.assign({}, flag);
    return {
      name: data.name,
      appId: data.app._id ?? '',
      value: data.value,
    };
  }
}
