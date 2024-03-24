import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AddItemPage } from '../add-item/add-item.page';
import { EditItemPage } from '../edit-item/edit-item.page';
import { Data } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public items: { title: string, description: string }[] = [];

  constructor(public modalCtrl: ModalController, private navCtrl: NavController, public dataService: Data) {}

  ionViewWillEnter() { 
    if (this.items.length === 0) {
      this.initializeItems();
    }
  }

  initializeItems() {
    this.dataService.getData().then((todos) => {
      if(todos) {
        this.items = todos;
      }
    });
  }

  async addItem() {
    const modal = await this.modalCtrl.create({
      component: AddItemPage
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        this.saveItem(data.data);
      }
    });

    await modal.present();
  }
    
  saveItem(item: { title: string, description: string }) {
    if (item.title.trim() !== '' && item.description.trim() !== '') {
      this.items.push(item);
      this.dataService.save(this.items);
    }
  }

  async editItem(originalItem: { title: string, description: string }) {
    const modal = await this.modalCtrl.create({
      component: EditItemPage,
      componentProps: {
        originalItem: { ...originalItem },
        updatedItem: { title: '', description: '' }
      }
    });
  
    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        this.updateItem(originalItem, data.data);
      }
    });
  
    await modal.present();
  }

  updateItem(originalItem: { title: string, description: string }, updatedItem: { title: string, description: string }) {
    const index = this.items.findIndex(item => item.title === originalItem.title); 
    
    if (index !== -1) {
      this.items[index] = updatedItem;
      this.dataService.save(this.items);
    }
  }
  
  viewItem(item: { title: string, description: string }) { 
    this.navCtrl.navigateForward(['/item-detail'], { state: { item: item } });
  }

  deleteItem(item: { title: string, description: string }) {
    const index = this.items.findIndex(i => i.title === item.title);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.dataService.save(this.items);
    }
  }
}
