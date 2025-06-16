import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService, User } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.error = '加载用户列表失败';
        this.loading = false;
        console.error('Error loading users:', error);
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('确定要删除这个用户吗？')) {
      this.userService.deleteUser(id).subscribe({
        next: (success) => {
          if (success) {
            this.loadUsers(); // 重新加载列表
          } else {
            alert('删除失败');
          }
        },
        error: (error) => {
          alert('删除失败');
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  toggleUserStatus(id: number): void {
    this.userService.toggleUserStatus(id).subscribe({
      next: (user) => {
        if (user) {
          // 更新本地数据
          const index = this.users.findIndex(u => u.id === id);
          if (index !== -1) {
            this.users[index] = user;
          }
        }
      },
      error: (error) => {
        alert('状态切换失败');
        console.error('Error toggling user status:', error);
      }
    });
  }

  getRoleClass(role: string | undefined): string {
    switch (role) {
      case '管理员':
        return 'badge-danger';
      case '普通用户':
        return 'badge-primary';
      case '访客':
        return 'badge-secondary';
      default:
        return 'badge-light';
    }
  }

  getStatusClass(active: boolean | undefined): string {
    return active ? 'badge-success' : 'badge-warning';
  }

  getStatusText(active: boolean | undefined): string {
    return active ? '活跃' : '禁用';
  }
}
