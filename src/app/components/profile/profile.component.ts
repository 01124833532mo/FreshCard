import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService
  ) {}

  profileForm!: FormGroup;
  email = '';
  role = 'user';
  userId = '';

  ngOnInit(): void {
    const tokenData = this._AuthService.getCurrentUserData() || {};
    const localProfile = JSON.parse(localStorage.getItem('profileData') || '{}');

    this.email = tokenData?.name || tokenData?.email || 'No email found';
    this.role = tokenData?.role || 'user';
    this.userId = tokenData?.id || tokenData?._id || tokenData?.userId || '';

    this.profileForm = this._FormBuilder.group({
      fullName: [localProfile?.fullName || '', [Validators.required, Validators.minLength(3)]],
      phone: [localProfile?.phone || '', [Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [localProfile?.city || ''],
      address: [localProfile?.address || ''],
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    localStorage.setItem('profileData', JSON.stringify(this.profileForm.value));
    this._ToastrService.success('Profile saved successfully');
  }
}
