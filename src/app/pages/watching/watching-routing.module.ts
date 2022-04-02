import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { WatchingPage } from "./watching.page";

const routes: Routes = [
    {
        path: "",
        component: WatchingPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WatchingPageRoutingModule {}
