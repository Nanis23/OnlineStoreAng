import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './auth/dashboard/component-dashboard/header/header.component';
import { FooterComponent } from './auth/dashboard/component-dashboard/footer/footer.component';
import { SidebarComponent } from './auth/dashboard/component-dashboard/sidebar/sidebar.component';
import { DashboardLayoutComponent } from './auth/dashboard/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
    {path: "registration", component: RegistrationComponent},
    {path:"login", component: LoginComponent},
    {path:"header", component: HeaderComponent},
    {path:"footer", component: FooterComponent},
    {path:"sidebar", component: SidebarComponent},
    {path:"dashboard", component: DashboardLayoutComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutes{}
