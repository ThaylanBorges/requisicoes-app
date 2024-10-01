import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoComponent } from './requisicao.component';

describe('RequisicaoComponent', () => {
  let component: RequisicaoComponent;
  let fixture: ComponentFixture<RequisicaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequisicaoComponent]
    });
    fixture = TestBed.createComponent(RequisicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
