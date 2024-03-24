import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteItemPage } from './delete-item.page';

describe('DeleteItemPage', () => {
  let component: DeleteItemPage;
  let fixture: ComponentFixture<DeleteItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeleteItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
