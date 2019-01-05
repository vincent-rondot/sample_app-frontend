import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomMaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';

import { HttpClientModule } from '@angular/common/http';
import { Employer } from './models/employer.model';

import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { Dashboard3Component } from './components/dashboard3/dashboard3.component';

import { DayComponent } from './components/day/day.component';
import { WorkingslotComponent } from './components/workingslot/workingslot.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';


import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { reducer } from './reducers/tutorial.reducer';
import { RawsummaryComponent } from './components/rawsummary/rawsummary.component';

import { localStorageSync } from 'ngrx-store-localstorage';
import { ReactiveFormsModule } from '@angular/forms';

import {DpDatePickerModule} from 'ng2-date-picker';
import { WorkingSlot } from './models/workingslot.model'
import * as moment from 'moment';


export function loadConfig(oidcConfigService: OidcConfigService) {
  console.log('APP_INITIALIZER STARTING');
  console.log(`${window.location}`);
  return () => oidcConfigService.load('./assets/config/auth-config.json');
}

const ws :WorkingSlot =null

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    // keys: ['workingSlots'],
    keys: [{workingSlots: (key, value) => {
      // console.log("loading from storage: ", key); // log the current property name, the last is "".


      // TODO: this is not the better way to handle this... :-/
      // We should be able to simply deserialize the content into a WorkingSlot Object...
      // not sure how to do it....
      console.log(key," - ",value);

      switch(key) {

        case "duration":
          return moment.duration(value);

        case "date":
          return new Date(value)
      }

      return value;     // return the unchanged property value.}],
    }}],
    rehydrate: true,
    // restoreDates: false
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    Dashboard2Component,
    Dashboard3Component,

    DayComponent,
    WorkingslotComponent,
    RawsummaryComponent,
    CourseDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot(),
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: adapterFactory
      }
    ),
    StoreModule.forRoot(
      {
        workingSlots: reducer,
      },
      {
        metaReducers
      }
    ),
    ReactiveFormsModule,
    DpDatePickerModule 
  ],
  providers: [
    OidcSecurityService,
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [CourseDialogComponent]

})


export class AppModule {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private oidcConfigService: OidcConfigService
  ) {
    this.oidcConfigService.onConfigurationLoaded.subscribe(() => {
      const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
      openIDImplicitFlowConfiguration.stsServer = this.oidcConfigService.clientConfiguration.stsServer;
      openIDImplicitFlowConfiguration.redirect_url = this.oidcConfigService.clientConfiguration.redirect_url;
      // The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer
      // identified by the iss (issuer) Claim as an audience.
      // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience,
      // or if it contains additional audiences not trusted by the Client.
      openIDImplicitFlowConfiguration.client_id = this.oidcConfigService.clientConfiguration.client_id;
      openIDImplicitFlowConfiguration.response_type = this.oidcConfigService.clientConfiguration.response_type;
      openIDImplicitFlowConfiguration.scope = this.oidcConfigService.clientConfiguration.scope;
      openIDImplicitFlowConfiguration.post_logout_redirect_uri = this.oidcConfigService.clientConfiguration.post_logout_redirect_uri;
      openIDImplicitFlowConfiguration.start_checksession = this.oidcConfigService.clientConfiguration.start_checksession;
      openIDImplicitFlowConfiguration.silent_renew = this.oidcConfigService.clientConfiguration.silent_renew;
      openIDImplicitFlowConfiguration.silent_renew_url = this.oidcConfigService.clientConfiguration.silent_renew_url;
      openIDImplicitFlowConfiguration.post_login_route = this.oidcConfigService.clientConfiguration.startup_route;
      // HTTP 403
      openIDImplicitFlowConfiguration.forbidden_route = this.oidcConfigService.clientConfiguration.forbidden_route;
      // HTTP 401
      openIDImplicitFlowConfiguration.unauthorized_route = this.oidcConfigService.clientConfiguration.unauthorized_route;
      openIDImplicitFlowConfiguration.log_console_warning_active = this.oidcConfigService.clientConfiguration.log_console_warning_active;
      openIDImplicitFlowConfiguration.log_console_debug_active = this.oidcConfigService.clientConfiguration.log_console_debug_active;
      // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
      // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
      openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = this.oidcConfigService.clientConfiguration.max_id_token_iat_offset_allowed_in_seconds;

      const authWellKnownEndpoints = new AuthWellKnownEndpoints();
      authWellKnownEndpoints.setWellKnownEndpoints(this.oidcConfigService.wellKnownEndpoints);

      this.oidcSecurityService.setupModule(
        openIDImplicitFlowConfiguration,
        authWellKnownEndpoints
      );
    });

    console.log('APP STARTING');
  }
}
