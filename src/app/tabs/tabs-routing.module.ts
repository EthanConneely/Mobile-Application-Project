import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
    {
        path: "tabs",
        component: TabsPage,
        children: [
            {
                path: "search",
                loadChildren: () =>
                    import("../pages/search/search.module").then(
                        (m) => m.SearchPageModule
                    ),
            },
            {
                path: "watching",
                loadChildren: () =>
                    import("../pages/watching/watching.module").then(
                        (m) => m.WatchingPageModule
                    ),
            },
            {
                path: "upcoming",
                loadChildren: () =>
                    import("../pages/upcoming/upcoming.module").then(
                        (m) => m.UpcomingPageModule
                    ),
            },
            {
                path: "",
                redirectTo: "/tabs/watching",
                pathMatch: "full",
            },
        ],
    },
    {
        path: "",
        redirectTo: "/tabs/watching",
        pathMatch: "full",
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
