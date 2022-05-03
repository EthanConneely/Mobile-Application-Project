import { Component, OnInit } from "@angular/core";
import { TvApiService } from "src/app/services/tv-api.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.page.html",
    styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
    searchValue: string;

    shows: any[];

    constructor(private api: TvApiService) { }

    async ngOnInit() {
        this.getRandomShow();
    }

    updateSearchList() {
        if (this.searchValue === "") {
            this.getRandomShow(); // when search is cleared display random show
        } else {
            this.api.getSearch(this.searchValue).subscribe((data: any[]) => {
                this.shows = data.map((v, i, a) => a[i].show);
            });
        }
    }

    async getRandomShow() {
        const data = await this.api.getRandomEpisodeFromShedule();
        this.shows = [data[Math.round(Math.random() * data.length)].show];
    }
}
