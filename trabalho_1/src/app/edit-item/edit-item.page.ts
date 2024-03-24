import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage {

  originalItem: { title: string, description: string } = { title: '', description: '' };
  errorMessage: string = '';

  constructor(public modalCtrl: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    const originalItem = this.navParams.get('originalItem');
    if (originalItem) {
      this.originalItem = { ...originalItem };
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  editItem() {
    if (this.originalItem.title.trim() !== '' && this.originalItem.description.trim() !== '') {
      this.modalCtrl.dismiss(this.originalItem);
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos';
    }
  }
}
