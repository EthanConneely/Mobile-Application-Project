import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
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

    constructor(private route: ActivatedRoute, private api: TvApiService) {}

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

    addToWatch() {
        console.log(this.id);
    }
}
