import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage {

  title: string = '';
  description: string = '';
  errorMessage: string = '';

  constructor(public modalCtrl: ModalController) { }

  close() {
    this.modalCtrl.dismiss();
  }

  saveItem() {
    if (this.title && this.description) {
      const newItem = { title: this.title, description: this.description };
      this.modalCtrl.dismiss(newItem);
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos';
    }
  }
}