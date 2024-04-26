import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe("Use Case: Register", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    registerUseCase = new RegisterUseCase(usersRepository);
  });
  it("should be able to register", async () => {
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should hash user password upon registration", async () => {
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it("should not be able to register a user with duplicate e-mail", async () => {
    await registerUseCase.execute({
      name: "John Doe",
      password: "test@123",
      email: "john@doe.com",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        password: "test@123",
        email: "john@doe.com",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
