import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class TvApiService {
    constructor(private httpClient: HttpClient) { }

    getSearch(query: string) {
        return this.httpClient.get(
            "https://api.tvmaze.com/search/shows?q=" + query
        );
    }

    getEpisodeFromId(id: number) {
        return this.httpClient.get("https://api.tvmaze.com/shows/" + id).toPromise<any>();
    }

    getShowsEpisodes(id: number) {
        return this.httpClient.get(
            "https://api.tvmaze.com/shows/" + id + "/episodes"
        ).toPromise<any>();

    }

    getShowsSeasons(id: number) {
        return this.httpClient.get(
            "https://api.tvmaze.com/shows/" + id + "/seasons"
        ).toPromise<any>();
    }

    getRandomEpisodeFromShedule() {
        return this.httpClient.get("https://api.tvmaze.com/schedule").toPromise<any>();
    }

    getNextEpisode(episode: any) {
        return this.httpClient.get(episode._links.nextepisode.href).toPromise<any>();
    }
}
