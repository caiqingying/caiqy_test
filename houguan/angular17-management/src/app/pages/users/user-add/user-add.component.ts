import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../../../services/user.service';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  user: Omit<User, 'id'> = {
    name: '',
    email: '',
    role: '普通用户',
    active: true,
    bio: ''
  };

  roles = ['管理员', '普通用户', '访客'];
  loading = false;
  errors: { [key: string]: string } = {};

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    // 验证姓名
    if (!this.user.name.trim()) {
      this.errors['name'] = '姓名不能为空';
      isValid = false;
    } else if (this.user.name.trim().length < 2) {
      this.errors['name'] = '姓名至少需要2个字符';
      isValid = false;
    }

    // 验证邮箱
    if (!this.user.email.trim()) {
      this.errors['email'] = '邮箱不能为空';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.user.email)) {
        this.errors['email'] = '请输入有效的邮箱地址';
        isValid = false;
      }
    }

    // 验证角色
    if (!this.user.role) {
      this.errors['role'] = '请选择用户角色';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;

    this.userService.createUser(this.user).subscribe({
      next: (createdUser) => {
        this.loading = false;
        alert('用户创建成功！');
        this.router.navigate(['/users']);
      },
      error: (error) => {
        this.loading = false;
        alert('创建用户失败，请重试');
        console.error('Error creating user:', error);
      }
    });
  }

  onCancel(): void {
    if (this.hasUnsavedChanges()) {
      if (confirm('您有未保存的更改，确定要离开吗？')) {
        this.router.navigate(['/users']);
      }
    } else {
      this.router.navigate(['/users']);
    }
  }

  private hasUnsavedChanges(): boolean {
    return !!(this.user.name || this.user.email || this.user.bio);
  }

  getFieldError(field: string): string | null {
    return this.errors[field] || null;
  }

  hasFieldError(field: string): boolean {
    return !!this.errors[field];
  }
}
