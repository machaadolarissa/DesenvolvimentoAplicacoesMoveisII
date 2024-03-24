import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class Data {

  constructor(private storage: Storage) { 
    this.storage.create();
  }

  async getData() {
    return await this.storage.get('items');
  }

  async save(items: any[]) {
    await this.storage.set('items', items);
  }
}
