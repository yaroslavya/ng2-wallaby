import { NgModule, ErrorHandler } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

/* App Root */
import { AppComponent } from "./app.component";

/** Routes */
//import { routing } from "./routes";


@NgModule({
    imports: [
        //routing,
        BrowserModule,
        CommonModule,
        RouterModule,

    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
