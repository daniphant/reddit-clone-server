import {
	Resolver,
	Query,
	Ctx,
	Arg,
	Int,
	Mutation,
	InputType,
	Field,
	ObjectType,
} from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
	@Field()
	username: string;
	@Field()
	password: string;
}

@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver()
export class UserResolver {
	@Mutation(() => UserResponse)
	async store(
		@Arg("input") input: UsernamePasswordInput,
		@Ctx() { em }: MyContext
	): Promise<UserResponse> {
		const hashedPassword = await argon2.hash(input.password);
		const user = em.create(User, {
			name: input.username,
			password: hashedPassword,
		});
		try {
			await em.persistAndFlush(user);
		} catch (err) {
			//Duplicate username error
			if (err.code === "23505")
				return {
					errors: [{ field: "username", message: "user already exists" }],
				};
		}

		return { user };
	}

	@Mutation(() => UserResponse)
	async authenticate(
		@Arg("input") input: UsernamePasswordInput,
		@Ctx() { em, req }: MyContext
	): Promise<UserResponse> {
		const user = await em.findOne(User, {
			name: input.username,
		});
		if (!user)
			return {
				errors: [{ field: "username", message: "username doesn't exist" }],
			};
		const validate = await argon2.verify(user.password, input.password);
		if (!validate)
			return {
				errors: [{ field: "password", message: "password incorrect" }],
			};

		req.session!.userId = user.id;

		return { user };
	}
}
