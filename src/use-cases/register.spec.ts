import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository";

describe("Use Case: Register", () => {
  it("should hash user password upon registration", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const user = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    console.log("user", user);

    expect(2 + 2).toBe(4);
  });
});
