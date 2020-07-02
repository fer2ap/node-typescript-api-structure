import { IUserDocument, IUserModel } from '@models/users/users.types';

export async function findOneOrCreate (
  this: IUserModel,
  {
    name,
    email
  }: {
    name: string,
    email: string
  }
): Promise<IUserDocument> {
  const doc: IUserDocument = await this.findOne({
    name,
    email
  });
  if (doc) {
    return doc;
  } else {
    return this.create({
      name,
      email,
      password: '123456'
    });
  }
}

export async function findByName (
  this: IUserModel,
  name: string
): Promise<IUserDocument[]> {
  return this.find({ name });
}
