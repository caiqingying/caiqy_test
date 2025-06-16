import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  active?: boolean;
  bio?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = '/api/users';
  
  // 模拟数据
  private mockUsers: User[] = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', active: true, bio: '系统管理员' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '普通用户', active: true, bio: '普通用户' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '访客', active: false, bio: '访客用户' },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '普通用户', active: true, bio: '测试用户' }
  ];

  constructor(private http: HttpClient) { }

  /**
   * 获取用户列表
   */
  getUsers(): Observable<User[]> {
    // 模拟API调用
    return of([...this.mockUsers]).pipe(delay(500));
  }

  /**
   * 获取单个用户
   */
  getUser(id: number): Observable<User | undefined> {
    const user = this.mockUsers.find(u => u.id === id);
    return of(user ? { ...user } : undefined).pipe(delay(300));
  }

  /**
   * 创建用户
   */
  createUser(user: Omit<User, 'id'>): Observable<User> {
    const newUser: User = {
      ...user,
      id: Math.max(...this.mockUsers.map(u => u.id), 0) + 1,
      active: user.active !== undefined ? user.active : true
    };
    this.mockUsers.push(newUser);
    return of({ ...newUser }).pipe(delay(300));
  }

  /**
   * 更新用户
   */
  updateUser(id: number, user: Partial<User>): Observable<User | null> {
    const index = this.mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      this.mockUsers[index] = { ...this.mockUsers[index], ...user };
      return of({ ...this.mockUsers[index] }).pipe(delay(300));
    }
    return of(null);
  }

  /**
   * 删除用户
   */
  deleteUser(id: number): Observable<boolean> {
    const index = this.mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      this.mockUsers.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  /**
   * 切换用户状态
   */
  toggleUserStatus(id: number): Observable<User | null> {
    const user = this.mockUsers.find(u => u.id === id);
    if (user) {
      user.active = !user.active;
      return of({ ...user }).pipe(delay(300));
    }
    return of(null);
  }
}
