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
    seasons: any[] = [[]];

    id: number;

    constructor(
        private route: ActivatedRoute,
        private api: TvApiService,
        private storage: Storage,
        private iab: InAppBrowser
    ) { }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get("id");

        this.api.getShow(this.id).subscribe((data) => {
            this.show = data;
        });

        this.api.getShowsEpisodes(this.id).subscribe((data: any[]) => {
            data.forEach((episode) => {
                console.log(episode.season);

                if (this.seasons[episode.season - 1] === undefined) {
                    this.seasons.push([]);
                }
                this.seasons[episode.season - 1].push(episode);
            });
            console.log(this.seasons);
        });
    }

    async addToWatch() {
        await this.storage.create();
        let watchingList: any[] = await this.storage.get("watching");

        if (watchingList == null) {
            watchingList = [];
        }

        if (watchingList.includes(this.id) === false) {
            watchingList.push(this.id);
        }

        console.log(watchingList);
        await this.storage.set("watching", watchingList);
    }

    openInBrowser(url: string) {
        url = url.replace("api.", "");
        this.iab.create(url);
    }
}
