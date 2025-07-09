import { EmailAddress } from "../../../domain/value-objects/email.vo";

export class LoginDTO {
    constructor(
        public email: EmailAddress,
        public password: string
    ) {}
}