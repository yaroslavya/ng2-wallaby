import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, tick, fakeAsync, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from "../../src/ng2-app/app.component";

describe("AppComponent", () => {
	let comp: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ AppComponent ],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		comp = fixture.componentInstance;
		el = fixture.debugElement.nativeElement;
	});

	it("should be created and test itself ", fakeAsync(async () => {
		let current = comp;

		expect(current).toBeDefined("Should be defined in anything");
	}));

	it("some other test", () => {
		expect(true).toEqual(true);
	})
});
