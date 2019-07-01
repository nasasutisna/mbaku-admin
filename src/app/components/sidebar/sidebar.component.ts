import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AuthService } from 'app/service/auth.service';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}

export const ROUTES: RouteInfo[] = [
	{ path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
	{ path: '/transaction', title: 'Self Service',  icon:'local_library', class: '' },
	{ path: '/book', title: 'Buku', icon: 'book', class: '' },
	{ path: '/anggota-view', title: 'Anggota', icon: 'supervisor_account', class: '' },
	{ path: '/transaction-view', title: 'Peminjaman', icon: 'swap_horizontal_circle', class: '' },
	// { path: '/user-profile', title: 'Profil',  icon:'library_books', class: '' },
	// { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
	// { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
	// { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
	// { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

declare interface loginInfo<T> {
	msg: string;
	user: { userInfo: T, userStatus: any };
	isLogin: any;
}

declare interface anggota {
	alamat: string
	email: string
	jenis_kelamin: string
	kode_anggota: any;
	nama_lengkap: string;
	nomor_handphone: any;
	serial_id: any;
	status: any;
}
@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	menuItems: any[];
	isMember: any;
	isAdmin: any;

	constructor(
		public authService: AuthService,
		public router: Router
	) { }

	ngOnInit() {
		this.checkAuth();
		this.menuItems = ROUTES.filter(menuItem => menuItem);
	}

	checkAuth() {
		this.authService.auth.subscribe((data: loginInfo<anggota>) => {
			console.log(data);
			if (data.user.userStatus) {
				this.isAdmin = true;
			}
			else {
				this.isMember = true;
				ROUTES.push({ path: '/login', title: 'Keluar', icon: 'person', class: '' });
			}
		})
	}

	ngOnDestroy(): void {
		// this.authService.auth.unsubscribe();
	}

	isMobileMenu() {
		if ($(window).width() > 991) {
			return false;
		}
		return true;
	};

	logout() {
		this.authService.logout();
	}
}
