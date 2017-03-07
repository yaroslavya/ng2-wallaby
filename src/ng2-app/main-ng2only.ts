import "./vendor";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";

window.onload = () => {
            return platformBrowserDynamic().bootstrapModule(AppModule);
};
