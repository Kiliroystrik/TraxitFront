import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-crud-list',
  standalone: true,
  imports: [],
  templateUrl: './crud-list.component.html',
  styleUrls: ['./crud-list.component.scss']
})
export class CrudListComponent<T extends { [key: string]: any }> {
  @Input() items: T[] = [];
  @Input() displayFields: { title: string, field: string }[] = [];
  @Output() view = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  onView(item: T) {
    this.view.emit(item);
  }

  onEdit(item: T) {
    this.edit.emit(item);
  }

  onDelete(item: T) {
    this.delete.emit(item);
  }

  getField(item: T, field: string): any {
    return field.split('.').reduce((o, i) => o ? o[i] : null, item);
  }

}
