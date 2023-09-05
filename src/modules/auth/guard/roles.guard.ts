import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLE } from "src/modules/user/enum/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);
        const { user } = context.switchToHttp().getRequest();

        if (!requiredRoles) {
            return true;
        }

        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}