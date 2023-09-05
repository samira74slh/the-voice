import { UseGuards, applyDecorators } from "@nestjs/common"
import { ApiBearerAuth, ApiSecurity } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/modules/auth/guard/jwt-auth.guard";

export const Auth = () => {
    return applyDecorators(
        ApiSecurity('cookie'),
        UseGuards(JwtAuthGuard),
    )
}