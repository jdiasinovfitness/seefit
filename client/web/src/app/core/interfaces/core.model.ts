/**
 * Provide all the interfaces used across all the plataform
 * LocationsList a.ka. GymnsList
 * HRS List
 *
 */

export interface InitialConfigInfo {
  origin: string;
  apps: { appCode: string; permissions: Array<string> }[];
  locations: GymnList[];
}

export interface UserInfo {
  id: string;
  name: string;
  language: string;
  photo?: string;
  email?: string;
  role?: string;
}

export interface GymnList {
  locationId: string;
  locationName: string;
}
