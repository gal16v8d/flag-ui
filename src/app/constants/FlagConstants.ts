import { environment } from 'src/environments/environment';

export class FlagConstants {
  public static BASE_HEADERS = {
    'x-api-key': environment.apiKey,
  };
}
