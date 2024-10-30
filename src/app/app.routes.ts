import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
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
