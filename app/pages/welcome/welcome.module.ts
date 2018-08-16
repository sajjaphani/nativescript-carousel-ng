import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { WelcomeRoutingModule } from "./welcome-routing.module";

import { WelcomeComponent } from "./welcome.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        WelcomeRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        WelcomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class WelcomeModule { }
