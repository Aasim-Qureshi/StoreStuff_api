import { EmailAddress } from "../../../domain/value-objects/email.vo";

export class CreateUserDTO {
    constructor(
        public name: string,
        public email: EmailAddress,
        public password: string
    ) {}
}