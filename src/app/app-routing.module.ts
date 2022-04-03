import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        loadChildren: () =>
            import("./tabs/tabs.module").then((m) => m.TabsPageModule),
    },
    {
        path: "search",
        loadChildren: () =>
            import("./pages/search/search.module").then(
                (m) => m.SearchPageModule
            ),
    },
    {
        path: "watching",
        loadChildren: () =>
            import("./pages/watching/watching.module").then(
                (m) => m.WatchingPageModule
            ),
    },
    {
        path: "upcoming",
        loadChildren: () =>
            import("./pages/upcoming/upcoming.module").then(
                (m) => m.UpcomingPageModule
            ),
    },
    {
        path: "show/:id",
        loadChildren: () =>
            import("./pages/show/show.module").then((m) => m.ShowPageModule),
    },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
