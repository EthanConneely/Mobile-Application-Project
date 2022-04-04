import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { TvApiService } from "src/app/services/tv-api.service";

@Component({
    selector: "app-watching",
    templateUrl: "./watching.page.html",
    styleUrls: ["./watching.page.scss"],
})
export class WatchingPage implements OnInit {
    watching: any[] = [];

    constructor(private api: TvApiService, private storage: Storage) {}

    async ngOnInit() {
        await this.storage.create();
        const watchList: number[] = await this.storage.get("watching");

        for (const id of watchList) {
            const episode = await this.api.getShow(id).toPromise();
            this.watching.push(episode);
        }
    }

    openShow() {
        console.log("clicked");
    }
}
