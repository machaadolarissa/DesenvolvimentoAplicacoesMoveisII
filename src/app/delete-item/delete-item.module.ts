import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteItemPageRoutingModule } from './delete-item-routing.module';

import { DeleteItemPage } from './delete-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteItemPageRoutingModule
  ],
  declarations: [DeleteItemPage]
})
export class DeleteItemPageModule {}
