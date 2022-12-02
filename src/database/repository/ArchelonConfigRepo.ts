import { NoEntryError } from 'src/core/ApiError';
import ArchelonConfig, { ArchelonConfigOutput } from '../model/ArchelonConfig';

export default class ArchelonConfigRepo {
  public static async getArchelonConfig(): Promise<ArchelonConfigOutput> {
    const config = await ArchelonConfig.findByPk(1);
    if (!config) {
      throw new NoEntryError('Id not found');
    }
    return config;
  }

  public static async checkApiKeyValid(apiKey: string): Promise<boolean> {
    const config = await this.getArchelonConfig();
    if (config.api_key === apiKey) {
      return true;
    }
    return false;
  }
}
