import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.auth.guard';
@Module({
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy, JwtAuthGuard],
  imports:[UserModule, PassportModule, JwtModule.register({signOptions:{
    expiresIn:'1200s'
  },
secret: 'hide me'
})],
exports:[JwtAuthGuard]
})
export class AuthModule {}
