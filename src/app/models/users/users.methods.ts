import { Document, HookNextFunction } from 'mongoose';
import { IUserDocument } from './users.types';
import { hash } from 'bcryptjs';

export async function setLastUpdated (
	this: IUserDocument
): Promise<void> {
	const now = new Date();
	if (!this.lastUpdate || this.lastUpdate < now) {
		this.lastUpdate = now;
		await this.save();
	}
}

export async function sameName (
	this: IUserDocument
): Promise<Document[]> {
	return this.model('user').find({ name: this.name });
}

export async function hashPassword (this: IUserDocument, next: HookNextFunction): Promise<void> {
	this.password = await hash(this.password, 10);
	next();
}
