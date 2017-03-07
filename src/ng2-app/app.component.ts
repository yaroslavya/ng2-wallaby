import { Component } from "@angular/core";

@Component({
    selector: "[apollo-app]",
    styles: [require("./app.scss")],
    host: {
        style: "height: 100%"
    },
    template: `
        <div class="root">
                    Hello Wallaby world!!!
            <div class="content">
                HELLO WORLD II
                <!--<router-outlet></router-outlet>-->
            </div>
        </div>           
    `
})
export class AppComponent {
    constructor() {  }
}
