import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { Storage } from "@ionic/storage-angular";
import { TvApiService } from "src/app/services/tv-api.service";

@Component({
    selector: "app-show",
    templateUrl: "./show.page.html",
    styleUrls: ["./show.page.scss"],
})
export class ShowPage implements OnInit {
    show: any = {};
    seasons = new Map<number, Array<any>>();

    id: number;

    addToWatchList = true;

    constructor(
        private route: ActivatedRoute,
        private api: TvApiService,
        private storage: Storage,
        private iab: InAppBrowser
    ) {

    }

    async ngOnInit() {
        // get the id of the show from the id passed from the router
        this.id = +this.route.snapshot.paramMap.get("id");

        this.show = await this.api.getEpisodeFromId(this.id);

        const data = await this.api.getShowsEpisodes(this.id);

        for (const episode of data) {
            const eps = this.seasons.get(episode.season) ?? [];
            eps.push(episode);
            this.seasons.set(episode.season, eps);
        }

        await this.storage.create();
        const watchingList: any[] = await this.storage.get("watching") ?? [];
        this.addToWatchList = watchingList.includes(this.id) === false;
    }

    async toggleWatching() {
        await this.storage.create();
        let watchingList: any[] = await this.storage.get("watching") ?? [];

        if (this.addToWatchList) {
            // Add to watching
            if (watchingList.includes(this.id) === false) {
                watchingList.push(this.id);
            }

            await this.storage.set("watching", watchingList);
        } else {
            // Remove from watching
            watchingList = watchingList.filter(id => id !== this.id);
            await this.storage.set("watching", watchingList);
        }

        this.addToWatchList = watchingList.includes(this.id) === false;
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async removeFromWatch() {
        console.log(`addToWatch: ${this.id}`);

    }

    openInBrowser(url: string) {
        url = url.replace("api.", "");
        this.iab.create(url);
    }
}
