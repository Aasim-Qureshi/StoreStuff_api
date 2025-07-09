import { Router } from "express";
import { SpaceMemberController } from "../controllers/SpaceMember.controller";

import { SpaceMemberRepoImpl } from "../../infrastructure/repositories/space-member.impl";
import { AuthRepoImpl } from "../../infrastructure/repositories/auth.impl";

const spaceMemberRepo = new SpaceMemberRepoImpl();
const authRepo = new AuthRepoImpl();

const spaceMemberController = new SpaceMemberController(spaceMemberRepo, authRepo);
const spaceMemberRouter = Router();

spaceMemberRouter.get("/:spaceId", spaceMemberController.getMembers);

spaceMemberRouter.post("/add", spaceMemberController.addMember);
spaceMemberRouter.put("/:spaceId/:userId", spaceMemberController.updateMemberRole);

spaceMemberRouter.delete("/:spaceId/:userId", spaceMemberController.deleteMember);

export default spaceMemberRouter;
