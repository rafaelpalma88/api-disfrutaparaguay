import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: any) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const password_hash = await bcryptjs.hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail != null) {
      throw new Error("Email already exists");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
