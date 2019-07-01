import { Routes } from '@angular/router';

import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';
import { BookDetailComponent } from 'app/pages/book/book-detail/book-detail.component';
import { UserProfileComponent } from 'app/pages/user-profile/user-profile.component';
import { TableListComponent } from 'app/pages/table-list/table-list.component';
import { TypographyComponent } from 'app/pages/typography/typography.component';
import { IconsComponent } from 'app/icons/icons.component';
import { MapsComponent } from 'app/pages/maps/maps.component';
import { NotificationsComponent } from 'app/pages/notifications/notifications.component';
import { UpgradeComponent } from 'app/pages/upgrade/upgrade.component';
import { BookEbookViewComponent } from 'app/pages/book-ebook-view/book-ebook-view.component';
import { BookViewComponent } from 'app/pages/book-view/book-view.component';
import { BookAddComponent } from 'app/pages/book-add/book-add.component';
import { TransactionComponent } from 'app/pages/transaction/transaction.component';
import { TransactionViewComponent } from 'app/pages/transaction-view/transaction-view.component';
import { AnggotaViewComponent } from 'app/pages/anggota-view/anggota-view.component';
import { AnggotaRegisterComponent } from 'app/pages/anggota/anggota-register/anggota-register.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      
        component: DashboardComponent},
    { path: 'book/:id',       component: BookDetailComponent },
    { path: 'book',       component: BookViewComponent },
    { path: 'book-add',       component: BookAddComponent },
    { path: 'table-list',       component: TableListComponent },
    { path: 'transaction-view',  component: TransactionViewComponent },
    { path: 'anggota-view',  component: AnggotaViewComponent },
    { path: 'anggota-view/detail/:id',   component: UserProfileComponent },
    { path: 'anggota-view/add',   component: AnggotaRegisterComponent },
    { path: 'ebook/:id',      component: BookEbookViewComponent },

];
