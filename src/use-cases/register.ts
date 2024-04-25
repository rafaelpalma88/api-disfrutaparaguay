import { UsersRepository } from "@/repositories/users-repository";
import bcryptjs from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: UserResponse;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  approved_at: Date | null;
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcryptjs.hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail != null) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    console.log("user3", user);

    return { user };
  }
}
