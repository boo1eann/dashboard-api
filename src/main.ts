import { Container, ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IUserController } from './users/users.controller.interface';
import { IUserService } from './users/users.service.interface';
import { UserService } from './users/users.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	options.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	options.bind<IUserController>(TYPES.UserController).to(UserController);
	options.bind<IUserService>(TYPES.UserService).to(UserService);
	options.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	options.bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
