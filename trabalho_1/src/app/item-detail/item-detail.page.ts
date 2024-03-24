import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {

  item: { title: string; description: string } = { title: '', description: '' };

  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.item = navigation.extras.state['item'];
    }
  }
}
