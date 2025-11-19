import { inject, injectable } from 'inversify';
import { IDotenvConfig } from './dotenv.config.interface';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { DotenvParseOutput, config } from 'dotenv';

@injectable()
export class DotenvConfig implements IDotenvConfig {
	private config: DotenvParseOutput = {};
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		
		const result = config();
		
		if (result.error) {
			this.logger.error('[DotenvConfig] Не удалось прочитать файл .env или он отсутствует');
		} else {
			this.logger.log('[DotenvConfig] Конфигурация .env загружена');
			this.config = result.parsed!;
		}
	}
	
	get(key: string): string {
		return this.config[key] || process.env[key] || '';
	}
}
