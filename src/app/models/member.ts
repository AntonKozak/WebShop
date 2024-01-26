import { Photo } from './photos'


export interface Member {
  id: number
  userName: string
  email: string
  firstName: string
  lastName: string
  country: string
  city: string
  mainPhotoUrl: string
  photoUrl: string
  photos: Photo[]
}



