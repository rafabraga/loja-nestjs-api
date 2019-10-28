import { TesteUsuario } from './teste-usuario.entity';
import { TesteService } from './teste.service';
import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Resolver(of => TesteUsuario)
export class TesteResolver {

    constructor(
        private readonly testeService: TesteService,
    ) {}

    // @UseGuards(JwtAuthGuard)
    @Query(returns => TesteUsuario)
    async testar(@CurrentUser() user): Promise<TesteUsuario> {
        console.log(user);
        return this.testeService.buscarUnicoUsuario();
    }
}
