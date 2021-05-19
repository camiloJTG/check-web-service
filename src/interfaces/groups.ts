export interface ICreateGroup {
  name: string;
  isFeatured: boolean;
  userId: number;
  updatedAt: Date;
}

export interface IUpdateGroup {
  name: string;
  isFeatured: boolean;
  updatedAt: Date;
}
