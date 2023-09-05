import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { Auth } from "./auth.decorator";
import { ROLE } from "../enum/role.enum";
import { RolesGuard } from "src/modules/auth/guard/roles.guard";

export const Roles = (...roles: ROLE[]) => {
    return applyDecorators(
        SetMetadata('roles', roles),
        Auth(),
        UseGuards(RolesGuard)
    );
};