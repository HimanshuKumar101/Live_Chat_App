import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    AvatarModule,
    ButtonModule,
    ListboxModule,
    DividerModule,
    RippleModule,
    CardModule,
    ScrollPanelModule,
  ],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  currentUser = 'Himanshu';

  openConfirmation() {
    // Open confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout(); // Call logout method
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been logged out.',
          icon: 'success',
        });
      }
    });
  }

  logout() {
    this.userService.logout(); // Clear token + state
    this.router.navigate(['/']); // Redirect to login
  }

  users = [
    { name: 'Virat Kohli', image: 'assets/virat.jpg' },
    { name: 'Neeraj Chopra', image: 'assets/neeraj.jpg' },
    { name: 'CR7', image: 'assets/cr7.jpg' },
  ];

  messages = [
    { user: 'Virat Kohli', text: 'Hello, how are you?', time: '10:30 AM' },
    {
      user: 'Himanshu',
      text: 'Are you coming to the play?',
      time: '11:00 AM',
      to: 'Virat Kohli',
    },
    {
      user: 'Virat Kohli',
      text: "Let's play together in evening today.",
      time: '11:30 AM',
    },
    { user: 'Neeraj Chopra', text: 'Bhai kaha ha', time: '12:00 PM' },
    {
      user: 'Himanshu',
      text: 'Game time?',
      time: '12:10 PM',
      to: 'Neeraj Chopra',
    },
    { user: 'CR7', text: 'Suiiiiii', time: '12:30 PM' },
  ];

  selectedUser = this.users[0];

  get usersWithMessages() {
    return this.users.map((user) => {
      const lastMsg = [...this.messages]
        .reverse()
        .find((m) => m.user === user.name || m.to === user.name);
      return {
        ...user,
        lastMessage: lastMsg?.text ?? '',
        lastTime: lastMsg?.time ?? '',
      };
    });
  }

  get chatWithSelectedUser() {
    return this.messages.filter(
      (msg) =>
        (msg.user === this.selectedUser.name &&
          (!msg.to || msg.to === this.currentUser)) ||
        (msg.user === this.currentUser && msg.to === this.selectedUser.name)
    );
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }
}
