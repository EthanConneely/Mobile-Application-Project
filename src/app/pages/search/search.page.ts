import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

    ngOnInit() {}

    updateSearchList() {
        this.api.getSearch(this.searchValue).subscribe((data: any[]) => {
            this.shows = data.map((v, i, a) => a[i].show);
            console.log("Search Results: ", this.shows[0]);
        });
    }
}
