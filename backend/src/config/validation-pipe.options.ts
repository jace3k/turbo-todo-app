import { ValidationPipeOptions } from "@nestjs/common";

export function getValidationPipeOptions(): ValidationPipeOptions {
  return {
    whitelist: true,
    forbidNonWhitelisted: true,
  }
}