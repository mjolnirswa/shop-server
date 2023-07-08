import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequalizeConfig.service';
import { databaseConfig } from './config/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { BoilerPartsModule } from './boiler-parts/boiler-parts.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    UsersModule,
    AuthModule,
    PassportModule,
    BoilerPartsModule,
    ShoppingCartModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [AuthService, LocalStrategy],
})
export class AppModule {}
