import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public set(name: string, item: any) {
    localStorage.setItem(name, JSON.stringify(item));
}
public get(name: any) {
  return localStorage.getItem(name);
    // return JSON.parse(localStorage.getItem(name));
}
}
