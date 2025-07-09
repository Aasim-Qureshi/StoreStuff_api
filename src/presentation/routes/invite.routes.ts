import { Router } from "express";
import { InviteController } from "../controllers/Invite.controller";
import { InviteRepoImpl } from "../../infrastructure/repositories/invite.impl";
import { SpaceMemberRepoImpl } from "../../infrastructure/repositories/space-member.impl";
import { AuthRepoImpl } from "../../infrastructure/repositories/auth.impl";

const inviteRepo = new InviteRepoImpl();
const spaceMemberRepo = new SpaceMemberRepoImpl();
const authRepo = new AuthRepoImpl();

const inviteController = new InviteController(inviteRepo, spaceMemberRepo, authRepo);
const inviteRouter = Router();

inviteRouter.post("/send", inviteController.sendInvite);
inviteRouter.post("/accept", inviteController.acceptInvite);
inviteRouter.delete("/delete/:invitationId", inviteController.deleteInvite);
inviteRouter.get("/get/:userEmail", inviteController.getInvitesForUser);

export default inviteRouter;
