import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: InputComponent,
			multi: true,
		},
	],
})
export class InputComponent implements OnInit, ControlValueAccessor {
	@Input() text = '';
	@Input() type = 'text';
	@Input() formControlName = ' ';

	private data: string = '';

	constructor() {}

	ngOnInit(): void {}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	onChange(ev: any) {
		this.data = ev.target.value;
		this.propagateChange(this.data);
	}

	writeValue(obj: any): void {}
	registerOnTouched(fn: any): void {}
	setDisabledState?(isDisabled: boolean): void {}

	private propagateChange = (_: any) => {};
}
