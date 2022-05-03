import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";
import { TvApiService } from "src/app/services/tv-api.service";

@Component({
    selector: "app-watching",
    templateUrl: "./watching.page.html",
    styleUrls: ["./watching.page.scss"],
})
export class WatchingPage implements OnInit {
    watching: any[] = [];

    constructor(private api: TvApiService, private storage: Storage, private router: Router) { }

    ngOnInit(): void {
        this.refreshWatching();
        // For detecting navigations back from the sub page on watching
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            if (!evt.url.includes("/watching")) {
                return;
            }
            this.refreshWatching();
        });
    }

    async refreshWatching() {
        this.watching = [];
        await this.storage.create();
        const watchList: number[] = await this.storage.get("watching") ?? [];

        for (const id of watchList) {
            const episode = await this.api.getEpisodeFromId(id);
            if (this.watching.includes(episode) === false) {
                this.watching.push(episode);
            }
        }
    }
}
