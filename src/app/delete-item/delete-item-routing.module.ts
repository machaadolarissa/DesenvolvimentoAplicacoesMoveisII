import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteItemPage } from './delete-item.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteItemPageRoutingModule {}
