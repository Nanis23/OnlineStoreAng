import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentStateService {
  private activeComponentSubject = new BehaviorSubject<string>(''); // Default value
  activeComponent$ = this.activeComponentSubject.asObservable();

  setActiveComponent(component: string) {
    this.activeComponentSubject.next(component);
  }
}
