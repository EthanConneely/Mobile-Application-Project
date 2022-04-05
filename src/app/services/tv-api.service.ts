import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TvApiService {
    constructor(private httpClient: HttpClient) { }

    getSearch(query: string): Observable<any> {
        return this.httpClient.get(
            "https://api.tvmaze.com/search/shows?q=" + query
        );
    }

    getShow(id: number): Observable<any> {
        return this.httpClient.get("https://api.tvmaze.com/shows/" + id);
    }

    getShowsEpisodes(id: number): Observable<any> {
        return this.httpClient.get(
            "https://api.tvmaze.com/shows/" + id + "/episodes"
        );
    }

    getShowsSeasons(id: number): Observable<any> {
        return this.httpClient.get(
            "https://api.tvmaze.com/shows/" + id + "/seasons"
        );
    }

    getRandomEpisodeFromShedule(): Observable<any> {
        return this.httpClient.get("https://api.tvmaze.com/schedule");
    }

    getNextEpisode(episode: any): Observable<any> {
        return this.httpClient.get(episode._links.nextepisode.href);
    }
}
