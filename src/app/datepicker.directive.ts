import { ElementRef, OnInit, Directive, Output, EventEmitter } from "@angular/core";

declare var $: any;

@Directive({
    selector: "[datePicker]"
})
export class DatePicker implements OnInit {
    @Output() dateChange = new EventEmitter();
    private element: ElementRef;

    constructor(element: ElementRef) {
        this.element = element;
    }

    public ngOnInit(): void {
        let that = this;
        $(this.element.nativeElement).datetimepicker({
            format: "YYYY-MM-DD",
            ignoreReadonly: true
        });
        $(this.element.nativeElement).on("dp.change", function (e) {
            that.dateChange.emit({
                value: e
            });
        });
    }
}