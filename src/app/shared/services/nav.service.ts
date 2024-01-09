import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
	isVisible?: boolean;
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor() { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'home', path: '/home/watch', type: 'sub', active: false
		},
		// {
		// 	title: 'Shop', type: 'sub', active: false, children: [
		// 		{ path: '/shop/collection/left/sidebar', title: 'left-sidebar', type: 'link' },
		// 		{ path: '/shop/collection/right/sidebar', title: 'right-sidebar', type: 'link' },
		// 		{ path: '/shop/collection/no/sidebar', title: 'no-sidebar', type: 'link' },
		// 		{ path: '/shop/collection/infinitescroll', title: 'Infinite Scroll', type: 'link' }
		// 	]
		// },
		// {
		// 	title: 'Products', type: 'sub', active: false, children: [
		// 		{
		// 			title: 'sidebar', type: 'sub', active: false, children: [
		// 				{ path: '/shop/product/left/sidebar/trim-dress', title: 'left-sidebar', type: 'link' },
		// 				{ path: '/shop/product/right/sidebar/trim-dress', title: 'right-sidebar', type: 'link' },
		// 				{ path: '/shop/product/no/sidebar/trim-dress', title: 'no-sidebar', type: 'link' }
		// 			]
		// 		},
		// 		{ path: '/shop/product/three/column/trim-dress', title: 'three-column', type: 'link' },
		// 		{ path: '/shop/product/four/image/belted-dress', title: 'four-image', type: 'link' },
		// 		{ path: '/shop/product/bundle/trim-dress', title: 'bundle-product', type: 'link' },
		// 		{ path: '/shop/product/image/outside/trim-dress', title: 'image-outside', type: 'link' }
		// 	]
		// },
		// {
		// 	title: 'Features', type: 'sub', megaMenu: true, badge: true, badgeText: 'new', active: false, children: [
		// 		{
		// 			title: 'portfolio', type: 'sub', active: false, children: [
		// 				{ path: '/pages/portfolio/grid/two', title: 'portfolio-grid-2', type: 'link' },
		// 				{ path: '/pages/portfolio/grid/three', title: 'portfolio-grid-3', type: 'link' },
		// 				{ path: '/pages/portfolio/grid/four', title: 'portfolio-grid-4', type: 'link' },
		// 				{ path: '/pages/portfolio/masonry/grid/two', title: 'masonry-grid-2', type: 'link' },
		// 				{ path: '/pages/portfolio/masonry/grid/three', title: 'masonry-grid-3', type: 'link' },
		// 				{ path: '/pages/portfolio/masonry/grid/four', title: 'masonry-grid-4', type: 'link' },
		// 				{ path: '/pages/portfolio/masonry/full-width', title: 'masonry-Full-Width', type: 'link' }
		// 			]
		// 		},
		// 		{
		// 			title: 'add-to-cart', type: 'sub', active: false, children: [
		// 				{ path: '/home/vegetable', title: 'cart-right', type: 'link' },
		// 				{ path: '/home/watch', title: 'cart-left', type: 'link' },
		// 				{ path: '/home/furniture', title: 'cart-top', type: 'link' },
		// 				{ path: '/home/flower', title: 'cart-bottom', type: 'link' },
		// 				{ path: '/home/fashion', title: 'cart-model-popup', type: 'link' }
		// 			]
		// 		},
		// 		{
		// 			title: 'theme-elements', type: 'sub', active: false, children: [
		// 				{ path: '/elements/theme/title', title: 'title', type: 'link' },
		// 				{ path: '/elements/theme/collection-banner', title: 'collection-banner', type: 'link' },
		// 				{ path: '/elements/theme/home-slider', title: 'home-slider', type: 'link' },
		// 				{ path: '/elements/theme/category', title: 'category', type: 'link' },
		// 				{ path: '/elements/theme/services', title: 'services', type: 'link' }
		// 			]
		// 		},
		// 		{
		// 			title: 'product-elements', type: 'sub', active: false, children: [
		// 				{ path: '/elements/product/slider', title: 'product-slider', type: 'link' },
		// 				{ path: '/elements/product/banners', title: 'banners', type: 'link' },
		// 				{ path: '/elements/product/tabs', title: 'product-tabs', type: 'link' },
		// 				{ path: '/elements/product/multi-slider', title: 'multi-slider', type: 'link' }
		// 			]
		// 		},
		// 		{
		// 			title: 'email-template', type: 'sub', active: false, children: [
		// 				{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success.html', title: 'order-success', type: 'extTabLink' },
		// 				{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success-two.html', title: 'order-success-2', type: 'extTabLink' },
		// 				{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template.html', title: 'email-template', type: 'extTabLink' },
		// 				{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template-two.html', title: 'email-template-2', type: 'extTabLink' }
		// 			]
		// 		}
		// 	]
		// },
		// {
		// 	title: 'pages', type: 'sub', active: false, children: [
		// 		{
		// 			title: 'account', type: 'sub', active: false, children: [
		// 				{ path: '/pages/wishlist', title: 'wishlist', type: 'link' },
		// 				{ path: '/pages/cart', title: 'cart', type: 'link' },
		// 				{ path: '/pages/dashboard', title: 'dashboard', type: 'link' },
		// 				{ path: '/pages/login', title: 'login', type: 'link' },
		// 				{ path: '/pages/register', title: 'register', type: 'link' },
		// 				{ path: '/pages/contact', title: 'contact', type: 'link' },
		// 				{ path: '/pages/forget/password', title: 'forget-password', type: 'link' },
		// 				{ path: '/pages/profile', title: 'profile', type: 'link' },
		// 				{ path: '/pages/checkout', title: 'checkout', type: 'link' },
		// 			]
		// 		},
		// 		{ path: '/pages/aboutus', title: 'about-us', type: 'link' },
		// 		{ path: '/pages/search', title: 'search', type: 'link' },
		// 		{ path: '/pages/typography', title: 'typography', type: 'link', badge: true, badgeText: 'new' },
		// 		{ path: '/pages/review', title: 'review', type: 'link', badge: true, badgeText: 'new' },
		// 		{ path: '/pages/order/success', title: 'order-success', type: 'link' },
		// 		{
		// 			title: 'compare', type: 'sub', active: false, children: [
		// 				{ path: '/pages/compare/one', title: 'compare-1', type: 'link' },
		// 				{ path: '/pages/compare/two', title: 'compare-2', type: 'link', badge: true, badgeText: 'new' }
		// 			]
		// 		},
		// 		{ path: '/pages/collection', title: 'collection', type: 'link' },
		// 		{ path: '/pages/lookbook', title: 'lookbook', type: 'link' },
		// 		{ path: '/pages/404', title: '404', type: 'link' },
		// 		{ path: '/pages/comingsoon', title: 'coming-soon', type: 'link', badge: true, badgeText: 'new' },
		// 		{ path: '/pages/faq', title: 'faq', type: 'link' }
		// 	]
		// },
		// {
		// 	title: 'blogs', type: 'sub', active: false, children: [
		// 		{ path: '/pages/blog/left/sidebar', title: 'left-sidebar', type: 'link' },
		// 		{ path: '/pages/blog/right/sidebar', title: 'right-sidebar', type: 'link' },
		// 		{ path: '/pages/blog/no/sidebar', title: 'no-sidebar', type: 'link' },
		// 		{ path: '/pages/blog/details', title: 'blog-details', type: 'link' }
		// 	]
		// }
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

}
