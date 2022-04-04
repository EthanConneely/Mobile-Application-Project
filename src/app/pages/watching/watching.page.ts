import { AfterViewInit, Component } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { TvApiService } from "src/app/services/tv-api.service";

@Component({
    selector: "app-watching",
    templateUrl: "./watching.page.html",
    styleUrls: ["./watching.page.scss"],
})
export class WatchingPage {
    watching: any[] = [];

    constructor(private api: TvApiService, private storage: Storage) {}

    async ionViewWillEnter() {
        this.watching = [];
        await this.storage.create();
        let watchList: number[] = await this.storage.get("watching");

        if (watchList === null) {
            watchList = [];
        }

        for (const id of watchList) {
            const episode = await this.api.getShow(id).toPromise();
            this.watching.push(episode);
        }
    }

    openShow() {}
}
