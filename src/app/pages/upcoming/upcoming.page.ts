import { Component } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { TvApiService } from "src/app/services/tv-api.service";

@Component({
    selector: "app-upcoming",
    templateUrl: "./upcoming.page.html",
    styleUrls: ["./upcoming.page.scss"],
})
export class UpcomingPage {
    watching: any[] = [];

    constructor(private api: TvApiService, private storage: Storage) { }

    async ionViewWillEnter() {
        this.watching = [];
        await this.storage.create();
        let watchList: number[] = await this.storage.get("watching");

        if (watchList === null) {
            watchList = [];
        }

        for (const id of watchList) {
            const episode = await this.api.getShow(id).toPromise();
            episode.countdown = "";

            if (episode._links.nextepisode !== undefined) {
                this.api.getNextEpisode(episode).subscribe((data) => {
                    episode.next = data;
                    this.watching.push(episode);
                    if (episode.next !== null) {
                        this.handleCountdown(episode);
                        setInterval(() => this.handleCountdown(episode), 1000);
                    }
                });
            }
        }
    }

    convertToTime(episode: any): string {
        return episode.countdown;
    }

    // https://www.w3schools.com/howto/howto_js_countdown.asp
    handleCountdown(episode: any) {
        const target = Date.parse(episode.next?.airstamp);

        const diff = target.valueOf() - Date.now().valueOf();

        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        hours += days * 24;
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        episode.countdown =
            String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");
    }
}
