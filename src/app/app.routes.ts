import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './auth/dashboard/component-dashboard/header/header.component';
import { FooterComponent } from './auth/dashboard/component-dashboard/footer/footer.component';
import { SidebarComponent } from './auth/dashboard/component-dashboard/sidebar/sidebar.component';
import { DashboardLayoutComponent } from './auth/dashboard/dashboard-layout/dashboard-layout.component';
import { RegisterUserComponent } from './auth/dashboard/user/register-user/register-user.component';
import { UpdateUserComponent } from './auth/dashboard/user/update-user/update-user.component';
import { DeleteUserComponent } from './auth/dashboard/user/delete-user/delete-user.component';
import { CategoryComponent } from './components/category/category.component';
import { UserComponent } from './components/user/user.component';
import { ProductComponent } from './components/product/product.component'; 
import { WebsiteHeaderComponent } from './website/website-header/website-header.component';
import { WebsiteBodyComponent } from './website/website-body/website-body.component';
import { WebsiteAboutComponent } from './website/website-about/website-about.component';


export const routes: Routes = [
    { path: "registration", component: RegistrationComponent },
    { path: "login", component: LoginComponent },
    { path: "header", component: HeaderComponent },
    { path: "footer", component: FooterComponent },
    { path: "sidebar", component: SidebarComponent },
    { path: "dashboard", component: DashboardLayoutComponent },
    { path: "registerUser", component: RegisterUserComponent },
    { path: "updateUser", component: UpdateUserComponent },
    { path: "deleteUSer", component: DeleteUserComponent },
    { path: "listCategory",component:CategoryComponent},
    { path: "user",component:UserComponent},
    { path: "product",component:ProductComponent},
    { path:"websiteHeader",component:WebsiteHeaderComponent},
    { path:"website",component:WebsiteBodyComponent},
    { path:"websiteAbout",component:WebsiteAboutComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutes { }
