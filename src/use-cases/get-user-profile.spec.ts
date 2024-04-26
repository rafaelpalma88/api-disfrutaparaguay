import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("Use Cases: Get User Profile", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
  });
  it("should be able to get a user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      password_hash: await hash("test@123", 6),
      email: "john@doe.com",
    });

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });
  it("should be not able to get a user profile with a non existent id", async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: "wrong-user-id",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
