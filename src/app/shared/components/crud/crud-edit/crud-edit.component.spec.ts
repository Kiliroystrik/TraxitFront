import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEditComponent } from './crud-edit.component';

describe('CrudEditComponent', () => {
  let component: CrudEditComponent;
  let fixture: ComponentFixture<CrudEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
