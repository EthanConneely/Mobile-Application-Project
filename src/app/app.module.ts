import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IonicStorageModule } from "@ionic/storage-angular";

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [
        InAppBrowser,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
