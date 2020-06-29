import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmoduleloginComponent } from './submodulelogin.component';

describe('SubmoduleloginComponent', () => {
  let component: SubmoduleloginComponent;
  let fixture: ComponentFixture<SubmoduleloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmoduleloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmoduleloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
