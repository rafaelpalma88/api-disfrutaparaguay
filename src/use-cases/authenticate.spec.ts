import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Use Cases: Authenticate", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    authenticateUseCase = new AuthenticateUseCase(usersRepository);
  });
  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      password_hash: await hash("test@123", 6),
      email: "john@doe.com",
    });

    const { user } = await authenticateUseCase.execute({
      password: "test@123",
      email: "john@doe.com",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should return an error if password is incorrect", async () => {
    await usersRepository.create({
      name: "John Doe",
      password_hash: await hash("test@123", 6),
      email: "john@doe.com",
    });

    await expect(() =>
      authenticateUseCase.execute({
        password: "test@000",
        email: "john@doe.com",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it("should return an error if email is incorrect", async () => {
    await usersRepository.create({
      name: "John Doe",
      password_hash: await hash("test@123", 6),
      email: "john@doe.com",
    });

    await expect(() =>
      authenticateUseCase.execute({
        password: "test@123",
        email: "xxx@doe.com",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
