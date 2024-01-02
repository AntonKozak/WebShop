import { Photo } from './photos'


export interface Member {
  id: number
  userName: string
  email: string
  firstName: any
  lastName: any
  mainPhotoUrl: string
  photos: Photo[]
}



