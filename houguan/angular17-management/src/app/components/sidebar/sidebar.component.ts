import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  children?: SubMenuItem[];
  route?: string;
}

interface SubMenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  openMenus: { [key: string]: boolean } = {};

  menuItems: MenuItem[] = [
    {
      key: 'user',
      label: '用户管理',
      icon: '👤',
      children: [
        { label: '用户列表', route: '/users' },
        { label: '添加用户', route: '/users/add' },
        { label: '角色管理', route: '/users/roles' }
      ]
    },
    {
      key: 'system',
      label: '系统设置',
      icon: '⚙️',
      children: [
        { label: '基本设置', route: '/settings/general' },
        { label: '安全设置', route: '/settings/security' },
        { label: '备份管理', route: '/settings/backup' }
      ]
    },
    {
      key: 'statistics',
      label: '数据统计',
      icon: '📊',
      children: [
        { label: '数据概览', route: '/statistics/overview' },
        { label: '报表管理', route: '/statistics/reports' },
        { label: '数据分析', route: '/statistics/analytics' }
      ]
    },
    {
      key: 'help',
      label: '帮助中心',
      icon: '❓',
      route: '/help'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 初始化菜单状态
    this.initializeMenuState();
    
    // 监听路由变化
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateMenuState();
      });
  }

  toggleMenu(menuKey: string): void {
    this.openMenus[menuKey] = !this.openMenus[menuKey];
  }

  isMenuOpen(menuKey: string): boolean {
    return !!this.openMenus[menuKey];
  }

  isMenuActive(menuKey: string): boolean {
    const currentUrl = this.router.url;
    
    switch(menuKey) {
      case 'user':
        return currentUrl.startsWith('/users');
      case 'system':
        return currentUrl.startsWith('/settings');
      case 'statistics':
        return currentUrl.startsWith('/statistics');
      default:
        return false;
    }
  }

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }

  private initializeMenuState(): void {
    this.updateMenuState();
  }

  private updateMenuState(): void {
    const currentUrl = this.router.url;
    
    // 根据当前路径自动展开相应菜单
    if (currentUrl.startsWith('/users')) {
      this.openMenus['user'] = true;
    } else if (currentUrl.startsWith('/settings')) {
      this.openMenus['system'] = true;
    } else if (currentUrl.startsWith('/statistics')) {
      this.openMenus['statistics'] = true;
    }
  }
}
