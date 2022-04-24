import { ConflictException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { hash, compare } from "bcrypt";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async findOne(username: string, throwWhenNotFound: boolean = true) {
    const user = await this.usersRepository.findOne({
      where: { username }
    });
    if (!user && throwWhenNotFound) {
      const errorMessage = 'User not found';
      throw new NotFoundException(errorMessage);
    }
    return user;
  }

  async validateUser(username: string, password: string) {
    const user = await this.findOne(username);

    if (!user)
      return null;

    const isMatch = await compare(password, user.password);

    if (isMatch) 
      return user;
  }

  login(user: User) {
    const payload = { username: user.username, id: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.findOne(createUserDto.username, false);

    if (existingUser)
      throw new ConflictException('Username is already taken');

    const encryptedPassword = await hash(createUserDto.password, 3);

    createUserDto.password = encryptedPassword;
    const newUser: User = await this.usersRepository.save(createUserDto);

    if (!newUser)
      throw new ServiceUnavailableException('Something went wrong with database');

    const { password, ...result } = newUser;
    return result;
  }
}