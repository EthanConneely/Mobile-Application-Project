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

    constructor(private api: TvApiService) {}

    async ngOnInit() {
        this.getRandomShow();
    }

    updateSearchList() {
        if (this.searchValue === "") {
            this.getRandomShow();
        } else {
            this.api.getSearch(this.searchValue).subscribe((data: any[]) => {
                this.shows = data.map((v, i, a) => a[i].show);
                console.log("Search Results: ", this.shows[0]);
            });
        }
    }

    getRandomShow() {
        this.api.getRandomEpisodeFromShedule().subscribe((data: any[]) => {
            this.shows = [data[Math.round(Math.random() * data.length)].show];
        });
    }
}
