import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud-detail',
  standalone: true,
  templateUrl: './crud-detail.component.html',
  styleUrls: ['./crud-detail.component.scss']
})
export class CrudDetailComponent<T extends { [key: string]: any }> implements OnInit {
  @Input() item: T | null = null;
  @Input() fields: { title: string, field: string }[] = [];

  ngOnInit(): void { }

  getField(item: T, field: string): any {
    return field.split('.').reduce((o, i) => o ? o[i] : null, item);
  }
}
